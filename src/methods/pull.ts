import { Database } from "../Database";

export function pull(self: Database, key: string, item: any): Array<any> {
  if (key === undefined)
    throw new Error("[belin.db] Enter the name of the key");
  if (!self.has(key))
    throw new Error(
      "[belin.db] No key with this name was found in the saved data"
    );
  if (item === undefined)
    throw new Error("[belin.db] Enter the name of the value");

  self.set(
    key,
    self.get(key).filter((i: any) => i !== item)
  );

  return self.get(key);
}
