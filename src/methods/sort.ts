import type { Database } from "../Database";

export function sort(
  self: Database,
  key: string,
  compareFn?: (a: any, b: any) => number
): Array<any> {
  if (!key) throw new Error("[belin.db] Enter a valid key");
  if (!self.has(key))
    throw new Error(`[belin.db] '${key}' not found in the data`);
  if (!Array.isArray(self.get(key)))
    throw new Error(`[belin.db] The value of '${key}' isn't an array`);

  return self.get(key).sort(compareFn);
}
