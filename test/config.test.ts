import { mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { loadConfig } from "../src/config.js";

function env(overrides: Record<string, string | undefined>): NodeJS.ProcessEnv {
  return { ...overrides } as NodeJS.ProcessEnv;
}

let dir: string;

beforeEach(() => {
  dir = mkdtempSync(join(tmpdir(), "shm-mcp-config-"));
});

afterEach(() => {
  rmSync(dir, { recursive: true, force: true });
});

describe("loadConfig", () => {
  it("parses SHM_ADMIN_AUTH as login:password and strips trailing slash from base URL", () => {
    const cfg = loadConfig(
      env({ SHM_BASE_URL: "https://admin.example.com/shm/v1/", SHM_ADMIN_AUTH: "admin:s3cret" })
    );
    expect(cfg.baseUrl).toBe("https://admin.example.com/shm/v1");
    expect(cfg.adminAuth).toEqual({ login: "admin", password: "s3cret" });
    expect(cfg.mode).toBe("ro");
  });

  it("reads SHM_ADMIN_AUTH_FILE when set, preferring it over SHM_ADMIN_AUTH", () => {
    const file = join(dir, "auth.txt");
    writeFileSync(file, "fileuser:filepass\n");
    const cfg = loadConfig(
      env({
        SHM_BASE_URL: "https://admin.example.com/shm/v1",
        SHM_ADMIN_AUTH: "ignored:ignored",
        SHM_ADMIN_AUTH_FILE: file
      })
    );
    expect(cfg.adminAuth).toEqual({ login: "fileuser", password: "filepass" });
  });

  it("throws when neither SHM_ADMIN_AUTH nor SHM_ADMIN_AUTH_FILE is set", () => {
    expect(() => loadConfig(env({ SHM_BASE_URL: "https://admin.example.com/shm/v1" }))).toThrow();
  });

  it("throws when SHM_BASE_URL is missing", () => {
    expect(() => loadConfig(env({ SHM_ADMIN_AUTH: "a:b" }))).toThrow();
  });

  it("MCP_CONFIRM defaults to true in rw and is irrelevant (non-GET blocked anyway) in ro", () => {
    const rw = loadConfig(
      env({ SHM_BASE_URL: "https://x/shm/v1", SHM_ADMIN_AUTH: "a:b", MCP_MODE: "rw" })
    );
    expect(rw.confirmRequired).toBe(true);

    const ro = loadConfig(env({ SHM_BASE_URL: "https://x/shm/v1", SHM_ADMIN_AUTH: "a:b", MCP_MODE: "ro" }));
    expect(ro.confirmRequired).toBe(false);
  });

  it("MCP_DENY is split on commas and trimmed", () => {
    const cfg = loadConfig(
      env({
        SHM_BASE_URL: "https://x/shm/v1",
        SHM_ADMIN_AUTH: "a:b",
        MCP_DENY: "POST /admin/user, DELETE /admin/config"
      })
    );
    expect(cfg.deny).toEqual(["POST /admin/user", "DELETE /admin/config"]);
  });

  it("MCP_TOOL_FILTER compiles to a RegExp, absent by default", () => {
    const withFilter = loadConfig(
      env({ SHM_BASE_URL: "https://x/shm/v1", SHM_ADMIN_AUTH: "a:b", MCP_TOOL_FILTER: "^admin_user" })
    );
    expect(withFilter.toolFilter?.test("admin_user_get")).toBe(true);
    expect(withFilter.toolFilter?.test("user_pay_forecast_get")).toBe(false);

    const noFilter = loadConfig(env({ SHM_BASE_URL: "https://x/shm/v1", SHM_ADMIN_AUTH: "a:b" }));
    expect(noFilter.toolFilter).toBeUndefined();
  });

  it("MCP_DENY_DEFAULTS=0 disables the default deny list flag", () => {
    const cfg = loadConfig(
      env({ SHM_BASE_URL: "https://x/shm/v1", SHM_ADMIN_AUTH: "a:b", MCP_DENY_DEFAULTS: "0" })
    );
    expect(cfg.denyDefaults).toBe(false);
  });
});
