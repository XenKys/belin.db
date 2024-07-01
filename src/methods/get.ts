import type { Database } from "../Database";
import { get as baseGet } from "../base";
import { BelinDBError, Errors } from "../utils";

export function get(self: Database, key: string): any {
  if (!key) throw new BelinDBError(Errors.InvalidKey);

  return baseGet(self.all(), key, self.separator);
}
