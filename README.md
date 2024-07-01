# belin.db

A module for creating a local JSON-based database

## Installation

```
npm install belin.db
```

#### Example

```js
const { Database } = require("belin.db");
const db = new Database("./data.json", {
  belowZero: true,
});

db.set("a.b.c", "value"); // { "a": { "b": { "c": "value" }}}
db.get("a"); // { "b": { "c": "value" }}
db.delete("a.b.c"); // { "a": { "b": {}}}
db.has("a.b.c"); // false
db.all(); // { "a": { "b": {}}}
db.clear(); // {}
```
