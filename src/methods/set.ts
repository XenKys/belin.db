import type { Database } from "../Database";
import { set as baseSet } from "../base";
import fs from "fs";
import { BelinDBError, Errors } from "../utils";

export function set(self: Database, key: string, value: any): any {
  if (!key) throw new BelinDBError(Errors.InvalidKey);
  if (value === undefined) throw new BelinDBError(Errors.InvalidValue);

  const data = baseSet(self.all(), key, value, self.separator);

  fs.writeFileSync(self.path, JSON.stringify(data));

  return self.get(key);
}
