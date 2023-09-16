import { Database } from "../Database";

export function push(self: Database, key: string, item: any): Array<any> {
  if (key === undefined)
    throw new Error("[belin.db] Enter the name of the key");
  if (item === undefined)
    throw new Error("[belin.db] Enter the name of the value");
  if (!Array.isArray(self.get(key)))
    throw new Error(`[belin.db] The value of '${key}' isn't an array`);

  let array = self.has(key) ? [] : [];

  array.push(item);

  self.set(key, array);

  return self.get(key);
}
