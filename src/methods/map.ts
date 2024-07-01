import type { Database } from "../Database";
import { BelinDBError, Errors } from "../utils";

export function map(
  self: Database,
  key: string,
  callbackfn: (value: any, index: number, array: Array<any>) => unknown,
  thisArg?: any
): Array<unknown> {
  if (!key) throw new BelinDBError(Errors.InvalidKey);
  if (!self.has(key)) throw new BelinDBError(Errors.DataNotFound, key);
  if (!Array.isArray(self.get(key)))
    throw new BelinDBError(Errors.DataNotAnArray);

  return self.get(key).map(callbackfn, thisArg);
}
