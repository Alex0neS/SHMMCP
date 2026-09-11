/** Конфигурация из env, валидированная zod. Секреты — только env или *_FILE. */
import { readFileSync } from "node:fs";
import { z } from "zod";

function readFileTrimmed(path: string): string {
  return readFileSync(path, "utf-8").trim();
}

const envSchema = z.object({
  SHM_BASE_URL: z.string().min(1, "SHM_BASE_URL обязателен").url(),
  SHM_ADMIN_AUTH: z.string().optional(),
  SHM_ADMIN_AUTH_FILE: z.string().optional(),
  MCP_MODE: z.enum(["ro", "rw"]).default("ro"),
  MCP_DENY: z.string().optional().default(""),
  MCP_DENY_DEFAULTS: z.string().optional().default("1"),
  MCP_CONFIRM: z.string().optional(),
  MCP_DRY_RUN: z.string().optional().default("0"),
  MCP_AUDIT_LOG: z.string().optional().default("./.audit/shm-mcp.jsonl"),
  MCP_TIMEOUT_MS: z.string().optional().default("30000"),
  MCP_MAX_RESPONSE_BYTES: z.string().optional().default("200000"),
  MCP_TOOL_FILTER: z.string().optional().default(""),
  MCP_REDACT: z.string().optional().default("1"),
  MCP_HTTP_PORT: z.string().optional(),
  MCP_HTTP_TOKEN: z.string().optional()
});

export interface ShmMcpConfig {
  baseUrl: string;
  adminAuth: { login: string; password: string };
  mode: "ro" | "rw";
  deny: string[];
  denyDefaults: boolean;
  confirmRequired: boolean;
  dryRun: boolean;
  auditLog: string;
  timeoutMs: number;
  maxResponseBytes: number;
  toolFilter: RegExp | undefined;
  redact: boolean;
  httpPort: number | undefined;
  httpToken: string | undefined;
}

function parseBool(value: string | undefined, fallback: boolean): boolean {
  if (value === undefined || value === "") return fallback;
  return value === "1" || value.toLowerCase() === "true";
}

function parseAdminAuth(raw: string | undefined, filePath: string | undefined): { login: string; password: string } {
  let value: string | undefined;
  if (filePath) {
    value = readFileTrimmed(filePath);
  } else if (raw) {
    value = raw;
  }
  if (!value) {
    throw new Error(
      "Не задан SHM_ADMIN_AUTH или SHM_ADMIN_AUTH_FILE (формат: login:password)"
    );
  }
  const idx = value.indexOf(":");
  if (idx < 0) {
    throw new Error('SHM_ADMIN_AUTH должен быть в формате "login:password"');
  }
  const login = value.slice(0, idx);
  const password = value.slice(idx + 1);
  if (!login || !password) {
    throw new Error('SHM_ADMIN_AUTH должен быть в формате "login:password"');
  }
  return { login, password };
}

export function loadConfig(env: NodeJS.ProcessEnv = process.env): ShmMcpConfig {
  const parsed = envSchema.parse(env);

  const adminAuth = parseAdminAuth(parsed.SHM_ADMIN_AUTH, parsed.SHM_ADMIN_AUTH_FILE);

  const deny = parsed.MCP_DENY.split(",")
    .map((s) => s.trim())
    .filter((s) => s.length > 0);

  const denyDefaults = parseBool(parsed.MCP_DENY_DEFAULTS, true);
  const dryRun = parseBool(parsed.MCP_DRY_RUN, false);
  const confirmRequired = parseBool(parsed.MCP_CONFIRM, parsed.MCP_MODE === "rw");
  const redact = parseBool(parsed.MCP_REDACT, true);

  const toolFilter = parsed.MCP_TOOL_FILTER ? new RegExp(parsed.MCP_TOOL_FILTER) : undefined;

  const baseUrl = parsed.SHM_BASE_URL.replace(/\/+$/, "");

  return {
    baseUrl,
    adminAuth,
    mode: parsed.MCP_MODE,
    deny,
    denyDefaults,
    confirmRequired,
    dryRun,
    auditLog: parsed.MCP_AUDIT_LOG,
    timeoutMs: Number(parsed.MCP_TIMEOUT_MS) || 30000,
    maxResponseBytes: Number(parsed.MCP_MAX_RESPONSE_BYTES) || 200000,
    toolFilter,
    redact,
    httpPort: parsed.MCP_HTTP_PORT ? Number(parsed.MCP_HTTP_PORT) : undefined,
    httpToken: parsed.MCP_HTTP_TOKEN
  };
}
