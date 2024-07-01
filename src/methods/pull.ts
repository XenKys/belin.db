import type { Database } from "../Database";
import { BelinDBError, Errors } from "../utils";

export function pull(self: Database, key: string, item: any): Array<any> {
  if (!key) throw new BelinDBError(Errors.InvalidKey);
  if (!self.has(key)) throw new BelinDBError(Errors.DataNotFound, key);
  if (item === undefined) throw new BelinDBError(Errors.InvalidValue);
  if (!Array.isArray(self.get(key)))
    throw new BelinDBError(Errors.DataNotAnArray);

  let array: Array<any> = self.get(key);

  self.set(
    key,
    array.filter((i: any) => i !== item)
  );

  return self.get(key);
}
