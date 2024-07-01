export class BelinDBError extends Error {
  override name: string = "BelinDBError";

  constructor(error: Errors, key?: string) {
    let message: string = error;

    if (key) message.replace(/{key}/g, key);

    super(`[belin.db] ${error}`);
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
