import fs from "fs";

export function all(self: any) {
  const data = fs.readFileSync(self.path, "utf8");

  return JSON.parse(data);
}
