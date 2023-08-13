import { del as baseDelete } from "../base";
import fs from "fs";

export function del(self: any, key: string) {
  if (key === undefined)
    throw new Error("[belin.db] Enter the name of the key");
  if (!self.has(key))
    throw new Error(
      "[belin.db] No key with this name was found in the saved data"
    );

  let data = self.all();

  data = baseDelete(data, key, self.separator);

  fs.writeFileSync(self.path, JSON.stringify(data, null));

  return true;
}
