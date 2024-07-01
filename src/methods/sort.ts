import type { Database } from "../Database";
import { BelinDBError, Errors } from "../utils";

export function sort(
  self: Database,
  key: string,
  compareFn?: (a: any, b: any) => number
): Array<any> {
  if (!key) throw new BelinDBError(Errors.InvalidKey);
  if (!self.has(key)) throw new BelinDBError(Errors.DataNotFound, key);
  if (!Array.isArray(self.get(key)))
    throw new BelinDBError(Errors.DataNotAnArray);

  return self.get(key).sort(compareFn);
}
