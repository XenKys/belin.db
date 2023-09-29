import type { Database } from "../Database";

export function remove(self: Database, key: string, number: number): number {
  if (!key) throw new Error("[belin.db] Enter the name of the key");
  if (number === undefined)
    throw new Error("[belin.db] Enter the name of the value");
  if (isNaN(number)) throw new TypeError("[belin.db] Enter a number");

  self.belowZero
    ? self.set(key, self.get(key) - Number(number))
    : self.set(
        key,
        self.get(key)
          ? self.get(key) - Number(number) <= 1
            ? 1
            : (isNaN(self.get(key)) ? 1 : self.get(key) - Number(number)) || 1
          : 1
      );

  return self.get(key);
}
