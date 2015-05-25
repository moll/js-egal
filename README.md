Egal.js
=======
[![NPM version][npm-badge]](https://www.npmjs.com/package/egal)
[![Build status][travis-badge]](https://travis-ci.org/moll/js-egal)

Egal.js provides a single `egal` function that tests **strict equality** (`===`)
and supports both built-in and custom **value objects** like `Date` and `RegExp`
in a **type-safe** way. It also supports comparing **boxed value objects** like
`new Number(42)` with **primitives** like `42`.

### Tour
When and why to use `egal` over the triple-equals `===` operator?

- When you need to compare the **semantic equivalence** of objects without
  requiring the same object identity.  
  JavaScript's `===` considers two different `Date` or `RegExp` objects unequal,
  even if they mean the same thing.
- When you need to **compare both primitives** (`42`) and **objects** (`new
  Number(42)`) the same way for robustness.  
  Did you know `new Number(42) == new Number(42)` in plain JavaScript is false?
- When you need to **compare custom value objects** in a type-safe way.  
  Value objects are objects that have a [`valueOf`][valueof] function. Egal.js
  makes sure the two objects with `valueOf` are actually from the same
  constructor.

**Non-value objects**, like `Array` or `Object`, are compared as `===` does it
— based on object identity. Egal.js is not a recursive or *deep equals* library,
but simply a strict equals comparison that supports value objects. For testing
arrays, you can use `Array.prototype.every`.

**NaN**s (not-a-number) are **not equal** (matching how `===` behaves). This is
because when you compare results of two mathematical operations that may both
end up as `NaN`, you might inadvertently assume the calculations went fine. If
you expect `NaN`, you can use JavaScript's built-in `isNaN` to test for that.

**Negative and positive** zeros are **equal** (also matching how `===` behaves).
You might end up with unexpected negative zeros via various calculations and
when you don't need to distinguish between the two, you'll end up with too many
false negatives. If you need to handle negative zeros differently, see the
article on [Sameness in JavaScript][sameness].

[npm-badge]: https://img.shields.io/npm/v/egal.svg
[travis-badge]: https://travis-ci.org/moll/js-egal.png?branch=master
[valueof]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/valueOf
[sameness]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Sameness


Installing
----------
### Installing on Node.js
```
npm install egal
```

### Installing for the browser
Egal.js doesn't yet have a build ready for the browser, but you might be able to
use [Browserify][browserify] to have it run there till then.

[browserify]: https://github.com/substack/node-browserify


Using
-----
Require Egal.js:
```javascript
var egal = require("egal")
```

Then proceed with comparions:
```javascript
egal(42, 42) // => true
egal(new String("Hello!"), "Hello") // => true
egal(new Date(2000, 5, 18), new Date(2000, 5, 18)) // => true
egal(/abc/i, /abc/i) // => true
```

To make and compare custom value objects, create a new constructor and give its
prototype a `valueOf` function:
```javascript
function Song(name) { this.name = name }
Song.prototype.valueOf = function() { return this.name }
egal(new Song("Play Guitar"), new Song("Play Guitar")) // => true
egal(new Song("Play Guitar"), new Song("Crumblin' Down")) // => false
```

Egal.js makes sure the two instances are from the same constructor before
comparing their `valueOf` outputs:
```javascript
function Car(name) { this.name = name }
OtherValue.prototype.valueOf = function() { return this.name }
egal(new Song("KITT"), new Car("KITT")) // => false
```


License
-------
Egal.js is released under a *Lesser GNU Affero General Public License*, which in
summary means:

- You **can** use this program for **no cost**.
- You **can** use this program for **both personal and commercial reasons**.
- You **do not have to share your own program's code** which uses this program.
- You **have to share modifications** (e.g bug-fixes) you've made to this
  program.

For more convoluted language, see the `LICENSE` file.


About
-----
**[Andri Möll](http://themoll.com)** typed this and the code.  
[Monday Calendar](https://mondayapp.com) supported the engineering work.

If you find Egal.js needs improving, please don't hesitate to type to me now
at [andri@dot.ee][email] or [create an issue online][issues].

[email]: mailto:andri@dot.ee
[issues]: https://github.com/moll/js-egal/issues
