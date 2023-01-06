const fs = require("fs"),
  { extname, dirname } = require("path"),
  { set: baseSet, get: baseGet, delete: baseDelete } = require("./base");

module.exports = class Database {
  /**
   * Get or create a JSON file with the saved data
   *
   * @param {Object} options - Options for the database
   * @param {string} options.path - The file path for the JSON file to save the data
   * @param {string} options.separator - The separator symbol that you will use to split the data
   * @param {boolean} options.belowZero - If the numbers on the saved data can go below 0
   *
   * @returns {Object} The JSON file
   */
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

    if (extname(this.path) !== ".json")
      throw new Error("The path doesn't end with a JSON file");

    if (!fs.existsSync(this.path)) {
      mkdirSyncRecursive(dirname(this.path));
      fs.writeFileSync(this.path, "{}");

      function mkdirSyncRecursive(directory) {
        const baseDir = dirname(directory);
        if (!fs.existsSync(baseDir)) {
          mkdirSyncRecursive(baseDir);
        }
        if (!fs.existsSync(directory)) {
          fs.mkdirSync(directory);
        }
      }
    }
  }

  /**
   * Set a value to a key
   *
   * @param {string} key - The name of the key
   * @param {any} value - The name of the key's value
   *
   * @returns {any} The key's value
   */
  set(key, value) {
    if (!key) throw new Error("[belin.db] Enter the name of the key");
    if (!value && value !== 0)
      throw new Error("[belin.db] Enter the name of the value");

    let data = this.all();

    data = baseSet(data, key, value, this.separator);

    fs.writeFileSync(this.path, JSON.stringify(data, null));

    return this.get(key);
  }

  /**
   * Get the value of a key
   *
   * @param {string} key - The name of the key
   *
   * @returns {any} The key's value
   */
  get(key) {
    if (!key) throw new Error("[belin.db] Enter the name of the key");

    const data = this.all();

    return baseGet(data, key, this.separator);
  }

  /**
   * Delete the value of a key
   *
   * @param {string} key - The name of the key
   *
   * @returns {boolean} true
   */
  delete(key) {
    if (!this.has(key))
      throw new Error("No key with this name was found in the saved data");
    if (!key) throw new Error("[belin.db] Enter the name of the key");

    let data = this.all();

    data = baseDelete(data, key, this.separator);

    fs.writeFileSync(this.path, JSON.stringify(data, null));

    return true;
  }

  /**
   * Check if a key exists
   *
   * @param {string} key - The name of the key
   *
   * @returns {boolean} If the key exists
   */
  has(key) {
    if (!key) throw new Error("[belin.db] Enter the name of the key");
    if (this.belowZero) {
      console.error(
        "[belin.db] The belowZero option is set to true, this may return false if the key's value is 0"
      );
    }

    const data = this.all();

    return baseGet(data, key, this.separator) ? true : false;
  }

  /**
   * Get the JSON file
   *
   * @returns {Object} The JSON file
   */
  all() {
    const data = fs.readFileSync(this.path, "utf8");

    return JSON.parse(data);
  }

  /**
   * Delete all saved data
   *
   * @returns {boolean} true
   */
  clear() {
    fs.writeFileSync(this.path, "{}");

    return true;
  }

  /**
   * Replace all saved data with that of another JSON file
   *
   * @param {string} path - The path of the JSON file
   *
   * @returns {boolean} true
   */
  replace(path) {
    if (!path)
      throw new Error(
        "[belin.db] Enter the path of the file from which you want to replace the saved data"
      );
    if (!fs.existsSync(path))
      throw new Error(`[belin.db] The path '${path}' was not found`);
    if (extname(path) !== ".json")
      throw new Error("The path doesn't end with a JSON file");

    fs.writeFileSync(this.path, fs.readFileSync(path, "utf8"));

    return true;
  }

  /**
   * Push an item into an array
   *
   * @param {string} key - The name of the key
   * @param {any} item - The item
   *
   * @returns {Object} The key's value
   */
  push(key, item) {
    if (!key) throw new Error("[belin.db] Enter the name of the key");
    if (!item && item !== 0)
      throw new Error("[belin.db] Enter the name of the value");

    let array = [];

    if (this.get(key)) {
      if (typeof this.get(key) !== "object") {
        array = [];
      } else {
        array = this.get(key);
      }
    }

    array.push(item);

    this.set(key, array);

    return this.get(key);
  }

  /**
   * Pull an item from an array
   *
   * @param {string} key - The name of the key
   * @param {any} item - The item
   *
   * @returns {Object} The key's value
   */
  pull(key, item) {
    if (!this.has(key))
      throw new Error("No key with this name was found in the saved data");
    if (!key) throw new Error("[belin.db] Enter the name of the key");
    if (!item && item !== 0)
      throw new Error("[belin.db] Enter the name of the value");

    let array = [];

    if (this.get(key)) array = this.get(key);

    array = array.filter((i) => i !== item);

    this.set(key, array);

    return this.get(key);
  }

  /**
   * Add a number to a key value
   *
   * @param {string} key - The name of the key
   * @param {number} number - The number
   *
   * @returns {Object} The key's value
   */
  add(key, number) {
    if (isNaN(number)) throw new TypeError("[belin.db] Enter a number");
    if (!key) throw new Error("[belin.db] Enter the name of the key");
    if (!number) throw new Error("[belin.db] Enter the name of the value");

    this.set(
      key,
      Number(
        this.get(key)
          ? isNaN(this.get(key))
            ? Number(number)
            : this.get(key) + Number(number)
          : Number(number)
      )
    );

    return this.get(key);
  }

  /**
   * Remove a number from a key value
   *
   * @param {string} key - The name of the key
   * @param {number} number - The number
   *
   * @returns {Object} The key's value
   */
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
