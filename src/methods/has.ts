import { get as baseGet } from "../base";

export function has(self: any, key: string) {
  if (!key) throw new Error("[belin.db] Enter the name of the key");
  if (self.belowZero) {
    console.error(
      "[belin.db] The belowZero option is set to true, this may return false if the key's value is 0"
    );
  }

  const data = self.all();

  return baseGet(data, key, self.separator) ? true : false;
}
