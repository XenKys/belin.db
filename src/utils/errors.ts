export class BelinDBError extends Error {
  override name: string = "BelinDBError";

  constructor(error: Errors, key?: string) {
    super(`[belin.db] ${error.replace(/{key}/g, key)}`);
  }
}

export enum Errors {
  InvalidKey = "Invalid key",
  InvalidValue = "Invalue value",
  InvalidPath = "Invalid path",
  DataNotFound = "'{key}' not found in the data",
  DataNotANumber = "'{key}' isn't a number",
  DataNotAnArray = "'{key}' isn't an array",
}
