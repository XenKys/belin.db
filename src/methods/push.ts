import type { Database } from "../Database";
import { BelinDBError, Errors } from "../utils";

export function push(self: Database, key: string, item: any): Array<any> {
  if (!key) throw new BelinDBError(Errors.InvalidKey);
  if (!self.has(key)) throw new BelinDBError(Errors.DataNotFound, key);
  if (item === undefined) throw new BelinDBError(Errors.InvalidValue);
  if (!Array.isArray(self.get(key)))
    throw new BelinDBError(Errors.DataNotAnArray);

  let array: Array<any> = self.get(key);

  array.push(item);

  self.set(key, array);

  return self.get(key);
}
