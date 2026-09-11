/**
 * Правила формирования имён MCP-инструментов из пар (метод, путь) спецификации SHM.
 *
 * Спека не содержит operationId, поэтому имя строится из метода и пути:
 *   admin: "admin_" + сегменты пути ("{param}" -> "by_<param>") + "_" + метод
 *     GET  /admin/user/service          -> admin_user_service_get
 *     GET  /admin/config/{key}          -> admin_config_by_key_get
 *     POST /admin/spool/manual/{action} -> admin_spool_manual_by_action_post
 *   user: "user_" + сегменты пути, но если путь уже начинается с /user,
 *         дублирующийся первый сегмент "user" не повторяется:
 *     GET /service          -> user_service_get
 *     GET /user/pay/forecast -> user_pay_forecast_get   (не user_user_pay_forecast_get)
 *     GET /user              -> user_get
 *
 * Имена должны быть уникальны, ASCII, /^[a-z0-9_]+$/, не длиннее 60 символов.
 * Генератор (scripts/generate.ts) отвечает за обнаружение и разрешение коллизий,
 * используя buildBaseName() и buildFallbackName() из этого модуля.
 */

export type SpecKind = "admin" | "user";
export type HttpMethod = "get" | "post" | "put" | "delete" | "patch";

const MAX_NAME_LENGTH = 60;

/** Приводит один сегмент пути к [a-z0-9_]+, схлопывая всё прочее в "_". */
function sanitizeSegment(raw: string): string {
  return raw
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "");
}

/** "{key}" -> "by_key"; "manage" -> "manage"; "password-auth" -> "password_auth". */
function normalizeSegment(seg: string): string {
  const paramMatch = seg.match(/^\{(.+)\}$/);
  if (paramMatch) {
    return `by_${sanitizeSegment(paramMatch[1])}`;
  }
  return sanitizeSegment(seg);
}

function pathSegments(path: string): string[] {
  return path.split("/").filter(Boolean).map(normalizeSegment);
}

function joinName(parts: string[]): string {
  return parts
    .join("_")
    .replace(/_+/g, "_")
    .replace(/^_+|_+$/g, "");
}

function truncate(name: string): string {
  if (name.length <= MAX_NAME_LENGTH) return name;
  // Оставляем последний сегмент (метод) читаемым, режем середину.
  const methodSuffixMatch = name.match(/_(get|post|put|delete|patch)$/);
  const suffix = methodSuffixMatch ? methodSuffixMatch[0] : "";
  const head = name.slice(0, MAX_NAME_LENGTH - suffix.length);
  return `${head}${suffix}`.slice(0, MAX_NAME_LENGTH);
}

/**
 * Предпочтительное имя инструмента (с дедупликацией "user" для user-спеки).
 */
export function buildBaseName(spec: SpecKind, path: string, method: HttpMethod): string {
  const segs = pathSegments(path);
  const prefix = spec === "admin" ? "admin" : "user";
  const parts = segs[0] === prefix ? [...segs] : [prefix, ...segs];
  parts.push(method);
  return truncate(joinName(parts));
}

/**
 * Резервное имя без дедупликации ведущего сегмента ("admin"/"user") —
 * используется генератором, когда buildBaseName() приводит к коллизии
 * между двумя разными путями (например GET /service и GET /user/service
 * оба дают "user_service_get").
 */
export function buildFallbackName(spec: SpecKind, path: string, method: HttpMethod): string {
  const segs = pathSegments(path);
  const prefix = spec === "admin" ? "admin" : "user";
  const parts = [prefix, ...segs];
  parts.push(method);
  return truncate(joinName(parts));
}

/** Финальный запасной вариант — гарантированно уникален благодаря числовому суффиксу. */
export function buildNumberedName(base: string, n: number): string {
  const suffix = `_${n}`;
  const head = base.length + suffix.length > MAX_NAME_LENGTH
    ? base.slice(0, MAX_NAME_LENGTH - suffix.length)
    : base;
  return `${head}${suffix}`;
}

export const NAME_PATTERN = /^[a-z0-9_]+$/;

export function isValidToolName(name: string): boolean {
  return name.length > 0 && name.length <= MAX_NAME_LENGTH && NAME_PATTERN.test(name);
}
