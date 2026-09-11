import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { createToolRuntime } from "../src/server.js";
import type { ShmMcpConfig } from "../src/config.js";

let dir: string;
let baseConfig: ShmMcpConfig;

beforeEach(() => {
  dir = mkdtempSync(join(tmpdir(), "shm-mcp-server-"));
  baseConfig = {
    baseUrl: "https://admin.example.com/shm/v1",
    adminAuth: { login: "admin", password: "pw" },
    mode: "rw",
    deny: [],
    denyDefaults: true,
    confirmRequired: true,
    dryRun: false,
    auditLog: join(dir, "audit.jsonl"),
    timeoutMs: 5000,
    maxResponseBytes: 200000,
    toolFilter: undefined,
    redact: true,
    httpPort: undefined,
    httpToken: undefined
  };
});

afterEach(() => {
  vi.unstubAllGlobals();
  rmSync(dir, { recursive: true, force: true });
});

function jsonResponse(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), { status, headers: { "content-type": "application/json" } });
}

describe("createToolRuntime: listTools", () => {
  it("lists 4 service tools + 148 generated tools by default", () => {
    const runtime = createToolRuntime({ config: baseConfig });
    const tools = runtime.listTools();
    const serviceNames = tools.filter((t) => t.name.startsWith("api_")).map((t) => t.name);
    expect(serviceNames.sort()).toEqual(["api_audit_tail", "api_describe", "api_search", "api_status"]);
    expect(tools.length).toBe(4 + 148);
  });

  it("MCP_TOOL_FILTER narrows the generated tool list but keeps service tools", () => {
    const runtime = createToolRuntime({ config: { ...baseConfig, toolFilter: /^admin_user_get$/ } });
    const tools = runtime.listTools();
    const names = tools.map((t) => t.name);
    expect(names).toContain("admin_user_get");
    expect(names).toContain("api_search");
    expect(names).not.toContain("admin_user_post");
    expect(tools.length).toBe(4 + 1);
  });
});

describe("createToolRuntime: callTool for generated tools", () => {
  it("GET tool executes and returns {status, ok, data, truncated}, redacting secrets", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(async () =>
        jsonResponse({ data: [{ id: 1, password: "should-be-hidden" }], items: 1, limit: 1, offset: 0, status: 200 })
      )
    );
    const runtime = createToolRuntime({ config: baseConfig });
    const result = await runtime.callTool("admin_user_get", { limit: 1 });
    expect(result.isError).toBe(false);
    const payload = JSON.parse(result.content[0].text);
    expect(payload.status).toBe(200);
    expect(payload.ok).toBe(true);
    expect(payload.data.data[0].password).toBe("<redacted>");
  });

  it("non-GET tool without confirm returns a preview (no network call)", async () => {
    const fetchMock = vi.fn();
    vi.stubGlobal("fetch", fetchMock);
    const runtime = createToolRuntime({ config: baseConfig });
    const result = await runtime.callTool("admin_user_service_touch_post", {
      body: { user_id: 1, user_service_id: 2 }
    });
    expect(fetchMock).not.toHaveBeenCalled();
    const payload = JSON.parse(result.content[0].text);
    expect(payload.preview).toBe(true);
    expect(payload.method).toBe("POST");
    expect(payload.headers.Authorization).toBeUndefined();
  });

  it("non-GET tool with confirm:true executes", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => jsonResponse({ status: 200 })));
    const runtime = createToolRuntime({ config: baseConfig });
    const result = await runtime.callTool("admin_user_service_touch_post", {
      body: { user_id: 1, user_service_id: 2 },
      confirm: true
    });
    expect(result.isError).toBe(false);
    const payload = JSON.parse(result.content[0].text);
    expect(payload.ok).toBe(true);
  });

  it("default-denied tool (GET /admin/server/identity) is refused with isError:true", async () => {
    const fetchMock = vi.fn();
    vi.stubGlobal("fetch", fetchMock);
    const runtime = createToolRuntime({ config: baseConfig });
    const result = await runtime.callTool("admin_server_identity_get", {});
    expect(fetchMock).not.toHaveBeenCalled();
    expect(result.isError).toBe(true);
    const payload = JSON.parse(result.content[0].text);
    expect(payload.denied).toBe(true);
  });

  it("ro mode blocks a mutating GET (user_template_by_id_get)", async () => {
    const fetchMock = vi.fn();
    vi.stubGlobal("fetch", fetchMock);
    const runtime = createToolRuntime({ config: { ...baseConfig, mode: "ro" } });
    const result = await runtime.callTool("user_template_by_id_get", { id: 5 });
    expect(fetchMock).not.toHaveBeenCalled();
    expect(result.isError).toBe(true);
  });

  it("unknown tool name returns isError:true", async () => {
    const runtime = createToolRuntime({ config: baseConfig });
    const result = await runtime.callTool("no_such_tool", {});
    expect(result.isError).toBe(true);
  });

  it("resolves path params via encodeURIComponent (admin_config_by_key_get)", async () => {
    const fetchMock = vi.fn(async () => jsonResponse({ status: 200 }));
    vi.stubGlobal("fetch", fetchMock);
    const runtime = createToolRuntime({ config: baseConfig });
    await runtime.callTool("admin_config_by_key_get", { key: "a b" });
    const [url] = fetchMock.mock.calls[0] as [string];
    expect(url).toBe(`https://admin.example.com/shm/v1/admin/config/${encodeURIComponent("a b")}`);
  });
});

describe("createToolRuntime: service tools", () => {
  it("api_search finds tools by substring", async () => {
    const runtime = createToolRuntime({ config: baseConfig });
    const result = await runtime.callTool("api_search", { query: "spool/manual" });
    const payload = JSON.parse(result.content[0].text);
    expect(payload.count).toBeGreaterThan(0);
    expect(payload.tools.some((t: any) => t.name === "admin_spool_manual_by_action_post")).toBe(true);
  });

  it("api_describe returns the full input schema for a tool", async () => {
    const runtime = createToolRuntime({ config: baseConfig });
    const result = await runtime.callTool("api_describe", { tool: "admin_user_get" });
    const payload = JSON.parse(result.content[0].text);
    expect(payload.ok).toBe(true);
    expect(payload.inputSchema.properties.limit).toBeTruthy();
  });

  it("api_status reports mode, base host, tool count, spec version and reachability", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => jsonResponse({ status: 200 })));
    const runtime = createToolRuntime({ config: baseConfig });
    const result = await runtime.callTool("api_status", {});
    const payload = JSON.parse(result.content[0].text);
    expect(payload.mode).toBe("rw");
    expect(payload.baseHost).toBe("admin.example.com");
    expect(payload.toolCount).toBe(148);
    expect(payload.check.status).toBe(200);
  });

  it("api_audit_tail returns entries written by prior calls", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => jsonResponse({ status: 200 })));
    const runtime = createToolRuntime({ config: baseConfig });
    await runtime.callTool("admin_user_get", { limit: 1 });
    const result = await runtime.callTool("api_audit_tail", { n: 5 });
    const payload = JSON.parse(result.content[0].text);
    expect(payload.count).toBeGreaterThanOrEqual(1);
    expect(payload.entries[0].tool).toBe("admin_user_get");
  });
});
