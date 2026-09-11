/** Сборка MCP Server: list/call handlers, служебные инструменты. */
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { CallToolRequestSchema, ListToolsRequestSchema } from "@modelcontextprotocol/sdk/types.js";

import type { ShmMcpConfig } from "./config.js";
import { ShmClient } from "./client.js";
import { resolvePath } from "./pathutil.js";
import { evaluateGate } from "./gate.js";
import { redact, redactHeaders } from "./redact.js";
import { appendAudit, tailAudit, type AuditResult } from "./audit.js";
import { SPEC_VERSION, TOOLS } from "./generated/tools.js";
import type { ToolDef } from "./types.js";

const SERVICE_TOOL_NAMES = ["api_search", "api_describe", "api_status", "api_audit_tail"] as const;

export interface McpToolShape {
  name: string;
  description: string;
  inputSchema: Record<string, unknown>;
}

export interface CallToolTextResult {
  content: [{ type: "text"; text: string }];
  isError: boolean;
}

function pathParamNames(path: string): Set<string> {
  const out = new Set<string>();
  const re = /\{([^}]+)\}/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(path))) {
    out.add(m[1]);
  }
  return out;
}

function jsonContent(payload: unknown, isError = false): CallToolTextResult {
  return {
    content: [{ type: "text", text: JSON.stringify(payload, null, 2) }],
    isError
  };
}

function serviceToolDefs(): McpToolShape[] {
  return [
    {
      name: "api_search",
      description:
        "Поиск инструментов SHM по имени/пути/описанию/тегу. Ищет по полному списку из обеих спек (admin+user), независимо от MCP_TOOL_FILTER.",
      inputSchema: {
        type: "object",
        properties: {
          query: { type: "string", description: "Подстрока для поиска (регистронезависимо)" }
        },
        required: ["query"]
      }
    },
    {
      name: "api_describe",
      description: "Полная схема входа и заметки безопасности для указанного инструмента.",
      inputSchema: {
        type: "object",
        properties: {
          tool: { type: "string", description: "Имя инструмента (как в api_search)" }
        },
        required: ["tool"]
      }
    },
    {
      name: "api_status",
      description:
        "Режим, базовый URL (без секрета), число инструментов, версия спеки; проверка доступности через GET /admin/user?limit=1 (только код ответа).",
      inputSchema: { type: "object", properties: {} }
    },
    {
      name: "api_audit_tail",
      description: "Последние n записей журнала аудита (MCP_AUDIT_LOG).",
      inputSchema: {
        type: "object",
        properties: {
          n: { type: "integer", description: "Сколько последних записей вернуть", default: 20 }
        }
      }
    }
  ];
}

function toolNotesFor(tool: ToolDef): string[] {
  const notes: string[] = [];
  if (tool.method === "GET") {
    notes.push("Безопасный метод GET.");
  } else {
    notes.push("Изменяющая операция: в режиме rw требует confirm:true (если не MCP_DRY_RUN).");
  }
  if (tool.spec === "user") {
    notes.push("user-спека: опциональный user_id — от имени какого пользователя действует админ.");
  }
  return notes;
}

export interface ToolRuntimeDeps {
  config: ShmMcpConfig;
  client?: ShmClient;
}

export interface ToolRuntime {
  listTools(): McpToolShape[];
  callTool(name: string, args: Record<string, unknown>): Promise<CallToolTextResult>;
}

/**
 * Основная логика сервера (список/вызов инструментов), отделённая от транспорта MCP,
 * чтобы её можно было напрямую использовать в тестах и scripts/smoke.ts.
 */
export function createToolRuntime(deps: ToolRuntimeDeps): ToolRuntime {
  const { config } = deps;
  const client =
    deps.client ??
    new ShmClient({
      baseUrl: config.baseUrl,
      adminAuth: config.adminAuth,
      timeoutMs: config.timeoutMs,
      maxResponseBytes: config.maxResponseBytes
    });

  const toolByName = new Map<string, ToolDef>(TOOLS.map((t) => [t.name, t]));

  function visibleGeneratedTools(): ToolDef[] {
    if (!config.toolFilter) return TOOLS;
    return TOOLS.filter((t) => config.toolFilter!.test(t.name));
  }

  async function handleServiceTool(name: string, args: Record<string, unknown>): Promise<CallToolTextResult> {
    switch (name) {
      case "api_search": {
        const query = String(args.query ?? "").toLowerCase();
        const matches = TOOLS.filter((t) => {
          const haystack = `${t.name} ${t.path} ${t.method} ${t.summary} ${t.tag} ${t.description}`.toLowerCase();
          return haystack.includes(query);
        }).map((t) => ({ name: t.name, method: t.method, path: t.path, summary: t.summary, tag: t.tag, spec: t.spec }));
        return jsonContent({ ok: true, count: matches.length, tools: matches });
      }
      case "api_describe": {
        const toolName = String(args.tool ?? "");
        const tool = toolByName.get(toolName);
        if (!tool) {
          return jsonContent({ ok: false, error: `Инструмент "${toolName}" не найден` }, true);
        }
        return jsonContent({
          ok: true,
          name: tool.name,
          method: tool.method,
          path: tool.path,
          spec: tool.spec,
          tag: tool.tag,
          summary: tool.summary,
          description: tool.description,
          inputSchema: tool.inputSchema,
          notes: toolNotesFor(tool)
        });
      }
      case "api_status": {
        const start = Date.now();
        let status: number | null = null;
        let ok = false;
        let errorMessage: string | undefined;
        try {
          const result = await client.request({ method: "GET", path: "/admin/user", query: { limit: 1 } });
          status = result.status;
          ok = result.ok;
        } catch (err) {
          errorMessage = err instanceof Error ? err.message : String(err);
        }
        let host = "";
        try {
          host = new URL(config.baseUrl).host;
        } catch {
          host = "(invalid SHM_BASE_URL)";
        }
        return jsonContent({
          ok: errorMessage === undefined,
          mode: config.mode,
          baseHost: host,
          toolCount: TOOLS.length,
          specVersion: SPEC_VERSION,
          check: {
            method: "GET",
            path: "/admin/user?limit=1",
            status,
            reachable: ok,
            error: errorMessage,
            durationMs: Date.now() - start
          }
        });
      }
      case "api_audit_tail": {
        const n = typeof args.n === "number" && args.n > 0 ? Math.floor(args.n) : 20;
        const entries = tailAudit(config.auditLog, n);
        return jsonContent({ ok: true, count: entries.length, entries });
      }
      default:
        return jsonContent({ ok: false, error: `Неизвестный служебный инструмент: ${name}` }, true);
    }
  }

  async function handleGeneratedTool(tool: ToolDef, args: Record<string, unknown>): Promise<CallToolTextResult> {
    const pathParams = pathParamNames(tool.path);
    const confirm = args.confirm === true;

    let resolvedPath: string;
    try {
      resolvedPath = resolvePath(tool.path, args).path;
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      return jsonContent({ ok: false, error: message }, true);
    }

    const query: Record<string, unknown> = {};
    for (const key of Object.keys(tool.inputSchema.properties)) {
      if (pathParams.has(key) || key === "body" || key === "confirm") continue;
      if (args[key] !== undefined) query[key] = args[key];
    }

    const decision = evaluateGate(
      { method: tool.method, resolvedPath, confirm },
      {
        mode: config.mode,
        deny: config.deny,
        denyDefaults: config.denyDefaults,
        confirmRequired: config.confirmRequired,
        dryRun: config.dryRun
      }
    );

    const url = client.buildUrl(resolvedPath, query);
    const bodySchemaDescription = tool.inputSchema.properties.body?.description as string | undefined;
    const bodyContentType = bodySchemaDescription?.includes("text/plain")
      ? ("text/plain" as const)
      : ("application/json" as const);
    const redactedBody = args.body !== undefined ? redact(args.body, config.redact) : undefined;

    const auditBase = {
      time: new Date().toISOString(),
      tool: tool.name,
      method: tool.method,
      url,
      confirm,
      mode: config.mode
    };

    if (decision.decision === "deny") {
      appendAudit(config.auditLog, {
        ...auditBase,
        durationMs: 0,
        result: "denied" as AuditResult,
        reason: decision.reason,
        body: redactedBody
      });
      return jsonContent({ ok: false, denied: true, reason: decision.reason }, true);
    }

    if (decision.decision === "preview") {
      appendAudit(config.auditLog, {
        ...auditBase,
        durationMs: 0,
        result: "preview" as AuditResult,
        reason: decision.reason,
        body: redactedBody
      });
      return jsonContent({
        preview: true,
        method: tool.method,
        url,
        headers: redactHeaders({ Accept: "application/json" }),
        body: redactedBody
      });
    }

    const start = Date.now();
    try {
      const result = await client.request({
        method: tool.method,
        path: resolvedPath,
        query,
        body: args.body,
        bodyContentType
      });
      const durationMs = Date.now() - start;
      appendAudit(config.auditLog, {
        ...auditBase,
        status: result.status,
        durationMs,
        result: (result.ok ? "ok" : "error") as AuditResult,
        body: redactedBody
      });
      return jsonContent(
        {
          status: result.status,
          ok: result.ok,
          data: redact(result.data, config.redact),
          truncated: result.truncated
        },
        !result.ok
      );
    } catch (err) {
      const durationMs = Date.now() - start;
      const message = err instanceof Error ? err.message : String(err);
      appendAudit(config.auditLog, {
        ...auditBase,
        durationMs,
        result: "error" as AuditResult,
        reason: message,
        body: redactedBody
      });
      return jsonContent({ ok: false, error: message }, true);
    }
  }

  return {
    listTools(): McpToolShape[] {
      const generated: McpToolShape[] = visibleGeneratedTools().map((t) => ({
        name: t.name,
        description: t.description,
        inputSchema: t.inputSchema as unknown as Record<string, unknown>
      }));
      return [...serviceToolDefs(), ...generated];
    },
    async callTool(name: string, args: Record<string, unknown>): Promise<CallToolTextResult> {
      if ((SERVICE_TOOL_NAMES as readonly string[]).includes(name)) {
        return handleServiceTool(name, args);
      }
      const tool = toolByName.get(name);
      if (!tool) {
        return jsonContent({ ok: false, error: `Неизвестный инструмент: ${name}` }, true);
      }
      if (config.toolFilter && !config.toolFilter.test(tool.name)) {
        return jsonContent({ ok: false, error: `Инструмент "${name}" скрыт MCP_TOOL_FILTER` }, true);
      }
      return handleGeneratedTool(tool, args);
    }
  };
}

export interface BuildServerDeps {
  config: ShmMcpConfig;
  client?: ShmClient;
}

export function buildServer(deps: BuildServerDeps): Server {
  const runtime = createToolRuntime(deps);

  const server = new Server({ name: "shm-mcp", version: "0.1.0" }, { capabilities: { tools: {} } });

  server.setRequestHandler(ListToolsRequestSchema, async () => {
    return { tools: runtime.listTools() };
  });

  server.setRequestHandler(CallToolRequestSchema, async (request): Promise<Record<string, unknown>> => {
    const { name } = request.params;
    const args = (request.params.arguments ?? {}) as Record<string, unknown>;
    const result = await runtime.callTool(name, args);
    return result as unknown as Record<string, unknown>;
  });

  return server;
}
