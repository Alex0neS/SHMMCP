import { mkdtempSync, readFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { appendAudit, tailAudit } from "../src/audit.js";

let dir: string;
let logPath: string;

beforeEach(() => {
  dir = mkdtempSync(join(tmpdir(), "shm-mcp-audit-"));
  logPath = join(dir, "sub", "audit.jsonl");
});

afterEach(() => {
  rmSync(dir, { recursive: true, force: true });
});

describe("audit", () => {
  it("creates parent directories and appends one JSON object per line", () => {
    appendAudit(logPath, {
      time: "2026-01-01T00:00:00.000Z",
      tool: "admin_user_get",
      method: "GET",
      url: "https://admin.example.com/shm/v1/admin/user",
      status: 200,
      durationMs: 12,
      confirm: false,
      mode: "ro",
      result: "ok"
    });

    const content = readFileSync(logPath, "utf-8").trim();
    const lines = content.split("\n");
    expect(lines.length).toBe(1);
    const parsed = JSON.parse(lines[0]);
    expect(parsed.tool).toBe("admin_user_get");
    expect(parsed.result).toBe("ok");
  });

  it("never contains an Authorization field", () => {
    appendAudit(logPath, {
      time: "2026-01-01T00:00:00.000Z",
      tool: "admin_user_get",
      method: "GET",
      url: "https://admin.example.com/shm/v1/admin/user",
      durationMs: 1,
      confirm: false,
      mode: "ro",
      result: "ok"
    });
    const content = readFileSync(logPath, "utf-8");
    expect(content.toLowerCase()).not.toContain("authorization");
  });

  it("tailAudit returns the last n entries, most recent last, and [] when the file is missing", () => {
    expect(tailAudit(logPath, 5)).toEqual([]);
    for (let i = 0; i < 5; i++) {
      appendAudit(logPath, {
        time: `2026-01-01T00:00:0${i}.000Z`,
        tool: `tool_${i}`,
        method: "GET",
        url: "https://x/y",
        durationMs: 1,
        confirm: false,
        mode: "ro",
        result: "ok"
      });
    }
    const tail = tailAudit(logPath, 2);
    expect(tail.length).toBe(2);
    expect(tail[0].tool).toBe("tool_3");
    expect(tail[1].tool).toBe("tool_4");
  });
});
