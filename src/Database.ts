import fs from "fs";
import { extname, dirname } from "path";
import { BelinDBError, Errors } from "./utils";
import * as base from "./base";

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
  set<T = unknown, U = unknown>(key: string, value: T): U {
    if (!key) throw new BelinDBError(Errors.InvalidKey);
    if (value === undefined) throw new BelinDBError(Errors.InvalidValue);

    const data = base.set(this.all(), key, value, this.separator);

    fs.writeFileSync(this.path, JSON.stringify(data));

    return this.get<U>(key);
  }

  /**
   * Get the value of a key
   *
   * @param key - The key
   */
  get<T = unknown>(key: string): T {
    if (!key) throw new BelinDBError(Errors.InvalidKey);

    return base.get(this.all(), key, this.separator);
  }

  /**
   * Delete a key
   *
   * @param key - The key
   */
  delete(key: string): void {
    if (!key) throw new BelinDBError(Errors.InvalidKey);
    if (!this.has(key)) throw new BelinDBError(Errors.DataNotFound, key);

    const data = base.del(this.all(), key, this.separator);

    fs.writeFileSync(this.path, JSON.stringify(data, null));
  }

  /**
   * Check if a key exists
   *
   * @param key - The key
   */
  has(key: string): boolean {
    if (!key) throw new BelinDBError(Errors.InvalidKey);

    return base.get(this.all(), key, this.separator) !== undefined;
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
  clear(): Database {
    fs.writeFileSync(this.path, "{}");

    return this;
  }

  /**
   * Push an item into an array
   *
   * @param key - The key
   * @param item - The item
   */
  push<T = unknown>(key: string, item: T): Array<T> {
    if (!key) throw new BelinDBError(Errors.InvalidKey);
    if (!this.has(key)) throw new BelinDBError(Errors.DataNotFound, key);
    if (item === undefined) throw new BelinDBError(Errors.InvalidValue);
    if (!Array.isArray(this.get(key)))
      throw new BelinDBError(Errors.DataNotAnArray);

    let array: Array<T> = this.get<Array<T>>(key);

    array.push(item);

    this.set<Array<T>, Array<T>>(key, array);

    return this.get<Array<T>>(key);
  }

  /**
   * Pull an item from an array
   *
   * @param key - The key
   * @param item - The item
   */
  pull<T = unknown>(key: string, item: T): Array<T> {
    if (!key) throw new BelinDBError(Errors.InvalidKey);
    if (!this.has(key)) throw new BelinDBError(Errors.DataNotFound, key);
    if (item === undefined) throw new BelinDBError(Errors.InvalidValue);
    if (!Array.isArray(this.get(key)))
      throw new BelinDBError(Errors.DataNotAnArray);

    this.set<Array<T>, Array<T>>(
      key,
      this.get<Array<T>>(key).filter((i: T) => i !== item)
    );

    return this.get<Array<T>>(key);
  }

  /**
   * Get an item of an array randomly
   *
   * @param key - The key
   */
  random<T = unknown>(key: string): T {
    if (!key) throw new BelinDBError(Errors.InvalidKey);
    if (!this.has(key)) throw new BelinDBError(Errors.DataNotFound, key);
    if (!Array.isArray(this.get(key)))
      throw new BelinDBError(Errors.DataNotAnArray);

    const array: Array<T> = this.get<Array<T>>(key);

    return array[Math.floor(Math.random() * array.length)];
  }

  /**
   * Get the size of an array
   *
   * @param key - The key
   */
  size<T = unknown>(key: string): number {
    if (!key) throw new BelinDBError(Errors.InvalidKey);
    if (!this.has(key)) throw new BelinDBError(Errors.DataNotFound, key);
    if (!Array.isArray(this.get(key)))
      throw new BelinDBError(Errors.DataNotAnArray);

    return this.get<Array<T>>(key).length;
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

    this.set<number, number>(key, this.get<number>(key) + number);

    return this.get<number>(key);
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

    this.set<number, number>(
      key,
      this.belowZero
        ? this.get<number>(key) - number
        : this.get<number>(key) - number <= 1
        ? 1
        : this.get<number>(key) - number
    );

    return this.get<number>(key);
  }
}
