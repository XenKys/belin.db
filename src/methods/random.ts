import type { Database } from "../Database";

export function random(self: Database, key: string): any {
  if (!key) throw new Error("[belin.db] Enter a valid key");
  if (!self.has(key))
    throw new Error(`[belin.db] '${key}' not found in the data`);
  if (!Array.isArray(self.get(key)))
    throw new Error(`[belin.db] The value of '${key}' isn't an array`);

  const array: Array<any> = self.get(key);

  return array[Math.floor(Math.random() * array.length)];
}
