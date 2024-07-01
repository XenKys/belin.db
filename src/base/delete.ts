export function del(
  data: Record<string, any>,
  path: string,
  separator: string
) {
  if (path.includes(separator)) {
    const elements = path.split(separator);
    const key = elements.pop();
    const object = elements.reduce((a, b) => {
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
