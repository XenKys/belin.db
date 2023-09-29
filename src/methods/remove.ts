import type { Database } from "../Database";

export function remove(self: Database, key: string, number: number): number {
  if (!key) throw new Error("[belin.db] Enter a valid key");
  if (number === undefined) throw new Error("[belin.db] Enter the value");
  if (isNaN(number))
    throw new TypeError("[belin.db] The value must be a number");

  self.set(
    key,
    self.belowZero
      ? self.get(key) - Number(number)
      : self.get(key)
      ? self.get(key) - Number(number) <= 1
        ? 1
        : (isNaN(self.get(key)) ? 1 : self.get(key) - Number(number)) || 1
      : 1
  );

  return self.get(key);
}
