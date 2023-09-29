import type { Database } from "../Database";
import { del as baseDelete } from "../base";
import fs from "fs";

export function del(self: Database, key: string): void {
  if (!key) throw new Error("[belin.db] Enter the name of the key");
  if (!self.has(key))
    throw new Error(
      "[belin.db] No key with this name was found in the saved data"
    );

  const data = baseDelete(self.all(), key, self.separator);

  fs.writeFileSync(self.path, JSON.stringify(data, null));
}
