export function get(data, path, separator: string = ".") {
  if (path.includes(separator)) {
    let elements = path.split(separator),
      key = elements.pop(),
      object = elements.reduce((a, b) => {
        if (typeof a[b] === "undefined") a[b] = {};

        return a[b];
      }, data);

    return object[key];
  } else {
    return data[path];
  }
}
