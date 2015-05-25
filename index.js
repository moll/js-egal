var kindof = require("kindof")

module.exports = function egal(a, b) {
  if (a === b) return true

  var type
  switch (type = kindof(a)) {
    case "date":
      if (type != kindof(b)) return false
      return a.valueOf() === b.valueOf()

    case "regexp":
      if (type != kindof(b)) return false
      return a.toString() === b.toString()

    case "object":
      if (type != kindof(b)) return false

      var constructor = getConstructorOf(a)
      if (constructor === Object) return false
      if (constructor !== getConstructorOf(b)) return false
      if (hasValueOf(a) && hasValueOf(b)) return a.valueOf() === b.valueOf()
      return false
  }

  return false
}

function getConstructorOf(obj) {
  var prototype = Object.getPrototypeOf(obj)
  return prototype == null ? null : prototype.constructor
}

function hasValueOf(obj) {
  var valueOf = obj.valueOf
  return typeof valueOf == "function" && valueOf !== Object.prototype.valueOf
}
