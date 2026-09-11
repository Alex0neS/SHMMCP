/** Общие типы, используемые генератором и рантаймом. */

export type SpecKind = "admin" | "user";
export type HttpMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";

/** Урезанный JSON Schema (draft-07-подобный), достаточный для описания входа инструмента. */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type JSONSchema = Record<string, any>;

export interface ToolDef {
  /** snake_case, ASCII, /^[a-z0-9_]+$/, <= 60 символов, уникальное. */
  name: string;
  method: HttpMethod;
  /** Путь как в спеке, относительно /shm/v1, например "/admin/config/{key}". */
  path: string;
  spec: SpecKind;
  tag: string;
  summary: string;
  /** Первая строка "METHOD /path", затем summary, тег и спека. */
  description: string;
  inputSchema: {
    type: "object";
    properties: Record<string, JSONSchema>;
    required?: string[];
  };
}

export interface SpecVersionInfo {
  admin: {
    title: string;
    version: string;
    paths: number;
    operations: number;
  };
  user: {
    title: string;
    version: string;
    paths: number;
    operations: number;
  };
}
