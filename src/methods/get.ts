import { get as baseGet } from "../base";

export function get(self: any, key: string) {
  if (!key) throw new Error("[belin.db] Enter the name of the key");

  const data = self.all();

  return baseGet(data, key, self.separator);
}
