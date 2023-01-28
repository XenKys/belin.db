export function remove(self: any, key: string, number: number) {
  if (isNaN(number)) throw new TypeError("[belin.db] Enter a number");
  if (!key) throw new Error("[belin.db] Enter the name of the key");
  if (!number) throw new Error("[belin.db] Enter the name of the value");

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
