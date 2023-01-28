export function add(self: any, key: string, number: number) {
  if (isNaN(number)) throw new TypeError("[belin.db] Enter a number");
  if (!key) throw new Error("[belin.db] Enter the name of the key");
  if (!number) throw new Error("[belin.db] Enter the name of the value");

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
