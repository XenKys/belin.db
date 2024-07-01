import type { Database } from "../Database";
import { BelinDBError, Errors } from "../utils";

export function some(
  self: Database,
  key: string,
  predicate: (value: any, index: number, array: Array<any>) => unknown,
  thisArg?: any
): boolean {
  if (!key) throw new BelinDBError(Errors.InvalidKey);
  if (!self.has(key)) throw new BelinDBError(Errors.DataNotFound, key);
  if (!Array.isArray(self.get(key)))
    throw new BelinDBError(Errors.DataNotAnArray);

  return self.get(key).some(predicate, thisArg);
}
