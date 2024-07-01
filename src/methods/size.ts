import type { Database } from "../Database";
import { BelinDBError, Errors } from "../utils";

export function size(self: Database, key: string): number {
  if (!key) throw new BelinDBError(Errors.InvalidKey);
  if (!self.has(key)) throw new BelinDBError(Errors.DataNotFound, key);
  if (!Array.isArray(self.get(key)))
    throw new BelinDBError(Errors.DataNotAnArray);

  return self.get(key).length;
}
