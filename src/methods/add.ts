import type { Database } from "../Database";
import { BelinDBError, Errors } from "../utils";

export function add(self: Database, key: string, number: number): number {
  if (!key) throw new BelinDBError(Errors.InvalidKey);
  if (!self.has(key)) throw new BelinDBError(Errors.DataNotFound, key);
  if (number === undefined || isNaN(number))
    throw new BelinDBError(Errors.InvalidValue);
  if (isNaN(self.get(key))) throw new BelinDBError(Errors.DataNotANumber, key);

  self.set(key, self.get(key) + number);

  return self.get(key);
}
