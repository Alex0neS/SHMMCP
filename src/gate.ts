/**
 * Слой безопасности: режим ro/rw, denylist, мутирующие GET, confirm, dry-run.
 *
 * Порядок проверок:
 *   1. MCP_DENY (пользовательские правила) + дефолтный denylist (MCP_DENY_DEFAULTS) —
 *      отказ при совпадении, независимо от режима.
 *   2. В режиме "ro": разрешён только GET, кроме "мутирующих GET" (denylist ниже) —
 *      они запрещены даже в ro. Любой не-GET в ro запрещён.
 *   3. В режиме "rw": не-GET проверяется на MCP_DRY_RUN (всегда превью) и
 *      MCP_CONFIRM (без confirm:true — превью, с confirm:true — выполнение).
 *
 * Правила deny проверяются на РАЗРЕШЁННОМ (после подстановки path-параметров) пути —
 * это важно для "POST /admin/spool/manual/{action}", где само действие (success/set/add)
 * определяет, запрещена ли операция.
 */
import type { HttpMethod } from "./types.js";

export interface DenyRule {
  method?: HttpMethod;
  prefix: string;
}

/**
 * Мутирующие GET-операции SHM — при MCP_MODE=ro запрещены, даже будучи методом GET.
 * Сопоставляются с уже разрешённым (resolved) путём через startsWith.
 */
export const MUTATING_GET_PREFIXES: readonly string[] = [
  "/promo/apply",
  "/template/",
  "/public/",
  "/user/passwd/reset",
  "/user/passkey/register",
  "/user/auth/passkey",
  "/user/otp/setup"
];

/**
 * Дефолтный denylist для SHM (см. ARCHITECTURE.md и §4 audit/docs/40_HQ_MCP_REVIEW.md).
 * Активен, если MCP_DENY_DEFAULTS=1 (по умолчанию).
 */
export const DEFAULT_DENY_RULES: readonly DenyRule[] = [
  { method: "GET", prefix: "/admin/server/identity" }, // приватные SSH-ключи
  { method: "DELETE", prefix: "/admin/config" },
  { method: "POST", prefix: "/admin/spool/manual/success" },
  { method: "POST", prefix: "/admin/spool/manual/set" },
  { method: "POST", prefix: "/admin/spool/manual/add" },
  { method: "PUT", prefix: "/admin/spool" }, // массовая рассылка
  { method: "DELETE", prefix: "/admin/user/pay" },
  { method: "DELETE", prefix: "/admin/user/bonus" },
  { method: "DELETE", prefix: "/admin/user/service/withdraw" }
];

const METHOD_NAMES = new Set<string>(["GET", "POST", "PUT", "DELETE", "PATCH"]);

/** Разбирает одно правило MCP_DENY: "METHOD /prefix" или просто "/prefix" (все методы). */
export function parseDenyRule(raw: string): DenyRule | undefined {
  const trimmed = raw.trim();
  if (!trimmed) return undefined;
  const spaceIdx = trimmed.indexOf(" ");
  if (spaceIdx > 0) {
    const maybeMethod = trimmed.slice(0, spaceIdx).toUpperCase();
    const rest = trimmed.slice(spaceIdx + 1).trim();
    if (METHOD_NAMES.has(maybeMethod) && rest.length > 0) {
      return { method: maybeMethod as HttpMethod, prefix: rest };
    }
  }
  return { prefix: trimmed };
}

export function parseDenyRules(raw: readonly string[]): DenyRule[] {
  const out: DenyRule[] = [];
  for (const r of raw) {
    const parsed = parseDenyRule(r);
    if (parsed) out.push(parsed);
  }
  return out;
}

function ruleMatches(rule: DenyRule, method: HttpMethod, resolvedPath: string): boolean {
  if (rule.method && rule.method !== method) return false;
  return resolvedPath.startsWith(rule.prefix);
}

export function isMutatingGetPath(resolvedPath: string): boolean {
  return MUTATING_GET_PREFIXES.some((prefix) => resolvedPath.startsWith(prefix));
}

export type GateDecisionKind = "allow" | "deny" | "preview";

export interface GateDecision {
  decision: GateDecisionKind;
  reason: string;
}

export interface GateConfig {
  mode: "ro" | "rw";
  deny: readonly string[];
  denyDefaults: boolean;
  confirmRequired: boolean;
  dryRun: boolean;
}

export interface GateInput {
  method: HttpMethod;
  /** Путь после подстановки path-параметров, например "/admin/spool/manual/success". */
  resolvedPath: string;
  confirm?: boolean;
}

export function evaluateGate(input: GateInput, cfg: GateConfig): GateDecision {
  const rules: DenyRule[] = [
    ...(cfg.denyDefaults ? DEFAULT_DENY_RULES : []),
    ...parseDenyRules(cfg.deny)
  ];

  for (const rule of rules) {
    if (ruleMatches(rule, input.method, input.resolvedPath)) {
      const methodPart = rule.method ? `${rule.method} ` : "";
      return { decision: "deny", reason: `deny rule: ${methodPart}${rule.prefix}` };
    }
  }

  if (input.method === "GET") {
    if (cfg.mode === "ro" && isMutatingGetPath(input.resolvedPath)) {
      return { decision: "deny", reason: "mutating GET запрещён в режиме ro" };
    }
    return { decision: "allow", reason: "GET разрешён" };
  }

  // не-GET
  if (cfg.mode === "ro") {
    return { decision: "deny", reason: "не-GET запрещён в режиме ro" };
  }

  if (cfg.dryRun) {
    return { decision: "preview", reason: "MCP_DRY_RUN=1: превью без выполнения" };
  }

  if (cfg.confirmRequired && input.confirm !== true) {
    return { decision: "preview", reason: "требуется confirm:true для выполнения" };
  }

  return { decision: "allow", reason: "не-GET разрешён (rw, confirm выполнен)" };
}
