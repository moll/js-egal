## Unreleased
- Adds `deepEgal` for comparing plain objects and arrays recursively.  
  It's still type-safe, so value objects and instances of classes nested in
  plain objects as compared as `egal` — by value if possible (same constructor
  and has a `valueOf` function), by reference (`===`) otherwise.

  ```javascript
  var deepEgal = require("egal").deepEgal
  function Model(name) { this.name = name }

  deepEgal(42, 42) // => true
  deepEgal({name: "John"}, {name: "John"}) // => true
  deepEgal({stats: {age: 13}}, {{stats: age: 13}}) // => true
  deepEgal([1, 2, 3], [1, 2, 3]) // => true
  deepEgal(new Model("John"), new Model("John")) // => false
  deepEgal(new Date(2000, 5), new Date(2000, 5)) // => true
  ```

## 1.0.0 (May 25, 2015)
- No longer considers a primitive and boxed object of the same value to be
  equivalent.  
  Two boxed objects of the same value will remain equivalent.

  ```javascript
  egal(true, new Boolean(true)) // => false
  egal(new Boolean(true), new Boolean(true)) // => true
  ```

  Boxed objects tend to be *very* error prone and it's best you stick to
  primitives only. The following is a small example of problems with boxed
  objects:

  ```javascript
  new String("a") == new String("a") // => false
  new Boolean(true) == new Boolean(true) // => false
  Boolean(new Boolean(false)) // => true
  !!(new Boolean(false)) // => true
  ```

## 0.1.337 (Nov 1, 2013)
- First public release. Brotherhood awakes!
