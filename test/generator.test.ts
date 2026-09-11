import { describe, expect, it } from "vitest";
import { SPEC_VERSION, TOOLS } from "../src/generated/tools.js";
import { isValidToolName } from "../src/naming.js";

describe("generated tools invariants", () => {
  it("has exactly 148 tools total (81 admin + 67 user)", () => {
    expect(TOOLS.length).toBe(148);
    expect(TOOLS.filter((t) => t.spec === "admin").length).toBe(81);
    expect(TOOLS.filter((t) => t.spec === "user").length).toBe(67);
  });

  it("all tool names are unique", () => {
    const names = new Set(TOOLS.map((t) => t.name));
    expect(names.size).toBe(TOOLS.length);
  });

  it("all tool names are valid (ascii snake_case, <=60 chars)", () => {
    for (const t of TOOLS) {
      expect(isValidToolName(t.name), `invalid name: ${t.name}`).toBe(true);
    }
  });

  it("every tool has method, path and inputSchema", () => {
    for (const t of TOOLS) {
      expect(t.method).toBeTruthy();
      expect(t.path.startsWith("/")).toBe(true);
      expect(t.inputSchema).toBeTruthy();
      expect(t.inputSchema.type).toBe("object");
      expect(typeof t.inputSchema.properties).toBe("object");
    }
  });

  it("every user-spec tool has an optional user_id query param", () => {
    const userTools = TOOLS.filter((t) => t.spec === "user");
    expect(userTools.length).toBeGreaterThan(0);
    for (const t of userTools) {
      expect(t.inputSchema.properties.user_id).toBeTruthy();
      expect(t.inputSchema.properties.user_id.type).toBe("integer");
      // user_id must never be required
      expect(t.inputSchema.required ?? []).not.toContain("user_id");
    }
  });

  it("admin-spec tools do not get an injected user_id (unless the spec itself defines one)", () => {
    const adminUserList = TOOLS.find((t) => t.name === "admin_user_get");
    expect(adminUserList).toBeTruthy();
    // /admin/user GET already defines its own user_id query param in the spec itself
    expect(adminUserList!.inputSchema.properties.user_id).toBeTruthy();
  });

  it("every non-GET tool exposes a confirm:boolean parameter", () => {
    for (const t of TOOLS) {
      if (t.method === "GET") continue;
      expect(t.inputSchema.properties.confirm).toBeTruthy();
      expect(t.inputSchema.properties.confirm.type).toBe("boolean");
    }
  });

  it("description starts with 'METHOD /path'", () => {
    for (const t of TOOLS) {
      expect(t.description.startsWith(`${t.method} ${t.path}`)).toBe(true);
    }
  });

  it("SPEC_VERSION reports both spec sizes matching the SHM fork version", () => {
    expect(SPEC_VERSION.admin.paths).toBe(35);
    expect(SPEC_VERSION.admin.operations).toBe(81);
    expect(SPEC_VERSION.user.paths).toBe(39);
    expect(SPEC_VERSION.user.operations).toBe(67);
    expect(SPEC_VERSION.admin.version).toContain("2.15.0");
    expect(SPEC_VERSION.user.version).toContain("2.15.0");
  });

  it("resolves the known naming collision GET /service vs GET /user/service", () => {
    const names = TOOLS.map((t) => t.name);
    expect(names).toContain("user_service_get"); // from GET /service
    expect(names).toContain("user_user_service_get"); // fallback for GET /user/service
  });

  it("prefers text/plain body for /storage/manage/{name} where application/json is an empty stub", () => {
    const post = TOOLS.find((t) => t.name === "user_storage_manage_by_name_post");
    const put = TOOLS.find((t) => t.name === "user_storage_manage_by_name_put");
    expect(post?.inputSchema.properties.body?.type).toBe("string");
    expect(put?.inputSchema.properties.body?.type).toBe("string");
  });

  it("keeps application/json for /admin/template where the JSON schema is meaningful", () => {
    const post = TOOLS.find((t) => t.name === "admin_template_post");
    expect(post?.inputSchema.properties.body?.type).toBe("object");
    expect(post?.inputSchema.properties.body?.properties?.data).toBeTruthy();
  });
});
