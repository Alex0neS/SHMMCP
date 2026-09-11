/** Подстановка path-параметров и сериализация query-строки для SHM-клиента. */

export interface ResolvedPath {
  /** Путь с подставленными {param} значениями, начинается с "/". */
  path: string;
  /** Имена path-параметров, использованных при подстановке (чтобы не задваивать их в query). */
  consumed: Set<string>;
}

/**
 * Подставляет "{name}" в шаблоне пути значениями из args (encodeURIComponent).
 * Бросает ошибку, если значение обязательного path-параметра отсутствует.
 */
export function resolvePath(template: string, args: Record<string, unknown>): ResolvedPath {
  const consumed = new Set<string>();
  const path = template.replace(/\{([^}]+)\}/g, (_match, name: string) => {
    consumed.add(name);
    const value = args[name];
    if (value === undefined || value === null || value === "") {
      throw new Error(`Отсутствует значение path-параметра "${name}"`);
    }
    return encodeURIComponent(String(value));
  });
  return { path, consumed };
}

/** Сериализует query-параметры (пропуская undefined/null); не использует массивы вложенно. */
export function serializeQuery(params: Record<string, unknown>): string {
  const parts: string[] = [];
  for (const [key, value] of Object.entries(params)) {
    if (value === undefined || value === null) continue;
    if (Array.isArray(value)) {
      for (const v of value) {
        if (v === undefined || v === null) continue;
        parts.push(`${encodeURIComponent(key)}=${encodeURIComponent(String(v))}`);
      }
      continue;
    }
    parts.push(`${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`);
  }
  return parts.join("&");
}

/** Соединяет базовый URL (уже содержащий, например, "/shm/v1") с относительным путём спеки. */
export function joinUrl(baseUrl: string, path: string): string {
  const base = baseUrl.replace(/\/+$/, "");
  const p = path.startsWith("/") ? path : `/${path}`;
  return `${base}${p}`;
}
