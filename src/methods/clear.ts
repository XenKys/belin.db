import fs from "fs";
import { Database } from "../Database";

export function clear(self: Database): Record<string, any> {
  fs.writeFileSync(self.path, "{}");

  return self.all();
}
