"use strict"

// curry, curryr

function curry (func) {
  return function(a) {
    return function(b) {
      return func(a, b);
    }
  }
}
module.exports.curry = curry;

function curryr (func) {
  return function(a) {
    return function(b) {
      return func(b, a);
    }
  }
}
module.exports.curryr = curryr


// isTrue, isFalse

const isTrue = obj => !isFalse(obj)
module.exports.isTrue = isTrue;

const isFalse = obj => !obj;
module.exports.isFalse = isFalse;


// isIn, each, isSameList

function isIn(list, value) {
  if (isFalse(list)) return false;
  let result = false;
  each(list, a => { if (a == value) result = true; });
  return result;
}
module.exports.isIn = isIn;

const each = (list, func) => {
  if (isFalse(list)) return;
  if (list.hasOwnProperty("length")) {
    for (let i=0; i < list.length; i++) {
      func(list[i]);
    }
  } else {
    for (var key in list) func(list[key]);
  }
}
module.exports.each = each;

function isSameList(left, right) {
  const length = left.length;
  if (length != right.length) return false;
  for (let i = 0; i < length; i++) {
    if (left[i] != right[i])
      return false;
  }
  return true;
}
module.exports.isSameList = isSameList;


// getKeys, hasKey

function hasKey(obj, key) {
  if (isFalse(obj)) return false;
  return isIn(getKeys(obj), key);
}
module.exports.hasKey = hasKey;

function getKeys(obj) {
  if (isFalse(obj)) return [];

  let keys = []
  for (var key in obj) {
    keys.push(key);
  }
  return keys;
}
module.exports.getKeys = getKeys;


// get

function get(obj, key) {
  if (arguments.length == 1) return curryr(get)(obj);
  if (isFalse(obj)) return undefined;
  if (hasKey(obj, key))
    return obj[key];
  return undefined;
}
module.exports.get = get;


//////// Complete Test

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

function at(list, index) {
  if (isFalse(list)) return undefined;
  if (get(list,"length") >= index) return undefined;
  return list[index];
}
module.exports.at = at;
