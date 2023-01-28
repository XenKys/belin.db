export function pull(self: any, key: string, item: any) {
  if (!self.has(key))
    throw new Error(
      "[belin.db] No key with this name was found in the saved data"
    );
  if (!key) throw new Error("[belin.db] Enter the name of the key");
  if (!item && item !== 0)
    throw new Error("[belin.db] Enter the name of the value");

  let array = [];

  if (self.get(key)) array = self.get(key);

  array = array.filter((i: any) => i !== item);

  self.set(key, array);

  return self.get(key);
}
