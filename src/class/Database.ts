import fs from "fs";
import path from "path";
import {
  set,
  get,
  del,
  has,
  all,
  clear,
  importFrom,
  push,
  pull,
  add,
  remove,
} from "../methods";

export class Database {
  public path: string;
  public separator: string;
  public belowZero: boolean;

  /**
   * Get or create a JSON file with the saved data
   *
   * @param {object} options - Options for the database
   * @param {string} options.path - The file path for the JSON file to save the data
   * @param {string} options.separator - The separator symbol that you will use to split the data
   * @param {boolean} options.belowZero - If the numbers on the saved data can go below 0
   *
   * @returns {object} The JSON file
   */
  constructor(options: {
    path?: string;
    separator?: string;
    belowZero?: boolean;
  }) {
    this.path = options.path || "./database.json";
    this.separator = options.separator || ".";
    this.belowZero = options.belowZero || false;

    if (path.extname(this.path) !== ".json")
      throw new Error("[belin.db] The path doesn't end with a JSON file");

    if (!fs.existsSync(this.path)) {
      mkdirSyncRecursive(path.dirname(this.path));
      fs.writeFileSync(this.path, "{}");

      function mkdirSyncRecursive(directory: string) {
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

  /**
   * Set a value to a key
   *
   * @param {string} key - The name of the key
   * @param {any} value - The key's value
   *
   * @returns {any} The key's value
   */
  set(key: string, value: any) {
    return set(this, key, value);
  }

  /**
   * Get the value of a key
   *
   * @param {string} key - The name of the key
   *
   * @returns {any} The key's value
   */
  get(key: string) {
    return get(this, key);
  }

  /**
   * Delete the value of a key
   *
   * @param {string} key - The name of the key
   *
   * @returns {boolean} true
   */
  delete(key: string) {
    return del(this, key);
  }

  /**
   * Check if a key exists
   *
   * @param {string} key - The name of the key
   *
   * @returns {boolean} If the key exists
   */
  has(key: string) {
    return has(this, key);
  }

  /**
   * Get the JSON file
   *
   * @returns {object} The JSON file
   */
  all() {
    return all(this);
  }

  /**
   * Delete all saved data
   *
   * @returns {object} The JSON file
   */
  clear() {
    return clear(this);
  }

  /**
   * Import data from another JSON file
   *
   * @param {string} path - The path of the JSON file
   *
   * @returns {object} The JSON file
   */
  importFrom(path: string) {
    return importFrom(this, path);
  }

  /**
   * Push an item into an array
   *
   * @param {string} key - The name of the key
   * @param {any} item - The item
   *
   * @returns {any} The key's value
   */
  push(key: string, item: any) {
    return push(this, key, item);
  }

  /**
   * Pull an item from an array
   *
   * @param {string} key - The name of the key
   * @param {any} item - The item
   *
   * @returns {any} The key's value
   */
  pull(key: string, item: any) {
    return pull(this, key, item);
  }

  /**
   * Add a number to a key value
   *
   * @param {string} key - The name of the key
   * @param {number} number - The number
   *
   * @returns {any} The key's value
   */
  add(key: string, number: number) {
    return add(this, key, number);
  }

  /**
   * Remove a number from a key value
   *
   * @param {string} key - The name of the key
   * @param {number} number - The number
   *
   * @returns {any} The key's value
   */
  remove(key: string, number: number) {
    return remove(this, key, number);
  }
}
