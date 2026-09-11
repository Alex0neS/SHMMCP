# shm-mcp

Standalone MCP-сервер для биллинговой панели **SHM** (форк [danuk/shm](https://github.com/danuk/shm), версия `2.15.0`). Отдельный, самодостаточный сервер: не делит код с `remnawave-mcp`, но следует той же архитектуре и тому же слою безопасности (см. `mcp/ARCHITECTURE.md`).

## Назначение

Сервер даёт MCP-клиенту (Claude Code и т.п.) один инструмент на каждую операцию `method + path` из двух OpenAPI-спек SHM:

| Спека | Файл | Путей | Операций |
|---|---|---|---|
| admin (`/admin/*`, Basic-auth админа) | `spec/shm_admin_openapi.json` | 35 | 81 |
| user (`/user/*`, `/service`, `/promo`, `/telegram/*`, `/template/{id}`, `/public/{id}`, `/storage/*`) | `spec/shm_user_openapi.json` | 39 | 67 |

Итого **148** сгенерированных инструментов + 4 служебных (`api_search`, `api_describe`, `api_status`, `api_audit_tail`).

Инструменты не пишутся руками: `scripts/generate.ts` читает обе спеки и генерирует `src/generated/tools.ts`. Файл коммитится — сервер не читает спеку в рантайме.

## Установка

```bash
npm ci
npm run build
```

Требуется Node.js ≥ 22.

## Конфигурация

Скопируйте `.env.example` в `.env` и заполните:

```bash
cp .env.example .env
```

Ключевые переменные (полный список с комментариями — в `.env.example`):

- `SHM_BASE_URL` — базовый URL панели, **уже включает** `/shm/v1` (например `https://admin.example.com/shm/v1`). Пути из спеки (`/admin/user`, `/user/service`, …) относительные и дописываются к этому значению.
- `SHM_ADMIN_AUTH=login:password` (или `SHM_ADMIN_AUTH_FILE=/path/to/file` — приоритет у файла) — Basic-авторизация администратора SHM. Через один и тот же админский Basic доступны и `/admin/*`, и `/user/*` (через опциональный `user_id`, см. ниже).
- `MCP_MODE=ro|rw` (по умолчанию `ro`).
- `MCP_DENY`, `MCP_DENY_DEFAULTS`, `MCP_CONFIRM`, `MCP_DRY_RUN` — слой безопасности (см. ниже).
- `MCP_AUDIT_LOG`, `MCP_TIMEOUT_MS`, `MCP_MAX_RESPONSE_BYTES`, `MCP_TOOL_FILTER`, `MCP_REDACT`.
- `MCP_HTTP_PORT` / `MCP_HTTP_TOKEN` — опциональный Streamable HTTP транспорт.

Секреты — только через env или `*_FILE`; `.env` никогда не коммитится.

## Режимы безопасности

### `ro` (по умолчанию)

Разрешён только `GET`. Всё остальное (`POST`/`PUT`/`DELETE`/`PATCH`) запрещено безусловно.

Но не все GET безопасны: часть GET-эндпоинтов SHM **мутирует состояние** ("мутирующие GET"). Они запрещены даже в `ro`:

- `GET /promo/apply/{code}` — применяет промокод;
- `GET /template/{id}` (user-спека) — **выполняет** шаблон (в отличие от `GET /admin/template/{id}`, которое просто читает шаблон и остаётся разрешённым в `ro`);
- `GET /public/{id}` — выполняет публичный шаблон;
- `GET /user/passwd/reset*`, `GET /user/passkey/register`, `GET /user/auth/passkey`, `GET /user/otp/setup` — операции аутентификации/восстановления доступа.

### `rw`

Разрешено всё, кроме `MCP_DENY` и дефолтного denylist (см. ниже). Любая не-GET операция без `confirm: true` возвращает **превью** (метод, URL, заголовки без `Authorization`, тело) и не выполняется — это защита от случайного вызова. Второй вызов с `confirm: true` выполняет операцию.

`MCP_DRY_RUN=1` — не-GET никогда не отправляется на сервер, всегда превью, независимо от `confirm`.

### Дефолтный denylist (`MCP_DENY_DEFAULTS=1`, включён по умолчанию)

| Правило | Почему |
|---|---|
| `GET /admin/server/identity` | отдаёт **приватные SSH-ключи** серверов |
| `DELETE /admin/config` | удаляет глобальную конфигурацию панели |
| `POST /admin/spool/manual/success` | помечает задачу выполненной без реального выполнения |
| `POST /admin/spool/manual/set` | принудительно перезаписывает состояние задачи |
| `POST /admin/spool/manual/add` | добавляет задачу в спул вручную |
| `PUT /admin/spool` | запускает **массовую рассылку** (задача на всех клиентов) |
| `DELETE /admin/user/pay` | удаляет платёж клиента |
| `DELETE /admin/user/bonus` | удаляет бонус клиента |
| `DELETE /admin/user/service/withdraw` | удаляет списание по услуге |

Важно: `POST /admin/spool/manual/{action}` — один инструмент (`admin_spool_manual_by_action_post`) на все действия (`retry|resume|pause|success|set|add`). Deny-правило проверяется **после подстановки** аргумента `action` в путь, поэтому `action:"retry"` разрешён (с `confirm:true` в `rw`), а `action:"success"`/`"set"`/`"add"` — запрещены, даже если формально это один и тот же MCP-инструмент.

Отключить дефолтный denylist: `MCP_DENY_DEFAULTS=0` (не рекомендуется).

### `MCP_DENY` — дополнительные правила

Через запятую, формат `METHOD /prefix` или просто `/prefix` (все методы):

```
MCP_DENY=POST /admin/user,DELETE /admin/config
```

### Редактирование секретов (`MCP_REDACT=1` по умолчанию)

В ответах и в аудит-логе (но никогда в заголовках — `Authorization` не пишется вообще):

- ключи вида `password`, `passwd`, `secret`, `token`, `api_key`/`apikey`, `private_key`, `authorization`, `cookie` (регистронезависимо, на любой глубине вложенности — покрывает, например, `settings` в ответах `/admin/server` и `value` в `/admin/config`) заменяются на `<redacted>` целиком;
- строковые значения дополнительно сканируются на телеграм-токены бота (`bot<id>:<secret>`) и на `user:pass@` в URL, независимо от имени ключа.

Отключить: `MCP_REDACT=0`.

## Формат ответа инструмента

Успех: `content[0].text` — JSON `{ "status": <http>, "ok": true|false, "data": <json|text>, "truncated": bool }`.

Ошибка HTTP (не 2xx): то же самое, но `isError: true`.

Превью (не-GET без `confirm`, или `MCP_DRY_RUN=1`): `{ "preview": true, "method", "url", "headers": {без Authorization}, "body" }`.

Отказ (`deny`): `isError: true`, `{ "ok": false, "denied": true, "reason": "..." }`.

## Служебные инструменты

- `api_search {query}` — поиск по имени/пути/summary/тегу среди всех 148 инструментов (не зависит от `MCP_TOOL_FILTER`).
- `api_describe {tool}` — полная JSON Schema входа и заметки безопасности.
- `api_status {}` — режим, базовый хост (без пути/секрета), число инструментов, версия спеки (`SPEC_VERSION`), проверка доступности `GET /admin/user?limit=1` (только код ответа, без данных).
- `api_audit_tail {n}` — последние `n` записей `MCP_AUDIT_LOG`.

## Подключение

### Claude Code

```bash
claude mcp add shm -- node /abs/path/to/mcp/shm-mcp/dist/index.js
```

(путь — абсолютный, после `npm run build`).

### Любой другой MCP-клиент (stdio, generic JSON)

```json
{
  "mcpServers": {
    "shm": {
      "command": "node",
      "args": ["/abs/path/to/mcp/shm-mcp/dist/index.js"],
      "env": {
        "SHM_BASE_URL": "https://admin.example.com/shm/v1",
        "SHM_ADMIN_AUTH": "login:password",
        "MCP_MODE": "ro"
      }
    }
  }
}
```

### Streamable HTTP (опционально)

```bash
MCP_HTTP_PORT=8787 MCP_HTTP_TOKEN=change-me npm run start:http
```

Слушает только `127.0.0.1`; запросы без `Authorization: Bearer <MCP_HTTP_TOKEN>` отвергаются `401`.

## Правила имён инструментов

snake_case, ASCII, `/^[a-z0-9_]+$/`, ≤ 60 символов, уникальные. Спека не содержит `operationId`, поэтому имя строится из метода и пути:

- **admin**: путь уже начинается с `/admin`, поэтому сегменты пути (без повторного добавления префикса) + `{param}` → `by_<param>` + `_<метод>`:
  - `GET /admin/user/service` → `admin_user_service_get`
  - `GET /admin/config/{key}` → `admin_config_by_key_get`
  - `POST /admin/spool/manual/{action}` → `admin_spool_manual_by_action_post`
- **user**: префикс `user_`, но если путь уже начинается с `/user`, второй `user` не повторяется:
  - `GET /service/order` → `user_service_order_get`
  - `GET /user/pay/forecast` → `user_pay_forecast_get` (не `user_user_pay_forecast_get`)
  - `GET /user` → `user_get`

Коллизии разрешаются автоматически генератором: единственная коллизия в текущей спеке — `GET /service` и `GET /user/service` оба дают `user_service_get`; для второго используется резервное имя без дедупликации — `user_user_service_get`.

## `user_id`: админ действует от имени клиента

Все пути user-спеки (`/user/*`, `/service`, `/promo`, `/telegram/*`, `/template/{id}`, `/public/{id}`, `/storage/*`) вызываются через тот же админский Basic. Поэтому каждый из 67 user-инструментов получает **необязательный** query-параметр `user_id` ("admin acts on behalf of this user") — можно не указывать (тогда SHM решает по контексту сессии), а можно явно передать id клиента.

## Примеры

**`admin_user_get`** — список клиентов:
```json
{ "limit": 10, "offset": 0 }
```

**`admin_user_search_get`** — поиск клиентов:
```json
{ "limit": 10 }
```
(параметр поиска передаётся так, как определён в спеке для данной операции — см. `api_describe { "tool": "admin_user_search_get" }`.)

**`admin_user_service_get`** — список услуг клиента:
```json
{ "user_id": 123, "limit": 25 }
```

**`admin_spool_get`** — список текущих фоновых задач:
```json
{ "limit": 25, "offset": 0 }
```

**`admin_template_get`** — список шаблонов (безопасно, только читает — в отличие от `user_template_by_id_get`, который **выполняет** шаблон и заблокирован в `ro`):
```json
{ "limit": 25 }
```

**`user_pay_forecast_get`** — прогноз оплаты для конкретного клиента (админ действует от его имени через `user_id`):
```json
{ "user_id": 123 }
```

Изменяющий вызов (пример превью → подтверждение) в `rw`:
```json
// 1) без confirm — получаем превью
{ "action": "retry", "body": { "id": 42 } }
// ответ: { "preview": true, "method": "POST", "url": "...", "headers": {...}, "body": {...} }

// 2) с confirm:true — выполняется
{ "action": "retry", "body": { "id": 42 }, "confirm": true }
```
(инструмент `admin_spool_manual_by_action_post`; `action: "success"|"set"|"add"` запрещены дефолтным denylist независимо от `confirm`.)

## Аудит

Каждый вызов инструмента (включая отказы и превью) пишется в `MCP_AUDIT_LOG` (по умолчанию `./.audit/shm-mcp.jsonl`, права `0600`) построчно в формате JSON: время, инструмент, метод, URL, HTTP-статус (если был запрос), длительность, `confirm`, режим, результат (`ok|denied|preview|error`). Заголовок `Authorization` не пишется никогда; тело запроса пишется с редактированием секретов (см. выше).

## Тесты

```bash
npm run typecheck
npm run build
npm test
```

`npm test` (vitest) — без сети: мокает `fetch` через `vi.stubGlobal`, покрывает генератор (число/уникальность/валидность имён инструментов), правила имён, таблицы гейта (`ro`/`rw`/deny/confirm/dry-run), редактирование секретов, клиент (сборка URL, Basic-заголовок, подстановка path-параметров, обрезка большого ответа), аудит, конфиг и сквозные сценарии через `createToolRuntime`.

`npm run smoke` — живой прогон: если `.env` существует (владелец сервера сам его заполнил), делает `api_status` и явный вызов `admin_user_get` с `limit:1` против реального `SHM_BASE_URL`; если `.env` нет — печатает, что пропущено, и завершается с кодом 0. Агенты-разработчики `.env` не создают и креды не имеют.

## Как перегенерировать инструменты при обновлении панели

1. На хосте SHM получить актуальные спеки:
   ```bash
   curl http://127.0.0.1:8081/shm/v1/swagger_admin.json -o shm_admin_openapi.json
   curl http://127.0.0.1:8081/shm/v1/swagger.json       -o shm_user_openapi.json
   ```
2. Скопировать оба файла в `mcp/shm-mcp/spec/`, заменив текущие (сохранить UTF-8 — русские `summary` в спеке важны для описаний инструментов).
3. Перегенерировать и проверить:
   ```bash
   npm run generate
   npm run typecheck
   npm run build
   npm test
   ```
4. Просмотреть диф `src/generated/tools.ts` — новые/удалённые/переименованные инструменты, обновить `MCP_DENY`/README при необходимости (особенно если панель добавила новые мутирующие GET или опасные операции).
