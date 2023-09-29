import type { Database } from "../Database";

export function add(self: Database, key: string, number: number): number {
  if (!key) throw new Error("[belin.db] Enter a valid key");
  if (number === undefined) throw new Error("[belin.db] Enter the value");
  if (isNaN(number))
    throw new TypeError("[belin.db] The value must be a number");

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
