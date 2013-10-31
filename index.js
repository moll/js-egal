var kindof = require("kindof")

module.exports = function egal(a, b) {
  if (a === b) return true
  
  var type = kindof(a)
  if (type != kindof(b)) return false

  switch (type) {
    case "boolean":
    case "number":
    case "string":
    case "date":
      return a.valueOf() === b.valueOf()

    case "regexp":
      return a.toString() === b.toString()

    case "object":
      var constructor = getConstructorOf(a)
      if (constructor === Object) return false
      if (constructor !== getConstructorOf(b)) return false
      if (getValueOf(a) && getValueOf(b)) return a.valueOf() === b.valueOf()
      return false
  }

  return false
}

function getConstructorOf(obj) {
  var prototype = obj && Object.getPrototypeOf(obj)
  return prototype && prototype.constructor
}

function getValueOf(obj) {
  var valueOf = typeof obj.valueOf == "function" && obj.valueOf
  return valueOf && valueOf !== Object.prototype.valueOf ? valueOf : null
}
