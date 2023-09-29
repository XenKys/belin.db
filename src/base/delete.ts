export function del(
  data: Record<string, any>,
  path: string,
  separator: string
) {
  if (path.includes(separator)) {
    let elements = path.split(separator),
      key = elements.pop(),
      object = elements.reduce((a, b) => {
        if (typeof a[b] === "undefined") a[b] = {};

        return a[b];
      }, data);

    delete object[key];

    return data;
  } else {
    delete data[path];

    return data;
  }
}
