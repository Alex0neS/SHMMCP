#!/usr/bin/env node
/** stdio entrypoint (npm start). */
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";

import { loadDotEnv } from "./dotenv.js";
import { loadConfig } from "./config.js";
import { buildServer } from "./server.js";

async function main(): Promise<void> {
  loadDotEnv(); // <pkg>/.env, если есть; переменные окружения имеют приоритет
  const config = loadConfig();
  const server = buildServer({ config });
  const transport = new StdioServerTransport();
  await server.connect(transport);
  // eslint-disable-next-line no-console
  console.error(`shm-mcp запущен (stdio), mode=${config.mode}`);
}

main().catch((err) => {
  // eslint-disable-next-line no-console
  console.error("shm-mcp: фатальная ошибка запуска:", err);
  process.exit(1);
});
