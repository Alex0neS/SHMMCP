/**
 * Генератор src/generated/tools.ts из двух OpenAPI-спек SHM.
 *
 * Читает mcp/shm-mcp/spec/shm_admin_openapi.json и shm_user_openapi.json,
 * разворачивает $ref (с ограничением глубины, циклы -> {}), строит один
 * MCP-инструмент на каждую операцию method+path и пишет результат в
 * src/generated/tools.ts. Файл коммитится, чтобы сервер не читал спеку
 * в рантайме.
 *
 * Запуск: npm run generate
 */
import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

import { buildBaseName, buildFallbackName, buildNumberedName, isValidToolName } from "../src/naming.js";
import type { HttpMethod, JSONSchema, SpecKind, ToolDef } from "../src/types.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const SPEC_DIR = join(ROOT, "spec");
const OUT_FILE = join(ROOT, "src", "generated", "tools.ts");

const HTTP_METHODS: HttpMethod[] = ["GET", "POST", "PUT", "DELETE", "PATCH"];
const MAX_DEREF_DEPTH = 8;

// ---------------------------------------------------------------------------
// $ref deref, с ограничением глубины и защитой от циклов
// ---------------------------------------------------------------------------

function resolveRef(ref: string, root: unknown): unknown {
  if (!ref.startsWith("#/")) return undefined;
  const parts = ref.slice(2).split("/");
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let node: any = root;
  for (const part of parts) {
    if (node == null) return undefined;
    node = node[part];
  }
  return node;
}

/** Убирает мусор спеки: type:null, required с null-элементами и т.п. */
function sanitizeSchemaNode(node: JSONSchema): JSONSchema {
  const out: JSONSchema = { ...node };
  if (out.type === null || out.type === undefined) {
    delete out.type;
  }
  // Спека SHM пишет readOnly как 1/0; JSON Schema (и валидатор MCP-клиента) требует boolean.
  if ("readOnly" in out && typeof out.readOnly !== "boolean") {
    out.readOnly = Boolean(out.readOnly);
  }
  if ("writeOnly" in out && typeof out.writeOnly !== "boolean") {
    out.writeOnly = Boolean(out.writeOnly);
  }
  if (Array.isArray(out.required)) {
    const cleaned = out.required.filter((r: unknown): r is string => typeof r === "string" && r.length > 0);
    if (cleaned.length > 0) {
      out.required = cleaned;
    } else {
      delete out.required;
    }
  }
  return out;
}

function derefSchema(
  schema: unknown,
  root: unknown,
  depth: number,
  seen: ReadonlySet<string>
): JSONSchema {
  if (schema == null || typeof schema !== "object") {
    return {};
  }
  if (depth > MAX_DEREF_DEPTH) {
    return {};
  }

  const node = schema as Record<string, unknown>;

  if (typeof node.$ref === "string") {
    if (seen.has(node.$ref)) {
      return {};
    }
    const target = resolveRef(node.$ref, root);
    if (target === undefined) {
      return {};
    }
    const nextSeen = new Set(seen);
    nextSeen.add(node.$ref);
    return derefSchema(target, root, depth + 1, nextSeen);
  }

  const result: JSONSchema = sanitizeSchemaNode(node as JSONSchema);

  if (result.properties && typeof result.properties === "object") {
    const props: Record<string, JSONSchema> = {};
    for (const [key, value] of Object.entries(result.properties as Record<string, unknown>)) {
      props[key] = derefSchema(value, root, depth + 1, seen);
    }
    result.properties = props;
  }

  if (result.items !== undefined) {
    result.items = derefSchema(result.items, root, depth + 1, seen);
  }

  for (const combinator of ["oneOf", "anyOf", "allOf"] as const) {
    if (Array.isArray(result[combinator])) {
      result[combinator] = (result[combinator] as unknown[]).map((s) => derefSchema(s, root, depth + 1, seen));
    }
  }

  if (result.additionalProperties && typeof result.additionalProperties === "object") {
    result.additionalProperties = derefSchema(result.additionalProperties, root, depth + 1, seen);
  }

  return result;
}

// ---------------------------------------------------------------------------
// Разбор параметров/тела операции
// ---------------------------------------------------------------------------

interface RawParam {
  name?: string;
  in?: string;
  required?: unknown;
  description?: string;
  schema?: unknown;
  $ref?: string;
}

function isRequiredFlag(required: unknown): boolean {
  // Спека SHM местами кодирует required как ["<имя>"] вместо булева true.
  if (typeof required === "boolean") return required;
  if (Array.isArray(required)) return required.length > 0;
  return Boolean(required);
}

function paramSchema(
  param: RawParam,
  root: unknown
): { name: string; in: "path" | "query"; required: boolean; schema: JSONSchema; description?: string } | undefined {
  let p = param;
  if (typeof p.$ref === "string") {
    const resolved = resolveRef(p.$ref, root);
    if (resolved && typeof resolved === "object") {
      p = resolved as RawParam;
    }
  }
  if (!p.name || (p.in !== "path" && p.in !== "query")) return undefined;
  const schema = derefSchema(p.schema ?? {}, root, 0, new Set());
  return {
    name: p.name,
    in: p.in,
    required: isRequiredFlag(p.required),
    schema,
    description: p.description
  };
}

interface RequestBodyInfo {
  schema: JSONSchema;
  required: boolean;
  contentType: string;
}

/** true, если JSON-схема фактически не описывает ни одного поля (типичный признак
 * того, что настоящее содержимое запроса — это соседний вариант text/plain, а не
 * этот "пустой" application/json — встречается в SHM у /storage/manage/{name}). */
function isEffectivelyEmptyObjectSchema(schema: JSONSchema): boolean {
  if (schema.type !== "object") return false;
  const props = schema.properties as Record<string, unknown> | undefined;
  return !props || Object.keys(props).length === 0;
}

function extractRequestBody(op: Record<string, unknown>, root: unknown): RequestBodyInfo | undefined {
  const rb = op.requestBody as Record<string, unknown> | undefined;
  if (!rb) return undefined;
  const content = (rb.content ?? {}) as Record<string, { schema?: unknown }>;
  const required = isRequiredFlag(rb.required);

  if (content["application/json"]) {
    const schema = derefSchema(content["application/json"].schema ?? {}, root, 0, new Set());
    // Спека SHM местами описывает application/json как пустой {} у операций,
    // где реальные данные передаются как text/plain (например /storage/manage/{name}).
    // В этом случае предпочитаем осмысленный text/plain, а не бесполезную пустую схему.
    if (isEffectivelyEmptyObjectSchema(schema) && content["text/plain"]) {
      return { schema: { type: "string" }, required, contentType: "text/plain" };
    }
    return { schema, required, contentType: "application/json" };
  }
  if (content["text/plain"]) {
    return { schema: { type: "string" }, required, contentType: "text/plain" };
  }
  // Неизвестный/иной content-type — принимаем как произвольный JSON-объект.
  const firstKey = Object.keys(content)[0];
  if (firstKey) {
    const schema = derefSchema(content[firstKey].schema ?? {}, root, 0, new Set());
    return { schema, required, contentType: firstKey };
  }
  return undefined;
}

// ---------------------------------------------------------------------------
// Построение инструментов для одной спеки
// ---------------------------------------------------------------------------

interface GenResult {
  tools: ToolDef[];
  pathCount: number;
  opCount: number;
  quirks: string[];
}

function buildToolsForSpec(specKind: SpecKind, doc: Record<string, unknown>): GenResult {
  const paths = (doc.paths ?? {}) as Record<string, Record<string, unknown>>;
  const quirks: string[] = [];

  interface Entry {
    path: string;
    method: HttpMethod;
    op: Record<string, unknown>;
  }
  const entries: Entry[] = [];
  for (const path of Object.keys(paths).sort()) {
    const item = paths[path];
    for (const method of HTTP_METHODS) {
      const op = item[method.toLowerCase()] as Record<string, unknown> | undefined;
      if (op) {
        entries.push({ path, method, op });
      }
    }
  }

  // --- Имена: сначала предпочтительные, затем разрешение коллизий ---
  const usedNames = new Set<string>();
  const nameFor = new Map<Entry, string>();

  for (const entry of entries) {
    const method = entry.method.toLowerCase() as Parameters<typeof buildBaseName>[2];
    let name = buildBaseName(specKind, entry.path, method);
    if (usedNames.has(name)) {
      const fallback = buildFallbackName(specKind, entry.path, method);
      if (!usedNames.has(fallback)) {
        quirks.push(
          `naming collision: "${name}" (${entry.method} ${entry.path}) -> fallback "${fallback}"`
        );
        name = fallback;
      } else {
        let n = 2;
        let candidate = buildNumberedName(name, n);
        while (usedNames.has(candidate)) {
          n += 1;
          candidate = buildNumberedName(name, n);
        }
        quirks.push(
          `naming collision: "${name}" (${entry.method} ${entry.path}) -> numbered "${candidate}"`
        );
        name = candidate;
      }
    }
    usedNames.add(name);
    nameFor.set(entry, name);
    if (!isValidToolName(name)) {
      throw new Error(`Generated invalid tool name: ${name}`);
    }
  }

  const tools: ToolDef[] = [];

  for (const entry of entries) {
    const { path, method, op } = entry;
    const name = nameFor.get(entry)!;
    const tag = Array.isArray(op.tags) && op.tags.length > 0 ? String(op.tags[0]) : "";
    const summary = typeof op.summary === "string" ? op.summary : "";

    const rawParams = Array.isArray(op.parameters) ? (op.parameters as RawParam[]) : [];
    const parsedParams = rawParams.map((p) => paramSchema(p, doc)).filter((p): p is NonNullable<typeof p> => Boolean(p));

    const properties: Record<string, JSONSchema> = {};
    const required: string[] = [];

    for (const p of parsedParams) {
      properties[p.name] = {
        ...p.schema,
        description: p.description ?? `${p.in} параметр "${p.name}"`
      };
      if (p.required) required.push(p.name);
    }

    const body = extractRequestBody(op, doc);
    if (body) {
      if (body.contentType === "text/plain") {
        quirks.push(`text/plain request body: ${method} ${path}`);
      }
      properties.body = {
        ...body.schema,
        description: `Тело запроса (${body.contentType})`
      };
      if (body.required) required.push("body");
    }

    if (specKind === "user") {
      properties.user_id = {
        type: "integer",
        description: "admin acts on behalf of this user"
      };
    }

    if (method !== "GET") {
      properties.confirm = {
        type: "boolean",
        description:
          "Явное подтверждение выполнения не-GET операции. Без confirm:true в режиме rw возвращается превью запроса."
      };
    }

    const descriptionLines = [
      `${method} ${path}`,
      summary || "(без описания в спеке)",
      `Тег: ${tag || "—"}`,
      `Спека: ${specKind}`
    ];

    const toolDef: ToolDef = {
      name,
      method,
      path,
      spec: specKind,
      tag,
      summary,
      description: descriptionLines.join("\n"),
      inputSchema: {
        type: "object",
        properties,
        ...(required.length > 0 ? { required } : {})
      }
    };

    tools.push(toolDef);
  }

  return { tools, pathCount: Object.keys(paths).length, opCount: entries.length, quirks };
}

// ---------------------------------------------------------------------------
// main
// ---------------------------------------------------------------------------

function loadSpec(fileName: string): Record<string, unknown> {
  const raw = readFileSync(join(SPEC_DIR, fileName), "utf-8");
  return JSON.parse(raw) as Record<string, unknown>;
}

function main(): void {
  const adminDoc = loadSpec("shm_admin_openapi.json");
  const userDoc = loadSpec("shm_user_openapi.json");

  const adminResult = buildToolsForSpec("admin", adminDoc);
  const userResult = buildToolsForSpec("user", userDoc);

  const allTools = [...adminResult.tools, ...userResult.tools];

  // Финальная проверка глобальной уникальности имён (admin_/user_ префиксы не должны
  // пересекаться, но проверяем явно, чтобы не полагаться на это неявно).
  const seen = new Set<string>();
  for (const t of allTools) {
    if (seen.has(t.name)) {
      throw new Error(`Duplicate tool name across specs: ${t.name}`);
    }
    seen.add(t.name);
  }

  const adminInfo = (adminDoc.info ?? {}) as { title?: string; version?: string };
  const userInfo = (userDoc.info ?? {}) as { title?: string; version?: string };

  const header = `/**
 * СГЕНЕРИРОВАНО АВТОМАТИЧЕСКИ — не редактировать руками.
 * Источник: scripts/generate.ts + mcp/shm-mcp/spec/shm_admin_openapi.json, shm_user_openapi.json
 * Перегенерация: npm run generate
 */
import type { SpecVersionInfo, ToolDef } from "../types.js";

export const SPEC_VERSION: SpecVersionInfo = ${JSON.stringify(
    {
      admin: {
        title: adminInfo.title ?? "",
        version: adminInfo.version ?? "",
        paths: adminResult.pathCount,
        operations: adminResult.opCount
      },
      user: {
        title: userInfo.title ?? "",
        version: userInfo.version ?? "",
        paths: userResult.pathCount,
        operations: userResult.opCount
      }
    },
    null,
    2
  )};

export const TOOLS: ToolDef[] = ${JSON.stringify(allTools, null, 2)};
`;

  writeFileSync(OUT_FILE, header, "utf-8");

  // eslint-disable-next-line no-console
  console.log(`admin: ${adminResult.pathCount} paths, ${adminResult.opCount} operations`);
  // eslint-disable-next-line no-console
  console.log(`user: ${userResult.pathCount} paths, ${userResult.opCount} operations`);
  // eslint-disable-next-line no-console
  console.log(`total tools: ${allTools.length}`);
  const quirks = [...adminResult.quirks, ...userResult.quirks];
  if (quirks.length > 0) {
    // eslint-disable-next-line no-console
    console.log(`quirks (${quirks.length}):`);
    for (const q of quirks) {
      // eslint-disable-next-line no-console
      console.log(`  - ${q}`);
    }
  }
  // eslint-disable-next-line no-console
  console.log(`wrote ${OUT_FILE}`);
}

main();
