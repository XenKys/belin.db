import type { Database } from "../Database";

export function add(self: Database, key: string, number: number): number {
  if (key === undefined)
    throw new Error("[belin.db] Enter the name of the key");
  if (number === undefined)
    throw new Error("[belin.db] Enter the name of the value");
  if (isNaN(number)) throw new TypeError("[belin.db] Enter a number");

  self.set(
    key,
    Number(
      self.get(key)
        ? isNaN(self.get(key))
          ? Number(number)
          : self.get(key) + Number(number)
        : Number(number)
    )
  );

  return self.get(key);
}
