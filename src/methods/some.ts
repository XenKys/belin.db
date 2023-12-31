import type { Database } from "../Database";

export function some(
  self: Database,
  key: string,
  predicate: (value: any, index: number, array: Array<any>) => unknown,
  thisArg?: any
): boolean {
  if (!key) throw new Error("[belin.db] Enter a valid key");
  if (!self.has(key))
    throw new Error(`[belin.db] '${key}' not found in the data`);
  if (!Array.isArray(self.get(key)))
    throw new Error(`[belin.db] The value of '${key}' isn't an array`);

  return self.get(key).some(predicate, thisArg);
}
