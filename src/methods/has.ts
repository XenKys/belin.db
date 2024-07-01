import type { Database } from "../Database";
import { get as baseGet } from "../base";
import { BelinDBError, Errors } from "../utils";

export function has(self: Database, key: string): boolean {
  if (!key) throw new BelinDBError(Errors.InvalidKey);

  return baseGet(self.all(), key, self.separator) !== undefined;
}
