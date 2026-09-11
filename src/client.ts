/** HTTP-клиент SHM: Basic-авторизация, таймаут, сборка URL, парсинг ответа, лимит размера. */
import { joinUrl, serializeQuery } from "./pathutil.js";

export interface ShmClientConfig {
  baseUrl: string;
  adminAuth: { login: string; password: string };
  timeoutMs: number;
  maxResponseBytes: number;
}

export interface ShmRequest {
  method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  path: string;
  query?: Record<string, unknown>;
  body?: unknown;
  bodyContentType?: "application/json" | "text/plain";
}

export interface ShmResult {
  status: number;
  ok: boolean;
  data: unknown;
  truncated: boolean;
  url: string;
}

export function basicAuthHeader(login: string, password: string): string {
  const token = Buffer.from(`${login}:${password}`, "utf-8").toString("base64");
  return `Basic ${token}`;
}

async function readBody(res: Response, maxBytes: number): Promise<{ data: unknown; truncated: boolean }> {
  const text = await res.text();
  const byteLength = Buffer.byteLength(text, "utf-8");
  let truncated = false;
  let finalText = text;

  if (byteLength > maxBytes) {
    truncated = true;
    finalText = `${Buffer.from(text, "utf-8").subarray(0, maxBytes).toString("utf-8")}\n<truncated: limit ${maxBytes} bytes exceeded>`;
  }

  const contentType = res.headers.get("content-type") ?? "";
  if (!truncated && contentType.includes("json")) {
    try {
      return { data: JSON.parse(finalText), truncated };
    } catch {
      return { data: finalText, truncated };
    }
  }
  return { data: finalText, truncated };
}

export class ShmClient {
  constructor(private readonly cfg: ShmClientConfig) {}

  buildUrl(path: string, query?: Record<string, unknown>): string {
    const url = joinUrl(this.cfg.baseUrl, path);
    if (!query) return url;
    const qs = serializeQuery(query);
    return qs ? `${url}?${qs}` : url;
  }

  private authHeader(): string {
    return basicAuthHeader(this.cfg.adminAuth.login, this.cfg.adminAuth.password);
  }

  async request(req: ShmRequest): Promise<ShmResult> {
    const url = this.buildUrl(req.path, req.query);

    const headers: Record<string, string> = {
      Authorization: this.authHeader(),
      Accept: "application/json"
    };

    let bodyPayload: string | undefined;
    if (req.body !== undefined) {
      if (req.bodyContentType === "text/plain") {
        headers["Content-Type"] = "text/plain";
        bodyPayload = typeof req.body === "string" ? req.body : String(req.body);
      } else {
        headers["Content-Type"] = "application/json";
        bodyPayload = JSON.stringify(req.body);
      }
    }

    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), this.cfg.timeoutMs);

    try {
      const res = await fetch(url, {
        method: req.method,
        headers,
        body: bodyPayload,
        signal: controller.signal
      });

      const { data, truncated } = await readBody(res, this.cfg.maxResponseBytes);

      return {
        status: res.status,
        ok: res.ok,
        data,
        truncated,
        url
      };
    } finally {
      clearTimeout(timer);
    }
  }
}
