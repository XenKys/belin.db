import type { Database } from "../Database";
import { BelinDBError, Errors } from "../utils";

export function find(
  self: Database,
  key: string,
  predicate: (value: any, index: number, obj: Array<any>) => boolean,
  thisArg?: any
): any {
  if (!key) throw new BelinDBError(Errors.InvalidKey);
  if (!self.has(key)) throw new BelinDBError(Errors.DataNotFound, key);
  if (!Array.isArray(self.get(key)))
    throw new BelinDBError(Errors.DataNotAnArray);

  return self.get(key).find(predicate, thisArg);
}
