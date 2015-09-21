var kindof = require("kindof")
exports = module.exports = egal
exports.deepEgal = deepEgal

function egal(a, b) {
  if (a === b) return true

  var type
  switch (type = kindof(a)) {
    case "date":
      if (type !== kindof(b)) return false
      return a.valueOf() === b.valueOf()

    case "regexp":
      if (type !== kindof(b)) return false
      return a.toString() === b.toString()

    case "object":
      if (type !== kindof(b)) return false

      var constructor = getConstructorOf(a)
      if (constructor === Object) return false
      if (constructor !== getConstructorOf(b)) return false
      if (hasValueOf(a) && hasValueOf(b)) return a.valueOf() === b.valueOf()
      return false

    default: return false
  }
}

function deepEgal(a, b) {
  return deepEgalRecursively(a, b)
}

function deepEgalRecursively(a, b, aStack, bStack) {
  if (egal(a, b)) return true

  var type = kindofPlain(a)
  switch (type) {
    case "array":
    case "plain":
      if (type !== kindofPlain(b)) return false

      var aPos = aStack && aStack.indexOf(a)
      var bPos = bStack && bStack.indexOf(b)
      if (aPos !== bPos) return false
      if (aPos != null && aPos >= 0) return true

      aStack = aStack ? aStack.concat([a]) : [a]
      bStack = bStack ? bStack.concat([b]) : [b]
      break
  }

  var i
  switch (type) {
    case "array":
      if (a.length !== b.length) return false
      if (a.length === 0) return true

      for (i = 0; i < a.length; ++i)
        if (!deepEgalRecursively(a[i], b[i], aStack, bStack)) return false

      return true

    case "plain":
      var aKeys = keys(a)
      var bKeys = keys(b)
      if (aKeys.length !== bKeys.length) return false
      if (aKeys.length === 0) return true

      aKeys.sort()
      bKeys.sort()
      for (i = 0; i < aKeys.length; ++i) if (aKeys[i] !== bKeys[i]) return false

      for (var key in a)
        if (!deepEgalRecursively(a[key], b[key], aStack, bStack)) return false

      return true

    default: return false
  }
}

function getConstructorOf(obj) {
  var prototype = Object.getPrototypeOf(obj)
  return prototype == null ? null : prototype.constructor
}

function hasValueOf(obj) {
  var valueOf = obj.valueOf
  return typeof valueOf === "function" && valueOf !== Object.prototype.valueOf
}

function kindofPlain(obj) {
  if (isPlainObject(obj)) return "plain"
  return kindof(obj)
}

function isPlainObject(obj) {
  if (obj == null) return false
  if (typeof obj !== "object") return false
  if (Array.isArray(obj)) return false

  var prototype = Object.getPrototypeOf(obj)
  if (prototype === null) return true
  if (!("constructor" in prototype)) return true
  return prototype.constructor === Object
}

function keys(obj) {
  var all = []
  for (var key in obj) all.push(key)
  return all
}
