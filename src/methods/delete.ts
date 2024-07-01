import type { Database } from "../Database";
import { del as baseDelete } from "../base";
import fs from "fs";
import { BelinDBError, Errors } from "../utils";

export function del(self: Database, key: string): void {
  if (!key) throw new BelinDBError(Errors.InvalidKey);
  if (!self.has(key)) throw new BelinDBError(Errors.DataNotFound, key);

  const data = baseDelete(self.all(), key, self.separator);

  fs.writeFileSync(self.path, JSON.stringify(data, null));
}
