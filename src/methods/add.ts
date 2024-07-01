import type { Database } from "../Database";

export function add(self: Database, key: string, number: number): number {
  if (!key) throw new Error("[belin.db] Enter a valid key");
  if (!self.has(key))
    throw new Error(`[belin.db] The key '${key}' doesn't exist`);
  if (number === undefined) throw new Error("[belin.db] Enter the value");
  if (isNaN(number))
    throw new TypeError("[belin.db] The value must be a number");
  if (isNaN(self.get(key)))
    throw new Error(`[belin.db] The value of '${key}' isn't a number`);

  self.set(key, self.get(key) + number);

  return self.get(key);
}
