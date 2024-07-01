import type { Database } from "../Database";
import { BelinDBError, Errors } from "../utils";

export function filter(
  self: Database,
  key: string,
  predicate: (value: any, index: number, array: any[]) => boolean,
  thisArg?: any
): Array<any> {
  if (!key) throw new BelinDBError(Errors.InvalidKey);
  if (!self.has(key)) throw new BelinDBError(Errors.DataNotFound, key);
  if (!Array.isArray(self.get(key)))
    throw new BelinDBError(Errors.DataNotAnArray);

  return self.get(key).filter(predicate, thisArg);
}
