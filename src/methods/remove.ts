import type { Database } from "../Database";
import { BelinDBError, Errors } from "../utils";

export function remove(self: Database, key: string, number: number): number {
  if (!key) throw new BelinDBError(Errors.InvalidKey);
  if (!self.has(key)) throw new BelinDBError(Errors.DataNotFound, key);
  if (number === undefined || isNaN(number))
    throw new BelinDBError(Errors.InvalidValue);
  if (isNaN(self.get(key))) throw new BelinDBError(Errors.DataNotANumber, key);

  self.set(
    key,
    self.belowZero
      ? self.get(key) - number
      : self.get(key) - number <= 1
      ? 1
      : self.get(key) - number
  );

  return self.get(key);
}
