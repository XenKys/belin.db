import type { Database } from "../Database";

export function push(self: Database, key: string, item: any): Array<any> {
  if (!key) throw new Error("[belin.db] Enter a valid key");
  if (item === undefined) throw new Error("[belin.db] Enter the value");
  if (!Array.isArray(self.get(key)))
    throw new Error(`[belin.db] The value of '${key}' isn't an array`);

  let array: Array<any> = self.has(key) ? self.get(key) : [];

  array.push(item);

  self.set(key, array);

  return self.get(key);
}
