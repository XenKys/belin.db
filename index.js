const fs = require("fs"),
  path = require("path"),
  { set: baseSet, get: baseGet, delete: baseDelete } = require("./base");

module.exports = class Database {
  constructor(
    options = {
      path: "./database.json",
      separator: ".",
      belowZero: false,
    }
  ) {
    this.path = options.path || "./database.json";
    this.separator = options.separator || ".";
    this.belowZero = options.belowZero || false;

    if (path.extname(this.path) !== ".json")
      throw new Error("The path doesn't end with a JSON file");

    if (!fs.existsSync(this.path)) {
      mkdirSyncRecursive(path.dirname(this.path));
      fs.writeFileSync(this.path, "{}");

      function mkdirSyncRecursive(directory) {
        const baseDir = path.dirname(directory);
        if (!fs.existsSync(baseDir)) {
          mkdirSyncRecursive(baseDir);
        }
        if (!fs.existsSync(directory)) {
          fs.mkdirSync(directory);
        }
      }
    }
  }

  set(key, value) {
    if (!key) throw new Error("[belin.db] Enter the name of the key");
    if (!value && value !== 0)
      throw new Error("[belin.db] Enter the name of the value");

    let data = this.all();

    data = baseSet(this, data, key, value, this.separator);

    fs.writeFileSync(this.path, JSON.stringify(data, null));

    return this.get(key);
  }

  get(key) {
    if (!key) throw new Error("[belin.db] Enter the name of the key");

    const data = this.all();

    return baseGet(data, key, this.separator);
  }

  delete(key) {
    if (!this.has(key))
      throw new Error("No key with this name was found in the saved data");
    if (!key) throw new Error("[belin.db] Enter the name of the key");

    let data = this.all();

    data = baseDelete(data, key, this.separator);

    fs.writeFileSync(this.path, JSON.stringify(data, null));

    return true;
  }

  has(key) {
    if (!key) throw new Error("[belin.db] Enter the name of the key");

    const data = this.all();

    return baseGet(data, key, this.separator) ? true : false;
  }

  all() {
    const data = fs.readFileSync(this.path, "utf8");

    return JSON.parse(data);
  }

  clear() {
    fs.writeFileSync(this.path, "{}");

    return true;
  }

  replace(path) {
    if (!path)
      throw new Error(
        "[belin.db] Enter the path of the file from which you want to replace the saved data"
      );
    if (!fs.existsSync(path))
      throw new Error(`[belin.db] The path '${path}' was not found`);

    fs.writeFileSync(this.path, fs.readFileSync(path, "utf8"));

    return true;
  }

  push(key, value) {
    if (!key) throw new Error("[belin.db] Enter the name of the key");
    if (!value && value !== 0)
      throw new Error("[belin.db] Enter the name of the value");

    let array = [];

    if (this.get(key)) {
      if (typeof this.get(key) !== "object") {
        array = [];
      } else {
        array = this.get(key);
      }
    }

    array.push(value);

    this.set(key, array);

    return this.get(key);
  }

  pull(key, value) {
    if (!this.has(key))
      throw new Error("No key with this name was found in the saved data");
    if (!key) throw new Error("[belin.db] Enter the name of the key");
    if (!value && value !== 0)
      throw new Error("[belin.db] Enter the name of the value");

    let array = [];

    if (this.get(key)) array = this.get(key);

    array = array.filter((element) => element !== value);

    this.set(key, array);

    return this.get(key);
  }

  add(key, value) {
    if (isNaN(value)) throw new TypeError("[belin.db] Enter a number");
    if (!key) throw new Error("[belin.db] Enter the name of the key");
    if (!value) throw new Error("[belin.db] Enter the name of the value");

    this.set(
      key,
      Number(
        this.get(key)
          ? isNaN(this.get(key))
            ? Number(value)
            : this.get(key) + Number(value)
          : Number(value)
      )
    );

    return this.get(key);
  }

  remove(key, value) {
    if (isNaN(value)) throw new TypeError("[belin.db] Enter a number");
    if (!key) throw new Error("[belin.db] Enter the name of the key");
    if (!value) throw new Error("[belin.db] Enter the name of the value");

    this.belowZero
      ? this.set(key, this.get(key) - Number(value))
      : this.set(
          key,
          this.get(key)
            ? this.get(key) - Number(value) <= 1
              ? 1
              : (isNaN(this.get(key)) ? 1 : this.get(key) - Number(value)) || 1
            : 1
        );

    return this.get(key);
  }
};
