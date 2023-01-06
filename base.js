module.exports = {
  set: function (data, path, value, separator = ".") {
    if (path.includes(separator)) {
      let elements = path.split(separator),
        key = elements.pop(),
        object = elements.reduce((a, b) => {
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
  },
  get: function (data, path, separator = ".") {
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
  },
  delete: function (data, path, separator = ".") {
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
  },
};
