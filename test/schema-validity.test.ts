import { describe, expect, it } from "vitest";
import { TOOLS } from "../src/generated/tools.js";

/** Обходит схему и проверяет поля, которые MCP-клиенты валидируют строго. */
function walk(node: unknown, path: string, problems: string[]): void {
  if (node === null || typeof node !== "object") return;
  if (Array.isArray(node)) {
    node.forEach((n, i) => walk(n, `${path}[${i}]`, problems));
    return;
  }
  const obj = node as Record<string, unknown>;
  for (const k of ["readOnly", "writeOnly"]) {
    if (k in obj && typeof obj[k] !== "boolean") problems.push(`${path}.${k} = ${String(obj[k])}`);
  }
  for (const k of ["exclusiveMinimum", "exclusiveMaximum"]) {
    if (k in obj && typeof obj[k] !== "number") problems.push(`${path}.${k} = ${String(obj[k])}`);
  }
  for (const [k, v] of Object.entries(obj)) walk(v, `${path}.${k}`, problems);
}

describe("generated schemas are strict-JSON-Schema clean", () => {
  it("readOnly/writeOnly are booleans, exclusiveMin/Max are numbers", () => {
    const problems: string[] = [];
    for (const t of TOOLS) walk(t.inputSchema, t.name, problems);
    expect(problems).toEqual([]);
  });
});
