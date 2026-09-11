import { afterEach, describe, expect, it, vi } from "vitest";
import { ShmClient, basicAuthHeader } from "../src/client.js";
import { joinUrl, resolvePath, serializeQuery } from "../src/pathutil.js";

describe("pathutil", () => {
  it("joinUrl concatenates base (already containing /shm/v1) with a relative path", () => {
    expect(joinUrl("https://admin.example.com/shm/v1", "/admin/user")).toBe(
      "https://admin.example.com/shm/v1/admin/user"
    );
  });

  it("joinUrl strips trailing slashes from the base", () => {
    expect(joinUrl("https://admin.example.com/shm/v1/", "/admin/user")).toBe(
      "https://admin.example.com/shm/v1/admin/user"
    );
  });

  it("resolvePath substitutes {param} with encodeURIComponent", () => {
    const { path, consumed } = resolvePath("/admin/config/{key}", { key: "a b/c" });
    expect(path).toBe(`/admin/config/${encodeURIComponent("a b/c")}`);
    expect(consumed.has("key")).toBe(true);
  });

  it("resolvePath throws when a required path parameter is missing", () => {
    expect(() => resolvePath("/admin/config/{key}", {})).toThrow();
  });

  it("serializeQuery skips undefined/null and encodes values", () => {
    const qs = serializeQuery({ limit: 25, offset: 0, missing: undefined, name: "a b" });
    expect(qs).toBe("limit=25&offset=0&name=a%20b");
  });
});

describe("ShmClient", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("sends a correct Basic auth header", () => {
    const header = basicAuthHeader("login", "password");
    expect(header).toBe(`Basic ${Buffer.from("login:password").toString("base64")}`);
  });

  it("builds the request URL by joining base+path+query", async () => {
    const fetchMock = vi.fn(async () =>
      new Response(JSON.stringify({ data: [], items: 0, limit: 1, offset: 0, status: 200 }), {
        status: 200,
        headers: { "content-type": "application/json" }
      })
    );
    vi.stubGlobal("fetch", fetchMock);

    const client = new ShmClient({
      baseUrl: "https://admin.example.com/shm/v1",
      adminAuth: { login: "admin", password: "pw" },
      timeoutMs: 5000,
      maxResponseBytes: 200000
    });

    const result = await client.request({ method: "GET", path: "/admin/user", query: { limit: 1 } });

    expect(fetchMock).toHaveBeenCalledTimes(1);
    const [url, init] = fetchMock.mock.calls[0] as [string, RequestInit];
    expect(url).toBe("https://admin.example.com/shm/v1/admin/user?limit=1");
    expect((init.headers as Record<string, string>).Authorization).toBe(basicAuthHeader("admin", "pw"));
    expect(result.status).toBe(200);
    expect(result.ok).toBe(true);
    expect((result.data as any).items).toBe(0);
  });

  it("sends a JSON body with Content-Type application/json for non-GET", async () => {
    const fetchMock = vi.fn(async () => new Response("{}", { status: 200, headers: { "content-type": "application/json" } }));
    vi.stubGlobal("fetch", fetchMock);

    const client = new ShmClient({
      baseUrl: "https://admin.example.com/shm/v1",
      adminAuth: { login: "admin", password: "pw" },
      timeoutMs: 5000,
      maxResponseBytes: 200000
    });

    await client.request({ method: "POST", path: "/admin/user/service/touch", body: { id: 5 } });

    const [, init] = fetchMock.mock.calls[0] as [string, RequestInit];
    expect((init.headers as Record<string, string>)["Content-Type"]).toBe("application/json");
    expect(init.body).toBe(JSON.stringify({ id: 5 }));
  });

  it("sends a text/plain body verbatim when bodyContentType is text/plain", async () => {
    const fetchMock = vi.fn(async () => new Response("ok", { status: 200, headers: { "content-type": "text/plain" } }));
    vi.stubGlobal("fetch", fetchMock);

    const client = new ShmClient({
      baseUrl: "https://admin.example.com/shm/v1",
      adminAuth: { login: "admin", password: "pw" },
      timeoutMs: 5000,
      maxResponseBytes: 200000
    });

    await client.request({ method: "PUT", path: "/admin/template", body: "raw template text", bodyContentType: "text/plain" });

    const [, init] = fetchMock.mock.calls[0] as [string, RequestInit];
    expect((init.headers as Record<string, string>)["Content-Type"]).toBe("text/plain");
    expect(init.body).toBe("raw template text");
  });

  it("truncates responses larger than maxResponseBytes and sets truncated:true", async () => {
    const bigText = "x".repeat(1000);
    const fetchMock = vi.fn(async () => new Response(bigText, { status: 200, headers: { "content-type": "text/plain" } }));
    vi.stubGlobal("fetch", fetchMock);

    const client = new ShmClient({
      baseUrl: "https://admin.example.com/shm/v1",
      adminAuth: { login: "admin", password: "pw" },
      timeoutMs: 5000,
      maxResponseBytes: 100
    });

    const result = await client.request({ method: "GET", path: "/admin/user" });
    expect(result.truncated).toBe(true);
    expect(typeof result.data).toBe("string");
    expect((result.data as string).length).toBeLessThan(bigText.length + 50);
  });

  it("reports ok:false for non-2xx HTTP status", async () => {
    const fetchMock = vi.fn(
      async () => new Response(JSON.stringify({ error: "not found" }), { status: 404, headers: { "content-type": "application/json" } })
    );
    vi.stubGlobal("fetch", fetchMock);

    const client = new ShmClient({
      baseUrl: "https://admin.example.com/shm/v1",
      adminAuth: { login: "admin", password: "pw" },
      timeoutMs: 5000,
      maxResponseBytes: 200000
    });

    const result = await client.request({ method: "GET", path: "/admin/user/99999999" });
    expect(result.status).toBe(404);
    expect(result.ok).toBe(false);
  });
});
