import { Database } from "../Database";

export function push(self: Database, key: string, item: any): Array<any> {
  if (key === undefined)
    throw new Error("[belin.db] Enter the name of the key");
  if (item === undefined)
    throw new Error("[belin.db] Enter the name of the value");

  let array = self.has(key) ? self.get(key) : [];

  array.push(item);

  self.set(key, array);

  return self.get(key);
}
