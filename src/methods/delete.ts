import type { Database } from "../Database";
import { del as baseDelete } from "../base";
import fs from "fs";

export function del(self: Database, key: string): void {
  if (!key) throw new Error("[belin.db] Enter a valid key");
  if (!self.has(key))
    throw new Error(`[belin.db] '${key}' not found in the data`);

  const data = baseDelete(self.all(), key, self.separator);

  fs.writeFileSync(self.path, JSON.stringify(data, null));
}
