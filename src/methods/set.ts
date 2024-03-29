import type { Database } from "../Database";
import { set as baseSet } from "../base";
import fs from "fs";

export function set(self: Database, key: string, value: any): any {
  if (!key) throw new Error("[belin.db] Enter a valid key");
  if (value === undefined) throw new Error("[belin.db] Enter the value");

  const data = baseSet(self.all(), key, value, self.separator);

  fs.writeFileSync(self.path, JSON.stringify(data));

  return self.get(key);
}
