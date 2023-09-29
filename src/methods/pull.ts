import type { Database } from "../Database";

export function pull(self: Database, key: string, item: any): Array<any> {
  if (!key) throw new Error("[belin.db] Enter a valid key");
  if (!self.has(key))
    throw new Error(`[belin.db] '${key}' not found in the data`);
  if (item === undefined) throw new Error("[belin.db] Enter the value");
  if (!Array.isArray(self.get(key)))
    throw new Error(`[belin.db] The value of '${key}' isn't an array`);

  self.set(
    key,
    self.get(key).filter((i: any) => i !== item)
  );

  return self.get(key);
}
