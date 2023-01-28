import { set as baseSet } from "../base";
import fs from "fs";

export function set(self: any, key: string, value: any) {
  if (!key) throw new Error("[belin.db] Enter the name of the key");
  if (!value && value !== 0)
    throw new Error("[belin.db] Enter the name of the value");

  let data = self.all();

  data = baseSet(data, key, value, self.separator);

  fs.writeFileSync(self.path, JSON.stringify(data, null));

  return self.get(key);
}
