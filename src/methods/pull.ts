export function pull(self: any, key: string, item: any) {
  if (key === undefined)
    throw new Error("[belin.db] Enter the name of the key");
  if (!self.has(key))
    throw new Error(
      "[belin.db] No key with this name was found in the saved data"
    );
  if (item === undefined)
    throw new Error("[belin.db] Enter the name of the value");

  let array = [];

  if (self.get(key)) array = self.get(key);

  array = array.filter((i: any) => i !== item);

  self.set(key, array);

  return self.get(key);
}
