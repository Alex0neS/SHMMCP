import { describe, expect, it } from "vitest";
import { buildBaseName, buildFallbackName, buildNumberedName, isValidToolName } from "../src/naming.js";

describe("naming rules", () => {
  it("admin: GET /admin/user/service -> admin_user_service_get", () => {
    expect(buildBaseName("admin", "/admin/user/service", "get")).toBe("admin_user_service_get");
  });

  it("admin: GET /admin/config/{key} -> admin_config_by_key_get", () => {
    expect(buildBaseName("admin", "/admin/config/{key}", "get")).toBe("admin_config_by_key_get");
  });

  it("admin: POST /admin/spool/manual/{action} -> admin_spool_manual_by_action_post", () => {
    expect(buildBaseName("admin", "/admin/spool/manual/{action}", "post")).toBe(
      "admin_spool_manual_by_action_post"
    );
  });

  it("user: GET /service/order -> user_service_order_get", () => {
    expect(buildBaseName("user", "/service/order", "get")).toBe("user_service_order_get");
  });

  it("user: GET /user/pay/forecast -> user_pay_forecast_get (no duplicate 'user')", () => {
    expect(buildBaseName("user", "/user/pay/forecast", "get")).toBe("user_pay_forecast_get");
  });

  it("user: GET /user -> user_get", () => {
    expect(buildBaseName("user", "/user", "get")).toBe("user_get");
  });

  it("user: hyphenated segment password-auth is sanitized to password_auth", () => {
    expect(buildBaseName("user", "/user/password-auth", "get")).toBe("user_password_auth_get");
  });

  it("user: GET /public/{id} -> user_public_by_id_get", () => {
    expect(buildBaseName("user", "/public/{id}", "get")).toBe("user_public_by_id_get");
  });

  it("fallback name re-adds the leading prefix for collision resolution", () => {
    expect(buildBaseName("user", "/service", "get")).toBe("user_service_get");
    expect(buildBaseName("user", "/user/service", "get")).toBe("user_service_get"); // collides
    expect(buildFallbackName("user", "/user/service", "get")).toBe("user_user_service_get");
  });

  it("numbered fallback appends a numeric suffix and stays within the length limit", () => {
    const base = "a".repeat(58);
    expect(buildNumberedName(base, 2)).toBe(`${"a".repeat(58)}_2`.slice(0, 60));
  });

  it("all names satisfy /^[a-z0-9_]+$/ and length <= 60", () => {
    const examples = [
      buildBaseName("admin", "/admin/user/service/withdraw", "delete"),
      buildBaseName("user", "/telegram/bot/{template}", "post"),
      buildBaseName("user", "/storage/manage/{name}", "put")
    ];
    for (const name of examples) {
      expect(isValidToolName(name)).toBe(true);
    }
  });
});
