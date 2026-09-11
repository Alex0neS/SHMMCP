import { describe, expect, it } from "vitest";
import { evaluateGate, isMutatingGetPath, parseDenyRule, type GateConfig } from "../src/gate.js";

const baseRo: GateConfig = {
  mode: "ro",
  deny: [],
  denyDefaults: true,
  confirmRequired: true,
  dryRun: false
};

const baseRw: GateConfig = {
  mode: "rw",
  deny: [],
  denyDefaults: true,
  confirmRequired: true,
  dryRun: false
};

describe("gate: ro mode", () => {
  it("allows plain GET", () => {
    const d = evaluateGate({ method: "GET", resolvedPath: "/admin/user" }, baseRo);
    expect(d.decision).toBe("allow");
  });

  it("blocks any non-GET", () => {
    const d = evaluateGate({ method: "POST", resolvedPath: "/admin/user/service/touch", confirm: true }, baseRo);
    expect(d.decision).toBe("deny");
  });

  it.each([
    "/promo/apply/ABC123",
    "/template/5",
    "/public/9",
    "/user/passwd/reset",
    "/user/passkey/register",
    "/user/auth/passkey",
    "/user/otp/setup"
  ])("blocks mutating GET at %s even though method is GET", (resolvedPath) => {
    const d = evaluateGate({ method: "GET", resolvedPath }, baseRo);
    expect(d.decision).toBe("deny");
  });

  it("does not block admin GET /admin/template/{id} (read-only, not mutating)", () => {
    const d = evaluateGate({ method: "GET", resolvedPath: "/admin/template/5" }, baseRo);
    expect(d.decision).toBe("allow");
  });
});

describe("gate: rw mode confirm/dry-run", () => {
  it("previews non-GET without confirm", () => {
    const d = evaluateGate({ method: "POST", resolvedPath: "/admin/user/service/touch", confirm: false }, baseRw);
    expect(d.decision).toBe("preview");
  });

  it("executes non-GET with confirm:true", () => {
    const d = evaluateGate({ method: "POST", resolvedPath: "/admin/user/service/touch", confirm: true }, baseRw);
    expect(d.decision).toBe("allow");
  });

  it("dry-run always previews non-GET, even with confirm:true", () => {
    const cfg: GateConfig = { ...baseRw, dryRun: true };
    const d = evaluateGate({ method: "POST", resolvedPath: "/admin/user/service/touch", confirm: true }, cfg);
    expect(d.decision).toBe("preview");
  });

  it("confirmRequired=false executes non-GET immediately", () => {
    const cfg: GateConfig = { ...baseRw, confirmRequired: false };
    const d = evaluateGate({ method: "POST", resolvedPath: "/admin/user/service/touch" }, cfg);
    expect(d.decision).toBe("allow");
  });

  it("GET always allowed in rw regardless of confirm/dry-run", () => {
    const cfg: GateConfig = { ...baseRw, dryRun: true };
    const d = evaluateGate({ method: "GET", resolvedPath: "/admin/user" }, cfg);
    expect(d.decision).toBe("allow");
  });
});

describe("gate: default deny list", () => {
  it("denies GET /admin/server/identity (private SSH keys)", () => {
    const d = evaluateGate({ method: "GET", resolvedPath: "/admin/server/identity" }, baseRw);
    expect(d.decision).toBe("deny");
  });

  it("denies DELETE /admin/config", () => {
    const d = evaluateGate({ method: "DELETE", resolvedPath: "/admin/config" }, baseRw);
    expect(d.decision).toBe("deny");
  });

  it("denies PUT /admin/spool (mass mailing)", () => {
    const d = evaluateGate({ method: "PUT", resolvedPath: "/admin/spool", confirm: true }, baseRw);
    expect(d.decision).toBe("deny");
  });

  it("denies DELETE /admin/user/pay, /admin/user/bonus, /admin/user/service/withdraw", () => {
    for (const path of ["/admin/user/pay", "/admin/user/bonus", "/admin/user/service/withdraw"]) {
      const d = evaluateGate({ method: "DELETE", resolvedPath: path, confirm: true }, baseRw);
      expect(d.decision, path).toBe("deny");
    }
  });

  it.each(["success", "set", "add"])(
    "denies POST /admin/spool/manual/%s using the RESOLVED path (action substituted)",
    (action) => {
      const resolvedPath = `/admin/spool/manual/${action}`;
      const d = evaluateGate({ method: "POST", resolvedPath, confirm: true }, baseRw);
      expect(d.decision).toBe("deny");
    }
  );

  it.each(["retry", "resume", "pause"])(
    "allows POST /admin/spool/manual/%s (not in the deny list) with confirm:true",
    (action) => {
      const resolvedPath = `/admin/spool/manual/${action}`;
      const d = evaluateGate({ method: "POST", resolvedPath, confirm: true }, baseRw);
      expect(d.decision).toBe("allow");
    }
  );

  it("MCP_DENY_DEFAULTS=0 disables the default deny list", () => {
    const cfg: GateConfig = { ...baseRw, denyDefaults: false };
    const d = evaluateGate({ method: "GET", resolvedPath: "/admin/server/identity" }, cfg);
    expect(d.decision).toBe("allow");
  });
});

describe("gate: MCP_DENY custom rules", () => {
  it("parses 'METHOD /prefix' form", () => {
    expect(parseDenyRule("POST /admin/user")).toEqual({ method: "POST", prefix: "/admin/user" });
  });

  it("parses '/prefix' form (applies to all methods)", () => {
    expect(parseDenyRule("/admin/user")).toEqual({ prefix: "/admin/user" });
  });

  it("custom deny rule blocks matching method+prefix", () => {
    const cfg: GateConfig = { ...baseRw, deny: ["POST /admin/user"] };
    const d = evaluateGate({ method: "POST", resolvedPath: "/admin/user", confirm: true }, cfg);
    expect(d.decision).toBe("deny");
  });

  it("custom deny rule without method blocks all methods on prefix", () => {
    const cfg: GateConfig = { ...baseRw, deny: ["/admin/user"] };
    expect(evaluateGate({ method: "GET", resolvedPath: "/admin/user" }, cfg).decision).toBe("deny");
    expect(
      evaluateGate({ method: "DELETE", resolvedPath: "/admin/user", confirm: true }, cfg).decision
    ).toBe("deny");
  });
});

describe("isMutatingGetPath", () => {
  it("matches known mutating prefixes", () => {
    expect(isMutatingGetPath("/promo/apply/XYZ")).toBe(true);
    expect(isMutatingGetPath("/template/1")).toBe(true);
  });
  it("does not match unrelated paths", () => {
    expect(isMutatingGetPath("/admin/template/1")).toBe(false);
    expect(isMutatingGetPath("/service")).toBe(false);
  });
});
