import fs from "fs";
import { extname } from "path";
import type { Database } from "../Database";

export function importFrom(self: Database, path: string): Record<string, any> {
  if (!path)
    throw new Error(
      "[belin.db] Enter the path of the file from which you want to replace the saved data"
    );
  if (!fs.existsSync(path))
    throw new Error(`[belin.db] The path '${path}' was not found`);
  if (extname(path) !== ".json")
    throw new Error("[belin.db] The path doesn't end with a JSON file");

  fs.writeFileSync(self.path, fs.readFileSync(path, "utf8"));

  return self.all();
}
