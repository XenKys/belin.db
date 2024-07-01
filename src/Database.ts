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
  filter,
  find,
  map,
  random,
  some,
  sort,
  size,
} from "./methods";

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
   * Set the value of a key
   *
   * @param key - The key
   * @param value - The key's value
   */
  set(key: string, value: any): any {
    return set(this, key, value);
  }

  /**
   * Get the value of a key
   *
   * @param key - The key
   */
  get(key: string): any {
    return get(this, key);
  }

  /**
   * Delete a key
   *
   * @param key - The key
   */
  delete(key: string): void {
    del(this, key);
  }

  /**
   * Check if a key exists
   *
   * @param key - The key
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
   * @param key - The key
   * @param item - The item
   */
  push(key: string, item: any): Array<any> {
    return push(this, key, item);
  }

  /**
   * Pull an item from an array
   *
   * @param key - The key
   * @param item - The item
   */
  pull(key: string, item: any): Array<any> {
    return pull(this, key, item);
  }

  /**
   * Returns the elements of an array that meet the condition specified in a callback function
   *
   * @param key - The key
   */
  filter(
    key: string,
    predicate: (value: any, index: number, array: any[]) => boolean,
    thisArg?: any
  ): Array<any> {
    return filter(this, key, predicate, thisArg);
  }

  /**
   * Returns the value of the first element in the array where predicate is true, and undefined otherwise
   *
   * @param key - The key
   */
  find(
    key: string,
    predicate: (value: any, index: number, obj: Array<any>) => boolean,
    thisArg?: any
  ): any {
    return find(this, key, predicate, thisArg);
  }

  /**
   * Calls a defined callback function on each element of an array, and returns an array that contains the results
   *
   * @param key - The key
   */
  map(
    key: string,
    callbackfn: (value: any, index: number, array: Array<any>) => unknown,
    thisArg?: any
  ): Array<unknown> {
    return map(this, key, callbackfn, thisArg);
  }

  /**
   * Get an item of an array randomly
   *
   * @param key - The key
   */
  random(key: string): Array<any> {
    return random(this, key);
  }

  /**
   * Get the size of an array
   *
   * @param key - The key
   */
  size(key: string): number {
    return size(this, key);
  }

  /**
   * Determines whether the specified callback function returns true for any element of an array
   *
   * @param key - The key
   */
  some(
    key: string,
    predicate: (value: any, index: number, array: Array<any>) => unknown,
    thisArg?: any
  ): boolean {
    return some(this, key, predicate, thisArg);
  }

  /**
   * Sorts an array in place
   *
   * @param key - The key
   */
  sort(key: string, compareFn?: (a: any, b: any) => number): Array<any> {
    return sort(this, key, compareFn);
  }

  /**
   * Add a number to a key value
   *
   * @param key - The key
   * @param number - The number
   */
  add(key: string, number: number): number {
    return add(this, key, number);
  }

  /**
   * Remove a number from a key value
   *
   * @param key - The key
   * @param number - The number
   */
  remove(key: string, number: number): number {
    return remove(this, key, number);
  }
}
