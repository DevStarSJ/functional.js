"use strict"

function pipe() {
  const func_list = arguments;
  return function(arg) {
    return reduce(func_list, function(memo, fn) {
      return fn(memo);
    }, arg);
  }
}
module.exports.pipe = pipe;

function map(list, func) {
  if (isFalse(list)) return [];
  let result = [];
  for (let i = 0; i < list.length; i++) {
    result.push(func(at(list,i)));
  }
  return result;
}
module.exports.map = map;

function reduce(list, func, base) {
  if (isFalse(list)) return base;
  let start = 0;
  let result = base;

  if (isFalse(base)) {
    start = 1;
    result = at(list,0);
  }

  for (let i = start; i < list.length; i++) {
    result = func(result, at(list,i));
  }

  return result;
}
module.exports.reduce = reduce;

function curry (func) {
  return function(a) {
    return function(b) {
      return func(a,b);
    }
  }
}
module.exports.curry = curry;

function curryr (func) {
  return function(b) {
    return function(a) {
      return func(a,b);
    }
  }
}
module.exports.curryr = curryr

function at(list, index) {
  if (isFalse(list)) return undefined;
  if (get(list,"length") >= index) return undefined;
  return list[index];
}
module.exports.at = at;

function get(obj, key) {
  if (isFalse(obj)) return undefined;
  if (hasKey(obj, key))
    return obj[key];
  return undefined;
}
module.exports.get = get;

get = curryr(get)
const getSql = get("sql");

function hasKey(obj, key) {
  if (isFalse(obj)) return undefined;

  const keys = getKeys(obj);
  return isIn(keys, key);
}
module.exports.hasKey = hasKey;

function isIn(list, value) {
  if (isFalse(list)) return undefined;
  return list.indexOf(value) >= 0 ? true : false;
}
module.exports.isIn = isIn;

function getKeys(obj) {
  if (isFalse(obj)) return undefined;

  let keys = []
  for (var key in obj) {
    keys.push(key);
  }
  return keys;
}
module.exports.getKeys = getKeys;

function isTrue(obj) {
  return !isFalse(obj)
}
module.exports.isTrue = isTrue;

function isFalse(obj) {
  return !obj;
}
module.exports.isFalse = isFalse;

console.log(isFalse(undefined));