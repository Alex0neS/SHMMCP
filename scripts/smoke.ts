/**
 * npm run smoke — живой smoke-тест.
 *
 * Если .env отсутствует, тест пропускается (exit 0) — агенты-разработчики
 * .env не создают и креды не имеют, поэтому по умолчанию сеть не трогаем.
 * Если .env есть (владелец сервера сам его заполнил), выполняет ДВА безопасных
 * GET-запроса: служебный api_status (внутри которого GET /admin/user?limit=1)
 * и явный вызов сгенерированного инструмента admin_user_get с limit=1.
 */
import { existsSync, readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const ENV_PATH = join(ROOT, ".env");

function loadDotEnv(path: string): void {
  const content = readFileSync(path, "utf-8");
  for (const rawLine of content.split(/\r?\n/)) {
    const line = rawLine.trim();
    if (!line || line.startsWith("#")) continue;
    const eq = line.indexOf("=");
    if (eq < 0) continue;
    const key = line.slice(0, eq).trim();
    let value = line.slice(eq + 1).trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    if (key && process.env[key] === undefined) {
      process.env[key] = value;
    }
  }
}

async function main(): Promise<void> {
  if (!existsSync(ENV_PATH)) {
    console.log("smoke: .env не найден — пропуск (это ожидаемо для агентов-разработчиков без кредов)");
    process.exit(0);
  }

  loadDotEnv(ENV_PATH);

  const { loadConfig } = await import("../src/config.js");
  const { createToolRuntime } = await import("../src/server.js");

  const config = loadConfig();
  const runtime = createToolRuntime({ config });

  console.log(`smoke: mode=${config.mode}, base=${new URL(config.baseUrl).host}`);

  const statusResult = await runtime.callTool("api_status", {});
  console.log("smoke: api_status ->", statusResult.content[0].text);

  const userResult = await runtime.callTool("admin_user_get", { limit: 1 });
  // Печатаем только статус и число записей: в ответе персональные данные клиента.
  try {
    const parsed = JSON.parse(userResult.content[0].text) as { status?: number; ok?: boolean; data?: { items?: number } };
    console.log("smoke: admin_user_get(limit=1) ->", JSON.stringify({ status: parsed.status, ok: parsed.ok, items: parsed.data?.items }));
  } catch {
    console.log("smoke: admin_user_get(limit=1) -> (ответ не JSON)", userResult.content[0].text.slice(0, 120));
  }

  if (statusResult.isError || userResult.isError) {
    console.error("smoke: один из вызовов вернул ошибку");
    process.exit(1);
  }
  console.log("smoke: OK");
}

main().catch((err) => {
  console.error("smoke: непойманная ошибка:", err);
  process.exit(1);
});
