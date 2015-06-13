var wrap = require("lodash.wrap")

describe("egal", function() {
  var egal = wrap(require(".."), function(orig, a, b) {
    var equal = orig(a, b)
    orig(b, a).must.equal(equal)
    return equal
  })

  require("./_null_test")(egal)
  require("./_boolean_test")(egal)
  require("./_number_test")(egal)
  require("./_string_test")(egal)
  require("./_symbol_test")(egal)
  require("./_regexp_test")(egal)
  require("./_date_test")(egal)
  require("./_function_test")(egal)
  require("./_value_object_test")(egal)

  it("must return false given an empty array and empty object", function() {
    // There was once an assertion library that considered {} equivalent to []
    // for months! This will *never* happen under my watch!
    egal({}, []).must.be.false()
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

    it("must return false given null inherited object", function() {
      var a = Object.create(null)
      var b = Object.create(null)
      egal(a, b).must.be.false()
    })

    it("must return false given instance and plain object", function() {
      function Model() {}
      egal(new Model, {}).must.be.false()
    })
  })
})
