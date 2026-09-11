/**
 * Минимальная загрузка `.env` из корня пакета (без зависимостей).
 * Уже заданные переменные окружения имеют приоритет и не переопределяются.
 * Нужна для stdio-запуска через `claude mcp add ... -- node dist/index.js`,
 * чтобы секреты не попадали в конфиг MCP-клиента.
 */
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

export function loadDotEnv(envPath?: string): boolean {
  const here = path.dirname(fileURLToPath(import.meta.url));
  // dist/dotenv.js -> <pkg>/.env ; src/dotenv.ts (tsx) -> <pkg>/.env
  const file = envPath ?? path.resolve(here, "..", ".env");
  if (!existsSync(file)) return false;
  const raw = readFileSync(file, "utf-8");
  for (const line of raw.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eq = trimmed.indexOf("=");
    if (eq <= 0) continue;
    const key = trimmed.slice(0, eq).trim();
    let value = trimmed.slice(eq + 1).trim();
    if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1);
    }
    if (process.env[key] === undefined) process.env[key] = value;
  }
  return true;
}
