import fs from "fs";
import { extname, dirname } from "path";
import { BelinDBError, Errors } from "./utils";
import { del, get, set } from "./base";

export interface DatabaseOptions {
  separator?: string;
  belowZero?: boolean;
}

export class Database {
  path: string;
  separator: string;
  belowZero: boolean;

  /**
   * Manage the data
   *
   * @param path - The file path for the JSON file to save the data
   * @param options - Options for the database
   */
  constructor(path?: string, options?: DatabaseOptions) {
    this.path = path ?? "./database.json";
    this.separator = options.separator ?? ".";
    this.belowZero = options.belowZero ?? false;

    if (extname(this.path) !== ".json")
      throw new BelinDBError(Errors.InvalidPath);

    if (!fs.existsSync(this.path)) {
      this.mkdirSyncRecursive(dirname(this.path));

      fs.writeFileSync(this.path, "{}");
    }
  }

  private mkdirSyncRecursive(directory: string) {
    const baseDir = dirname(directory);

    if (!fs.existsSync(baseDir)) {
      this.mkdirSyncRecursive(baseDir);
    }

    if (!fs.existsSync(directory)) {
      fs.mkdirSync(directory);
    }
  }

  /**
   * Set the value of a key
   *
   * @param key - The key
   * @param value - The key's value
   */
  set(key: string, value: any): any {
    if (!key) throw new BelinDBError(Errors.InvalidKey);
    if (value === undefined) throw new BelinDBError(Errors.InvalidValue);

    const data = set(this.all(), key, value, this.separator);

    fs.writeFileSync(this.path, JSON.stringify(data));

    return this.get(key);
  }

  /**
   * Get the value of a key
   *
   * @param key - The key
   */
  get(key: string): any {
    if (!key) throw new BelinDBError(Errors.InvalidKey);

    return get(this.all(), key, this.separator);
  }

  /**
   * Delete a key
   *
   * @param key - The key
   */
  delete(key: string): void {
    if (!key) throw new BelinDBError(Errors.InvalidKey);
    if (!this.has(key)) throw new BelinDBError(Errors.DataNotFound, key);

    const data = del(this.all(), key, this.separator);

    fs.writeFileSync(this.path, JSON.stringify(data, null));
  }

  /**
   * Check if a key exists
   *
   * @param key - The key
   */
  has(key: string): boolean {
    if (!key) throw new BelinDBError(Errors.InvalidKey);

    return get(this.all(), key, this.separator) !== undefined;
  }

  /**
   * Get the JSON file
   */
  all(): Record<string, any> {
    return JSON.parse(fs.readFileSync(this.path, "utf8"));
  }

  /**
   * Delete all saved data
   */
  clear(): Record<string, any> {
    fs.writeFileSync(this.path, "{}");

    return this.all();
  }

  /**
   * Push an item into an array
   *
   * @param key - The key
   * @param item - The item
   */
  push(key: string, item: any): Array<any> {
    if (!key) throw new BelinDBError(Errors.InvalidKey);
    if (!this.has(key)) throw new BelinDBError(Errors.DataNotFound, key);
    if (item === undefined) throw new BelinDBError(Errors.InvalidValue);
    if (!Array.isArray(this.get(key)))
      throw new BelinDBError(Errors.DataNotAnArray);

    let array: Array<any> = this.get(key);

    array.push(item);

    this.set(key, array);

    return this.get<Array<T>>(key);
  }

  /**
   * Pull an item from an array
   *
   * @param key - The key
   * @param item - The item
   */
  pull(key: string, item: any): Array<any> {
    if (!key) throw new BelinDBError(Errors.InvalidKey);
    if (!this.has(key)) throw new BelinDBError(Errors.DataNotFound, key);
    if (item === undefined) throw new BelinDBError(Errors.InvalidValue);
    if (!Array.isArray(this.get(key)))
      throw new BelinDBError(Errors.DataNotAnArray);

    let array: Array<any> = this.get(key);

    this.set(
      key,
      array.filter((i: any) => i !== item)
    );

    return this.get<Array<T>>(key);
  }

  /**
   * Get an item of an array randomly
   *
   * @param key - The key
   */
  random(key: string): Array<any> {
    if (!key) throw new BelinDBError(Errors.InvalidKey);
    if (!this.has(key)) throw new BelinDBError(Errors.DataNotFound, key);
    if (!Array.isArray(this.get(key)))
      throw new BelinDBError(Errors.DataNotAnArray);

    const array: Array<any> = this.get(key);

    return array[Math.floor(Math.random() * array.length)];
  }

  /**
   * Get the size of an array
   *
   * @param key - The key
   */
  size(key: string): number {
    if (!key) throw new BelinDBError(Errors.InvalidKey);
    if (!this.has(key)) throw new BelinDBError(Errors.DataNotFound, key);
    if (!Array.isArray(this.get(key)))
      throw new BelinDBError(Errors.DataNotAnArray);

    return this.get(key).length;
  }

  /**
   * Add a number to a key value
   *
   * @param key - The key
   * @param number - The number
   */
  add(key: string, number: number): number {
    if (!key) throw new BelinDBError(Errors.InvalidKey);
    if (!this.has(key)) throw new BelinDBError(Errors.DataNotFound, key);
    if (number === undefined || isNaN(number))
      throw new BelinDBError(Errors.InvalidValue);
    if (isNaN(this.get(key)))
      throw new BelinDBError(Errors.DataNotANumber, key);

    this.set(key, this.get(key) + number);

    return this.get(key);
  }

  /**
   * Remove a number from a key value
   *
   * @param key - The key
   * @param number - The number
   */
  remove(key: string, number: number): number {
    if (!key) throw new BelinDBError(Errors.InvalidKey);
    if (!this.has(key)) throw new BelinDBError(Errors.DataNotFound, key);
    if (number === undefined || isNaN(number))
      throw new BelinDBError(Errors.InvalidValue);
    if (isNaN(this.get(key)))
      throw new BelinDBError(Errors.DataNotANumber, key);

    this.set(
      key,
      this.belowZero
        ? this.get(key) - number
        : this.get(key) - number <= 1
        ? 1
        : this.get(key) - number
    );

    return this.get(key);
  }
}
