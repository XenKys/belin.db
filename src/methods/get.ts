import type { Database } from "../Database";
import { get as baseGet } from "../base";

export function get(self: Database, key: string): any {
  if (!key) throw new Error("[belin.db] Enter a valid key");

  return baseGet(self.all(), key, self.separator);
}
