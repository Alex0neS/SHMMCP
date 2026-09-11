# Архитектура MCP-серверов для SHM и Remnawave

Два **независимых** MCP-сервера, по одному на панель. Общего кода между ними нет (каждый самодостаточен), но структура, конвенции и слой безопасности одинаковые, чтобы ими одинаково пользоваться.

| Сервер | Каталог | Бэкенд | Спецификация | Инструментов |
|---|---|---|---|---|
| `remnawave-mcp` | RemnavaweMCP | Remnawave 3.4.3, `https://panel.example.com`, Bearer JWT (API-токен) | `mcp/specs/remnawave_openapi.json` (OpenAPI 3.0.0, 161 путь, 217 операций, все с `operationId`) | ~217 + служебные |
| `shm-mcp` | SHMMCP | SHM 2.15.0 (форк), `https://billing.example.com/shm/v1`, Basic (login:password) | `mcp/specs/shm_admin_openapi.json` (35 путей, 81 операция) + `mcp/specs/shm_user_openapi.json` (39 путей, 67 операций); `operationId` нет | ~148 + служебные |

## Принципы

1. **Полное покрытие API.** Один MCP-инструмент на каждую операцию `method + path` из спецификации. Ничего не выкидываем на этапе генерации; ограничения накладываются в рантайме конфигом.
2. **Генерация из спецификации, а не ручное написание.** `scripts/generate.ts` читает JSON-спеку и пишет `src/generated/tools.ts` (массив описаний инструментов: имя, метод, путь, параметры path/query/header, схема тела, краткое описание, теги). Сгенерированный файл коммитится, чтобы сервер работал без спеки в рантайме. Перегенерация: `npm run generate`.
3. **JSON Schema напрямую.** Используем низкоуровневый `Server` из `@modelcontextprotocol/sdk` с `setRequestHandler(ListToolsRequestSchema | CallToolRequestSchema)`, `inputSchema` отдаём как JSON Schema, собранную из `parameters` + `requestBody`. Схемы `$ref` разворачиваем (deref) при генерации, глубина разворота ограничена, циклы заменяются на `{}`. Схемы ответов в инструмент не включаем (экономия контекста).
4. **Безопасность в рантайме, конфигом через env:**
   - `MCP_MODE=ro|rw` (по умолчанию `ro`): в `ro` разрешены только `GET` и операции из allowlist «безопасных не-GET» (пустой по умолчанию); плюс **denylist мутирующих GET** (для SHM: `/promo/apply/*`, `/template/{id}` на user-API, `/public/*`, `/user/passwd/reset*`, `/user/passkey/register`, `/user/auth/passkey`, `/user/otp/setup`). В `rw` разрешено всё, кроме `MCP_DENY`.
   - `MCP_DENY` — список правил `METHOD /path-prefix` через запятую, отказ на любом режиме. Рекомендуемый дефолт для SHM: `GET /admin/server/identity`, `DELETE /admin/config`; для Remnawave: `/api/keygen`, `POST /api/tokens`, `/api/auth`, `/api/passkeys`, `POST /api/nodes/actions/restart-all`, `POST /api/users/bulk/delete-by-status`. Дефолт можно отключить `MCP_DENY_DEFAULTS=0`.
   - `MCP_CONFIRM=1` (по умолчанию `1` в `rw`): любая не-GET операция без аргумента `confirm: true` возвращает **превью** (метод, URL, тело) и не выполняется. С `confirm: true` выполняется. Это второй вызов-подтверждение.
   - `MCP_DRY_RUN=1`: не-GET никогда не отправляются, всегда превью.
   - `MCP_AUDIT_LOG=<path>` (по умолчанию `./.audit/<server>.jsonl`, права 0600): каждая попытка вызова: время, инструмент, метод, URL, статус, длительность, `confirm`, режим, результат `ok|denied|preview|error`. Тела запросов пишутся с редактированием секретов; заголовок Authorization никогда.
   - `MCP_TIMEOUT_MS` (по умолчанию 30000), `MCP_MAX_RESPONSE_BYTES` (по умолчанию 200000, при превышении ответ усекается с пометкой).
   - `MCP_TOOL_FILTER` — regex по имени инструмента, чтобы публиковать подмножество (снижает контекст клиента).
   - Редактирование в ответах: ключи, подходящие под `/(password|passwd|secret|token|api_key|apikey|private_key|privateKey|authorization|cookie)/i`, заменяются на `<redacted>`; для Remnawave дополнительно `trojanPassword`, `vlessUuid`, `ssPassword`, `subscriptionUrl`, `links`, `happ.cryptoLink` **не** редактируем по умолчанию (это рабочие данные), но env `MCP_REDACT_SUBSCRIPTION=1` включает. Redaction можно выключить `MCP_REDACT=0`.
5. **Служебные инструменты** (в каждом сервере): `api_search {query}` — поиск инструментов по имени/пути/описанию/тегу, возвращает имя, метод, путь, описание; `api_describe {tool}` — полная схема входа и заметки; `api_status {}` — режим, базовый URL (без секрета), число инструментов, версия спеки, проверка доступности (для Remnawave `GET /api/system/health`, для SHM `GET /admin/user?limit=1` без данных, только код ответа); `api_audit_tail {n}` — последние n записей журнала.
6. **Имена инструментов** — snake_case, ASCII, ≤ 60 символов, уникальные.
   - Remnawave: из `operationId` `XxxController_yyy` → `xxx_yyy` (например `UsersController_getAllUsers` → `users_get_all_users`); коллизии решаются суффиксом метода.
   - SHM: из метода и пути: `admin_user_service_get`, `admin_spool_manual_action_post`; `{param}` → имя параметра: `admin_config_by_key_get`; user-API с префиксом `user_`: `user_service_order_get`. Тег/summary (на русском в спеке) кладём в description как есть, добавив `METHOD /path` первой строкой.
7. **Аргументы инструмента**: плоский объект: path-параметры и query-параметры по именам, тело запроса под ключом `body` (объект по схеме `requestBody`), для SHM также опционально `user_id` там, где спека admin-режима его добавляет. Обязательность из спеки. Плюс необязательный `confirm: boolean` у не-GET.
8. **Ответ инструмента**: `content[0].text` = JSON `{ "status": <http>, "ok": true|false, "data": <json|text>, "truncated": bool }`; при ошибке HTTP `isError: true` с телом ответа (усечённым). Превью: `{ "preview": true, "method", "url", "headers": {без Authorization}, "body" }`.
9. **Транспорт**: stdio по умолчанию (`npm start`). Опционально Streamable HTTP (`npm run start:http`, `MCP_HTTP_PORT`, `MCP_HTTP_TOKEN` обязателен, слушает 127.0.0.1). HTTP не обязателен в первой версии, но структура должна позволять добавить.
10. **Стек**: TypeScript 5.9, Node ≥ 22, `npm` (без pnpm), ESM, `@modelcontextprotocol/sdk@^1.30`, `zod@^4` только для валидации env, `vitest` для тестов, `tsx` для скриптов. Никаких других рантайм-зависимостей. Сборка `tsc` в `dist/`.
11. **Тесты** (vitest): генератор (число инструментов = число операций, уникальность имён, схемы валидны), гейт режимов/denylist/confirm (табличные тесты), редактирование, аудит, разбор ответов. Живой smoke: `npm run smoke` делает `api_status` и один GET против реального URL из `.env`, если `.env` есть; иначе пропускается.
12. **Конфиг**: `.env.example` с комментариями, `.env` в `.gitignore`. Секреты только из env или `*_FILE`.
13. **Документация**: `README.md` в каждом сервере: назначение, установка (`npm ci && npm run build`), конфиг, подключение к Claude Code (`claude mcp add`) и JSON для других клиентов, режимы, примеры вызовов, как перегенерировать при обновлении панели.
14. **Ничего не вызывать на проде при разработке**, кроме `npm run smoke` (только GET) и только если `.env` заполнен владельцем. Агенты-разработчики `.env` не создают и креды не имеют.

## Структура каталога (одинаковая для обоих)

```
mcp/<server>/
  package.json  tsconfig.json  vitest.config.ts  .env.example  .gitignore  README.md
  scripts/generate.ts          # спека → src/generated/tools.ts
  src/index.ts                 # stdio entrypoint
  src/http.ts                  # (опц.) streamable HTTP entrypoint
  src/server.ts                # сборка MCP Server: list/call handlers, служебные инструменты
  src/config.ts                # env → typed config (zod)
  src/client.ts                # fetch-клиент: auth, timeout, base URL, парсинг ответа
  src/gate.ts                  # режим ro/rw, denylist, mutating-GET, confirm, dry-run
  src/redact.ts
  src/audit.ts
  src/naming.ts                # правила имён инструментов
  src/generated/tools.ts       # СГЕНЕРИРОВАНО, коммитится
  test/*.test.ts
```

## Особенности SHM (для `shm-mcp`)
- Базовый URL уже включает `/shm/v1`; пути в спеке относительные (`/admin/user`, `/user/service`).
- Две спеки: admin (`/admin/*`, Basic-auth админа) и user (`/user/*`, `/service`, `/promo`, `/telegram/*`, `/template/{id}`, `/public/{id}`, `/storage/*`). Через админский Basic user-маршруты работают с параметром `user_id` (SHM-спека admin-режима добавляет его; в user-спеке его нет). Генератор для user-операций добавляет **необязательный** `user_id` в query.
- SHM отдаёт списки с `offset/limit`, `limit=0` не использовать. Ответ обычно `{ "data": [...], "items": N, "limit", "offset" }` — отдавать как есть.
- Некоторые GET мутируют (см. denylist выше) — в `ro` они запрещены.
- Спека содержит русские summary в UTF-8; сохранить как есть.
- `POST /admin/spool/manual/{action}` — `action` из `retry|resume|pause|success|set|add`; `success/set/add` включать в `MCP_DENY` по умолчанию с пояснением (см. `audit/docs/40_HQ_MCP_REVIEW.md` §4).

## Особенности Remnawave (для `remnawave-mcp`)
- Auth: `Authorization: Bearer <REMNA_API_TOKEN>`; схема `Prometheus` (Basic) относится только к `/metrics` — для него отдельные env `REMNA_METRICS_USER/PASS`, инструмент публикуется, но без кредов возвращает понятный отказ.
- `AuthController_*`, `PasskeyController_*`, `ApiTokensController_*`, `KeygenController_*` — генерируются, но по умолчанию в `MCP_DENY` (выдача постоянных админ-кредов).
- Bulk-операции (`/api/users/bulk/*`, `/api/hosts/bulk/*`) — генерируются; в `rw` требуют `confirm: true` как и всё не-GET; дополнительно env `MCP_MAX_BULK_ITEMS` (по умолчанию 100) для массивов `uuids` в теле.
- Ответы панели обёрнуты в `{ "response": ... }` — отдавать как есть.
- Некоторые GET возвращают большие списки (`/api/users` с `size/start`): по умолчанию `size` не навязывать, но в description инструмента указать параметры пагинации из спеки.
