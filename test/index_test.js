var egal = require("..")

describe("egal", function() {
  // Allow using Boolean, Number, String as constructors in tests.
  /* jshint -W053 */

  it("must return true given nulls", function() {
    egal(null, null).must.be.true()
  })

  it("must return true given undefineds", function() {
    egal(undefined, undefined).must.be.true()
  })

  it("must return false given null and undefined", function() {
    egal(null, undefined).must.be.false()
    egal(undefined, null).must.be.false()
  })

  it("must return false given an empty array and empty object", function() {
    // There was once an assertion library that considered {} equivalent to []
    // for months! This will *never* happen under my watch!
    egal({}, []).must.be.false()
  })

  describe("given Boolean", function() {
    it("must return true given equivalent primitives", function() {
      egal(true, true).must.be.true()
      egal(false, false).must.be.true()
    })

    it("must return false given unequivalent primitives", function() {
      egal(true, false).must.be.false()
      egal(false, true).must.be.false()
    })

    it("must return true given equivalent objects", function() {
      egal(new Boolean(true), new Boolean(true)).must.be.true()
      egal(new Boolean(false), new Boolean(false)).must.be.true()
    })

    it("must return false given unequivalent objects", function() {
      egal(new Boolean(true), new Boolean(false)).must.be.false()
      egal(new Boolean(false), new Boolean(true)).must.be.false()
    })

    it("must return false given equivalent primitive and object", function() {
      egal(true, new Boolean(true)).must.be.false()
      egal(new Boolean(true), true).must.be.false()
      egal(false, new Boolean(false)).must.be.false()
      egal(new Boolean(false), false).must.be.false()
    })
  })

  describe("given Number", function() {
    it("must return true given equivalent primitives", function() {
      egal(42, 42).must.be.true()
    })

    it("must return false given unequivalent primitives", function() {
      egal(42, 69).must.be.false()
    })

    it("must return false given string", function() {
      egal(42, "69").must.be.false()
    })

    it("must return true given equivalent objects", function() {
      egal(new Number(42), new Number(42)).must.be.true()
    })

    it("must return false given unequivalent objects", function() {
      egal(new Number(42), new Number(69)).must.be.false()
    })

    it("must return false given equivalent primitive and object", function() {
      egal(42, new Number(42)).must.be.false()
      egal(new Number(42), 42).must.be.false()
    })

    describe("given -0", function() {
      it("must return true given equivalent primitives", function() {
        egal(-0, +0).must.be.true()
      })

      it("must return true given equivalent objects", function() {
        egal(new Number(-0), new Number(+0)).must.be.true()
      })
    })

    describe("given NaN", function() {
      it("must return false given primitives", function() {
        egal(NaN, NaN).must.be.false()
      })

      it("must return false given objects", function() {
        egal(new Number(NaN), new Number(NaN)).must.be.false()
      })
    })

    describe("given Infinity", function() {
      it("must return true given equivalent primitivies", function() {
        egal(Infinity, Infinity).must.be.true()
        egal(-Infinity, -Infinity).must.be.true()
      })

      it("must return false unequivalent primitives", function() {
        egal(Infinity, -Infinity).must.be.false()
        egal(-Infinity, Infinity).must.be.false()
      })

      it("must return true given equivalent objects", function() {
        egal(new Number(Infinity), new Number(Infinity)).must.be.true()
        egal(new Number(-Infinity), new Number(-Infinity)).must.be.true()
      })

      it("must return false given unequivalent objects", function() {
        egal(new Number(Infinity), new Number(-Infinity)).must.be.false()
        egal(new Number(-Infinity), new Number(Infinity)).must.be.false()
      })

      it("must return false given equivalent primitive and object", function() {
        egal(Infinity, new Number(Infinity)).must.be.false()
        egal(new Number(Infinity), Infinity).must.be.false()
        egal(new Number(-Infinity), -Infinity).must.be.false()
        egal(-Infinity, new Number(-Infinity)).must.be.false()
      })
    })
  })

  describe("given String", function() {
    it("must return true given equivalent primitives", function() {
      egal("ok", "ok").must.be.true()
    })

    it("must return false given unequivalent primitives", function() {
      egal("ok", "no").must.be.false()
    })

    it("must return true given equivalent objects", function() {
      egal(new String("ok"), new String("ok")).must.be.true()
    })

    it("must return false given unequivalent objects", function() {
      egal(new String("ok"), new String("no")).must.be.false()
    })

    it("must return false given equivalent primitive and object", function() {
      egal("ok", new String("ok")).must.be.false()
      egal(new String("ok"), "ok").must.be.false()
    })

    it("must return false given number", function() {
      egal("42", 42).must.be.false()
    })
  })

  if (typeof Symbol != "undefined")
  describe("given Symbol", function() {
    it("must return true given the same symbol", function() {
      var symbol = Symbol()
      egal(symbol, symbol).must.be.true()
    })

    it("must return false given two anonymous symbols", function() {
      egal(Symbol(), Symbol()).must.be.false()
    })

    it("must return false given two named symbols", function() {
      egal(Symbol("iterator"), Symbol("iterator")).must.be.false()
    })
  })

  describe("given RegExp", function() {
    it("must return true given equivalent primitives", function() {
      egal(/a/, /a/).must.be.true()
    })

    it("must return false given unequivalent primitives", function() {
      egal(/a/, /b/).must.be.false()
    })

    it("must return false if given unequivalent flags", function() {
      egal(/a/ig, /a/i).must.be.false()
    })

    it("must return false given RegExp and string", function() {
      egal(/a/, "/a/").must.be.false()
    })
  })

  describe("given Date", function() {
    it("must return true given equivalent dates", function() {
      egal(new Date(2000, 5), new Date(2000, 5)).must.be.true()
    })

    it("must return false given unequivalent dates", function() {
      egal(new Date(2000, 5), new Date(1999, 5)).must.be.false()
    })

    it("must return false given date and number", function() {
      egal(new Date(1337), 1337).must.be.false()
    })
  })

  describe("given Array", function() {
    it("must return true given same array", function() {
      var array = []
      egal(array, array).must.be.true()
    })

    it("must return false given empty arrays", function() {
      egal([], []).must.be.false()
    })

    it("must return false given equivalent arrays", function() {
      egal([1], [1]).must.be.false()
    })
  })

  describe("given Function", function() {
    it("must return true given identical functions", function() {
      function fn() {}
      egal(fn, fn).must.be.true()
    })

    it("must return false given equivalent functions", function() {
      egal(function() {}, function() {}).must.be.false()
    })
  })

  describe("given Object", function() {
    it("must return true given same object", function() {
      var object = {}
      egal(object, object).must.be.true()
    })

    it("must return false given empty objects", function() {
      egal({}, {}).must.be.false()
    })

    it("must return false given equivalent objects", function() {
      egal({a: 1}, {a: 1}).must.be.false()
    })

    describe("with valueOf", function() {
      it("must return true given equal value", function() {
        function Value(value) { this.value = value }
        Value.prototype.valueOf = function() { return this.value }
        var a = new Value(42)
        var b = new Value(42)
        egal(a, b).must.be.true()
      })

      it("must return false given plain object", function() {
        var a = {valueOf: function() { return 1 }}
        var b = {valueOf: function() { return 1 }}
        egal(a, b).must.be.false()
      })

      it("must return false given null inherited object", function() {
        var a = Object.create(null)
        var b = Object.create(null)
        egal(a, b).must.be.false()
      })

      it("must return false given different constructors", function() {
        function Value(value) { this.value = value }
        Value.prototype.valueOf = function() { return this.value }
        function Price(value) { this.value = value }
        Price.prototype.valueOf = function() { return this.value }

        var a = new Value(42)
        var b = new Price(42)
        egal(a, b).must.be.false()
      })

      it("must return false given subclassed constructor", function() {
        function Value(value) { this.value = value }
        Value.prototype.valueOf = function() { return this.value }

        function MoreValue(value) { this.value = value }
        MoreValue.prototype = Object.create(Value.prototype, {
          constructor: {value: MoreValue, configurable: 1, writable: 1}
        })

        var a = new Value(42)
        var b = new MoreValue(42)
        egal(a, b).must.be.false()
      })

      it("must return false given differently typed values", function() {
        function Value(value) { this.value = value }
        Value.prototype.valueOf = function() { return this.value }
        var a = new Value(42)
        var b = new Value("42")
        egal(a, b).must.be.false()
        egal(b, a).must.be.false()
      })

      it("must return false given non-function valueOfs", function() {
        function Value(value) { this.value = value }
        Value.prototype.valueOf = 42
        var a = new Value(42)
        var b = new Value(42)
        egal(a, b).must.be.false()
      })

      it("must return false given default Object.prototype.valueOf",
        function() {
        function Value(value) { this.value = value }
        var a = new Value(42)
        var b = new Value(42)
        egal(a, b).must.be.false()
      })
    })
  })
})
