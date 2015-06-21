module.exports = function(egal) {
  describe("given Object with valueOf", function() {
    it("must return true given equal value", function() {
      function Value(value) { this.value = value }
      Value.prototype.valueOf = function() { return this.value }
      var a = new Value(42)
      var b = new Value(42)
      egal(a, b).must.be.true()
    })

    it("must return true given equal value but different valueOfs", function() {
      function Value(value) { this.value = value }
      var a = new Value(42); a.valueOf = function() { return this.value }
      var b = new Value(42); b.valueOf = function() { return this.value }
      egal(a, b).must.be.true()
    })

    it("must return false given plain object", function() {
      var a = {valueOf: function() { return 1 }}
      var b = {valueOf: function() { return 1 }}
      egal(a, b).must.be.false()
    })

    it("must return false given instance and plain object", function() {
      function Value(value) { this.value = value }
      Value.prototype.valueOf = function() { return this.value }

      var a = new Value(42)
      var b = {valueOf: function() { return 42 }}
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
        constructor: {value: MoreValue, configurable: true, writable: true}
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

    it("must return true given inherited and modified instances", function() {
      function Value(value) { this.value = value }
      Value.prototype.valueOf = function() { return this.value }

      var a = new Value(42); a.name = "John"
      var b = new Value(42); b.name = "Mike"
      egal(a, b).must.be.true()
    })

    it("must return false given overwritten constructor properties",
      function() {
      function A(value) { this.value = value }
      A.prototype.valueOf = function() { return this.value }

      function B(value) { this.value = value }
      B.prototype.valueOf = function() { return this.value }

      var a = new A(42)
      var b = new B(42)
      a.constructor = b.constructor = function() {}

      egal(a, b).must.be.false()
    })
  })
}
