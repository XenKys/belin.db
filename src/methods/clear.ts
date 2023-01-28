import fs from "fs";

export function clear(self: any) {
  fs.writeFileSync(self.path, "{}");

  const data = fs.readFileSync(self.path, "utf8");

  return JSON.parse(data);
}
