import type { Database } from "../Database";
import { get as baseGet } from "../base";

export function has(self: Database, key: string): boolean {
  if (!key) throw new Error("[belin.db] Enter a valid key");

  return baseGet(self.all(), key, self.separator) !== undefined;
}
