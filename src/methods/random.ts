import type { Database } from "../Database";
import { BelinDBError, Errors } from "../utils";

export function random(self: Database, key: string): any {
  if (!key) throw new BelinDBError(Errors.InvalidKey);
  if (!self.has(key)) throw new BelinDBError(Errors.DataNotFound, key);
  if (!Array.isArray(self.get(key)))
    throw new BelinDBError(Errors.DataNotAnArray);

  const array: Array<any> = self.get(key);

  return array[Math.floor(Math.random() * array.length)];
}
