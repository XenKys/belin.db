# belin.db

An NPM package for creating a local JSON-based database

## Getting started

- Install the package

```
npm install belin.db
```

- Import the installed package

```js
const Database = require("belin.db");
```

- Init the database

```js
const db = new Database({
  path: "./database.json", // The file path for the JSON file to save the data
  separator: ".", // The separator symbol that you will use to split the data
  belowZero: false, // If the numbers on the saved data can go below 0
});
```

## Database options

| **Key**   | **Value type** | **Description**                                          | **Default value**     | **Optional?** |
| --------- | -------------- | -------------------------------------------------------- | --------------------- | ------------- |
| path      | _String_       | The file path for the JSON file to save the data         | _**./database.json**_ | Yes           |
| separator | _String_       | The separator symbol that you will use to split the data | _**.**_               | Yes           |
| belowZero | _Boolean_      | If the numbers on the saved data can go below 0          | _**false**_           | Yes           |

## All Methods

##### set(key, value)

Set a key and a value

##### get(key)

Get a key with its values

##### delete(key)

Delete the key with its values

##### has(key)

Check if has the key

##### all()

Get all the keys with them values

##### clear()

Delete all keys with them values

##### replace(path)

Replace the saved data in the file with the data from another file

##### push(key, element)

Add an element to the key

##### pull(key, element)

Remove an element from the key

##### add(key, number)

Add a number to the key

##### remove(key, number)

Remove a number from the key

### Example

```js
const Database = require("belin.db");
const db = new Database({
  fileName: "./test/data.json",
  separator: "_",
  belowZero: true,
});

db.set("a_b_c", "value"); // { "a": { "b": { "c": "value" }}}
db.get("a"); // { "b": { "c": "value" }}
db.delete("a_b_c"); // { "a": { "b": {}}}
db.has("a_b_c"); // true
db.all(); // { "a": { "b": { "c": "value" }}}
db.clear(); // {}
db.replace("./file.json"); // {}
db.push("a_b", "element"); // { "a": { "b": ["element"] }}
db.unpush("a_b", "element"); // { "a": { "b": [] }}
db.add("a_c", 4); // { "a": { "b": [] }, { "c": 4 }}
db.remove("a_c", 2); // { "a": { "b": [] }, { "c": 2 }}
```
