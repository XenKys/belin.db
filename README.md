# belin.db

An NPM package for creating a local JSON-based database

## Getting started

- Install the package

```
npm install belin.db
```

- Import the installed package

```js
const { Database } = require("belin.db");
```

- Init the database

```js
const db = new Database(
  "./database.json", // The file path for the JSON file to save the data
  {
    separator: ".", // The separator symbol that you will use to split the data
    belowZero: false, // If the numbers on the saved data can go below 0
  }
);
```

## Database options

| **Key**   | **Value type** | **Description**                                          | **Default value** | **Optional?** |
| --------- | -------------- | -------------------------------------------------------- | ----------------- | ------------- |
| separator | _String_       | The separator symbol that you will use to split the data | _**.**_           | Yes           |
| belowZero | _Boolean_      | If the numbers on the saved data can go below 0          | _**false**_       | Yes           |

## All Methods

##### set(key, value)

Set the value of a key

##### get(key)

Get the value of a key

##### delete(key)

Delete a key

##### has(key)

Check if a key exists

##### all()

Get the JSON file

##### clear()

Delete all saved data

##### importFrom(path)

Import data from another JSON file

##### push(key, item)

Push an item into an array

##### pull(key, item)

Pull an item from an array

##### add(key, number)

Add a number to a key value

##### remove(key, number)

Remove a number from a key value

### Example

```js
const { Database } = require("belin.db");
const db = new Database("./database/test.json", {
  separator: "_",
  belowZero: true,
});

db.set("a_b_c", "value"); // { "a": { "b": { "c": "value" }}}
db.get("a"); // { "b": { "c": "value" }}
db.delete("a_b_c"); // { "a": { "b": {}}}
db.has("a_b_c"); // true
db.all(); // { "a": { "b": { "c": "value" }}}
db.clear(); // {}
db.importFrom("./file.json"); // {}
db.push("a_b", "item"); // { "a": { "b": ["item"] }}
db.pull("a_b", "item"); // { "a": { "b": [] }}
db.add("a_c", 4); // { "a": { "b": [] }, { "c": 4 }}
db.remove("a_c", 2); // { "a": { "b": [] }, { "c": 2 }}
```
