import fs from "fs";
import { extname, dirname } from "path";
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
} from "./methods";

export interface DatabaseOptions {
  separator?: string;
  belowZero?: boolean;
}

export class Database {
  public path: string;
  public separator: string;
  public belowZero: boolean;

  /**
   * Get or create a JSON file with the saved data
   *
   * @param path - The file path for the JSON file to save the data
   * @param options - Options for the database
   */
  constructor(path?: string, options?: DatabaseOptions) {
    this.path = path ?? "./database.json";
    this.separator = options?.separator ?? ".";
    this.belowZero = options?.belowZero ?? false;

    if (extname(this.path) !== ".json")
      throw new Error("[belin.db] The path doesn't end with a JSON file");

    if (!fs.existsSync(this.path)) {
      mkdirSyncRecursive(dirname(this.path));
      fs.writeFileSync(this.path, "{}");

      function mkdirSyncRecursive(directory: string) {
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
   * @param key - The name of the key
   * @param value - The key's value
   */
  set(key: string, value: any): any {
    return set(this, key, value);
  }

  /**
   * Get the value of a key
   *
   * @param key - The name of the key
   */
  get(key: string): any {
    return get(this, key);
  }

  /**
   * Delete the value of a key
   *
   * @param key - The name of the key
   */
  delete(key: string): void {
    del(this, key);
  }

  /**
   * Check if a key exists
   *
   * @param key - The name of the key
   */
  has(key: string): boolean {
    return has(this, key);
  }

  /**
   * Get the JSON file
   */
  all(): Record<string, any> {
    return all(this);
  }

  /**
   * Delete all saved data
   */
  clear(): Record<string, any> {
    return clear(this);
  }

  /**
   * Import data from another JSON file
   *
   * @param path - The path of the JSON file
   */
  importFrom(path: string): Record<string, any> {
    return importFrom(this, path);
  }

  /**
   * Push an item into an array
   *
   * @param key - The name of the key
   * @param item - The item
   */
  push(key: string, item: any): Array<any> {
    return push(this, key, item);
  }

  /**
   * Pull an item from an array
   *
   * @param key - The name of the key
   * @param item - The item
   */
  pull(key: string, item: any): Array<any> {
    return pull(this, key, item);
  }

  /**
   * Add a number to a key value
   *
   * @param key - The name of the key
   * @param number - The number
   */
  add(key: string, number: number): number {
    return add(this, key, number);
  }

  /**
   * Remove a number from a key value
   *
   * @param key - The name of the key
   * @param number - The number
   */
  remove(key: string, number: number): number {
    return remove(this, key, number);
  }
}
