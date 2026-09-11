/** Журнал аудита JSONL. Заголовок Authorization никогда не пишется; тела редактируются. */
import { appendFileSync, chmodSync, existsSync, mkdirSync, readFileSync } from "node:fs";
import { dirname } from "node:path";

export type AuditResult = "ok" | "denied" | "preview" | "error";

export interface AuditEntry {
  time: string;
  tool: string;
  method: string;
  url: string;
  status?: number;
  durationMs: number;
  confirm: boolean;
  mode: "ro" | "rw";
  result: AuditResult;
  reason?: string;
  /** Отредактированное (без секретов) тело запроса — опционально. */
  body?: unknown;
}

function ensureDir(path: string): void {
  const dir = dirname(path);
  if (dir && !existsSync(dir)) {
    mkdirSync(dir, { recursive: true });
  }
}

export function appendAudit(logPath: string, entry: AuditEntry): void {
  ensureDir(logPath);
  const line = `${JSON.stringify(entry)}\n`;
  const existedBefore = existsSync(logPath);
  appendFileSync(logPath, line, "utf-8");
  try {
    // 0600: только владелец читает/пишет. На Windows chmod по большей части
    // игнорируется ОС, но вызов безопасен и корректен на POSIX.
    chmodSync(logPath, 0o600);
  } catch {
    // игнорируем — не все ФС поддерживают chmod (например, некоторые сетевые FS)
  }
  void existedBefore;
}

/** Возвращает последние n записей аудита (или меньше, если файла нет/он короче). */
export function tailAudit(logPath: string, n: number): AuditEntry[] {
  if (!existsSync(logPath)) return [];
  const content = readFileSync(logPath, "utf-8");
  const lines = content.split("\n").filter((l) => l.trim().length > 0);
  const tail = lines.slice(-n);
  const out: AuditEntry[] = [];
  for (const line of tail) {
    try {
      out.push(JSON.parse(line) as AuditEntry);
    } catch {
      // пропускаем повреждённые строки
    }
  }
  return out;
}
