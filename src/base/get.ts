export function get(data: any, path: any, separator: string = ".") {
  if (path.includes(separator)) {
    let elements = path.split(separator),
      key = elements.pop(),
      object = elements.reduce((a: any, b: any) => {
        if (typeof a[b] === "undefined") a[b] = {};

        return a[b];
      }, data);

    return object[key];
  } else {
    return data[path];
  }
}
