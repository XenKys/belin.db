import fs from "fs";
import type { Database } from "../Database";

export function all(self: Database): Record<string, any> {
  return JSON.parse(fs.readFileSync(self.path, "utf8"));
}
