export function set(data: any, path: any, value: any, separator: string = ".") {
  if (path.includes(separator)) {
    let elements = path.split(separator),
      key = elements.pop(),
      object = elements.reduce((a: any, b: any) => {
        if (typeof a[b] === "undefined") a[b] = {};
        if (typeof a[b] !== "object") a[b] = {};

        return a[b];
      }, data);

    object[key] = value;

    return data;
  } else {
    data[path] = value;

    return data;
  }
}
