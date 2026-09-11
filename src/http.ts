#!/usr/bin/env node
/**
 * Опциональный Streamable HTTP entrypoint (npm run start:http).
 *
 * Слушает только 127.0.0.1:MCP_HTTP_PORT. MCP_HTTP_TOKEN обязателен —
 * запросы без корректного заголовка "Authorization: Bearer <MCP_HTTP_TOKEN>"
 * отвергаются 401 до того, как долетят до транспорта MCP.
 *
 * Реализация статeless (sessionIdGenerator: undefined) — на процесс не
 * хранится история сообщений между запросами, что достаточно для одного
 * логического MCP-клиента за раз.
 */
import { timingSafeEqual } from "node:crypto";
import { createServer, type IncomingMessage, type ServerResponse } from "node:http";

import { StreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/streamableHttp.js";

import { loadConfig } from "./config.js";
import { buildServer } from "./server.js";

function unauthorized(res: ServerResponse): void {
  res.writeHead(401, { "content-type": "application/json" }).end(JSON.stringify({ error: "unauthorized" }));
}

async function main(): Promise<void> {
  const config = loadConfig();
  if (!config.httpPort) {
    throw new Error("MCP_HTTP_PORT не задан — используйте npm start (stdio) или задайте MCP_HTTP_PORT");
  }
  if (!config.httpToken) {
    throw new Error("MCP_HTTP_TOKEN обязателен для HTTP-транспорта");
  }

  const server = buildServer({ config });
  const transport = new StreamableHTTPServerTransport({ sessionIdGenerator: undefined });
  await server.connect(transport);

  const httpServer = createServer((req: IncomingMessage, res: ServerResponse) => {
    const authHeader = req.headers.authorization ?? "";
    // Сравнение токена в постоянном времени (длины сравниваем отдельно).
    const a = Buffer.from(authHeader, "utf-8");
    const b = Buffer.from(`Bearer ${config.httpToken}`, "utf-8");
    if (a.length !== b.length || !timingSafeEqual(a, b)) {
      unauthorized(res);
      return;
    }
    transport.handleRequest(req, res).catch((err: unknown) => {
      // eslint-disable-next-line no-console
      console.error("shm-mcp http: ошибка обработки запроса:", err);
      if (!res.headersSent) {
        res.writeHead(500).end();
      }
    });
  });

  httpServer.listen(config.httpPort, "127.0.0.1", () => {
    // eslint-disable-next-line no-console
    console.error(`shm-mcp запущен (streamable http) на 127.0.0.1:${config.httpPort}, mode=${config.mode}`);
  });
}

main().catch((err) => {
  // eslint-disable-next-line no-console
  console.error("shm-mcp http: фатальная ошибка запуска:", err);
  process.exit(1);
});
