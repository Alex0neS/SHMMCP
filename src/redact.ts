/**
 * Редактирование секретов в ответах и аудит-логе.
 *
 * Правила (см. ARCHITECTURE.md):
 *  - ключи, подходящие под SENSITIVE_KEY_RE, заменяются на "<redacted>" целиком
 *    (рекурсивно, на любой глубине — покрывает в т.ч. вложенные объекты
 *    /admin/server.settings и /admin/config.value);
 *  - строковые значения дополнительно сканируются на телеграм-токены бота
 *    (bot<id>:<secret>) и на "user:pass@" в URL, независимо от имени ключа.
 *
 * Можно полностью отключить через MCP_REDACT=0 (передаётся вызывающей стороной).
 */

export const SENSITIVE_KEY_RE =
  /(password|passwd|secret|token|api_key|apikey|private_key|privatekey|authorization|cookie)/i;

const TELEGRAM_BOT_TOKEN_RE = /bot\d+:[A-Za-z0-9_-]+/gi;
const URL_CREDENTIALS_RE = /\/\/[^/@\s:]+:[^/@\s]+@/g;

export const REDACTED = "<redacted>";

function redactStringContent(value: string): string {
  let out = value.replace(TELEGRAM_BOT_TOKEN_RE, REDACTED);
  out = out.replace(URL_CREDENTIALS_RE, `//${REDACTED}@`);
  return out;
}

function redactValue(value: unknown): unknown {
  if (typeof value === "string") {
    return redactStringContent(value);
  }
  if (Array.isArray(value)) {
    return value.map((v) => redactValue(v));
  }
  if (value !== null && typeof value === "object") {
    const out: Record<string, unknown> = {};
    for (const [key, v] of Object.entries(value as Record<string, unknown>)) {
      if (SENSITIVE_KEY_RE.test(key)) {
        out[key] = REDACTED;
      } else {
        out[key] = redactValue(v);
      }
    }
    return out;
  }
  return value;
}

/**
 * Рекурсивно редактирует данные. Возвращает вход без изменений, если enabled=false.
 */
export function redact<T>(data: T, enabled = true): T {
  if (!enabled) return data;
  return redactValue(data) as T;
}

/** Редактирует заголовки запроса/превью — Authorization всегда убирается целиком. */
export function redactHeaders(headers: Record<string, string>): Record<string, string> {
  const out: Record<string, string> = {};
  for (const [key, value] of Object.entries(headers)) {
    if (/^authorization$/i.test(key)) continue;
    if (SENSITIVE_KEY_RE.test(key)) {
      out[key] = REDACTED;
    } else {
      out[key] = redactStringContent(value);
    }
  }
  return out;
}
