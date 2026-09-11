import { describe, expect, it } from "vitest";
import { REDACTED, redact, redactHeaders } from "../src/redact.js";

describe("redact", () => {
  it("redacts top-level sensitive keys entirely", () => {
    const input = { password: "secret123", login: "admin", token: "abc" };
    const out = redact(input) as Record<string, unknown>;
    expect(out.password).toBe(REDACTED);
    expect(out.token).toBe(REDACTED);
    expect(out.login).toBe("admin");
  });

  it("redacts secrets nested arbitrarily deep, e.g. /admin/server.settings", () => {
    const input = {
      server_id: 1,
      host: "1.2.3.4",
      settings: {
        transport: "ssh",
        auth: {
          private_key: "-----BEGIN KEY-----abc",
          nested: { api_key: "xyz" }
        }
      }
    };
    const out = redact(input) as any;
    expect(out.settings.auth.private_key).toBe(REDACTED);
    expect(out.settings.auth.nested.api_key).toBe(REDACTED);
    expect(out.host).toBe("1.2.3.4");
  });

  it("redacts secrets nested in /admin/config.value", () => {
    const input = { key: "smtp", value: { secret: "s3cr3t", host: "smtp.example.com" } };
    const out = redact(input) as any;
    expect(out.value.secret).toBe(REDACTED);
    expect(out.value.host).toBe("smtp.example.com");
  });

  it("redacts telegram bot tokens by shape inside string values regardless of key name", () => {
    const input = { webhook_url: "https://api.telegram.org/bot123456789:AAHdqTcvCH1vGWJxfSeofSAs0K5PALDsaw/setWebhook" };
    const out = redact(input) as any;
    expect(out.webhook_url).not.toContain("AAHdqTcvCH1vGWJxfSeofSAs0K5PALDsaw");
    expect(out.webhook_url).toContain(REDACTED);
  });

  it("redacts user:pass@ credentials embedded in URLs", () => {
    const input = { dsn: "https://myuser:mypassword@example.com/path" };
    const out = redact(input) as any;
    expect(out.dsn).not.toContain("mypassword");
    expect(out.dsn).toBe(`https://${REDACTED}@example.com/path`);
  });

  it("redacts inside arrays", () => {
    const input = [{ token: "a" }, { token: "b" }];
    const out = redact(input) as any[];
    expect(out[0].token).toBe(REDACTED);
    expect(out[1].token).toBe(REDACTED);
  });

  it("does nothing when enabled=false (MCP_REDACT=0)", () => {
    const input = { password: "secret123" };
    const out = redact(input, false) as any;
    expect(out.password).toBe("secret123");
  });

  it("redactHeaders always drops Authorization entirely, case-insensitively", () => {
    const out = redactHeaders({ Authorization: "Basic abc123", "X-Other": "keep-me" });
    expect(out.Authorization).toBeUndefined();
    expect(out["X-Other"]).toBe("keep-me");
  });
});
