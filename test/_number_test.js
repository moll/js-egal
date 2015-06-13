module.exports = function(egal) {
  // Allow using Number as constructor:
  /* jshint -W053 */

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
      })

      it("must return true given equivalent objects", function() {
        egal(new Number(Infinity), new Number(Infinity)).must.be.true()
        egal(new Number(-Infinity), new Number(-Infinity)).must.be.true()
      })

      it("must return false given unequivalent objects", function() {
        egal(new Number(Infinity), new Number(-Infinity)).must.be.false()
      })

      it("must return false given equivalent primitive and object", function() {
        egal(Infinity, new Number(Infinity)).must.be.false()
        egal(new Number(-Infinity), -Infinity).must.be.false()
      })
    })
  })
}