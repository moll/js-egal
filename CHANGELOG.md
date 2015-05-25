## Unreleased
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
