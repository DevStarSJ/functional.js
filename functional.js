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

const isArray = a => a.hasOwnProperty("length");

const each = (list, func) => {
  if (isFalse(list)) return;
  if (isArray(list)) {
    for (let i=0; i < list.length; i++) {
      func(list[i]);
    }
  } else {
    for (let key in list) func(list[key]);
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
  for (let key in obj) {
    keys.push(key);
  }
  return keys;
}
module.exports.getKeys = getKeys;


// get

function get(obj, key) {
  if (arguments.length == 1) return curryr(get)(obj);
  if (isFalse(obj)) return undefined;
  if (isArray(obj)) { // key == length
    if (obj.length <= key) return undefined; // out of range
    return obj[key];
  } else if (hasKey(obj, key)) return obj[key];
  return undefined;
}
module.exports.get = get;


// map, reduce

function map(list, func) {
  if (isFalse(list)) return [];
  if (arguments.length == 1) return curryr(map)(list);
  let result = [];
  each(list, a => result.push(func(a)));
  return result;
}
module.exports.map = map;

function reduce(list, func, base) {
  if (isFalse(list)) return base;
  let start = 0;
  let result = base;

  if (isFalse(base)) {
    start = 1;
    result = get(list,0);
  }

  for (let i = start; i < list.length; i++) {
    result = func(result, get(list,i));
  }

  return result;
}
module.exports.reduce = reduce;


// pipe

function pipe() {
  const func_list = arguments;
  return function(arg) {
    return reduce(func_list, (acc, fn) => fn(acc), arg);
  }
}
module.exports.pipe = pipe;

// filter, reject

function filter(list, pred) {
  if (isFalse(list)) return [];
  if (arguments.length == 1) return curryr(filter)(list);
  let result = [];
  each(list, a => { if (pred(a)) result.push(a) });
  return result;
}
module.exports.filter = filter;

function reject(list, pred) {
  if (isFalse(list)) return [];
  pred = arguments.length == 1 ? list : pred;
  pred = pipe(pred, isFalse);
  if (arguments.length == 1)  return curryr(filter)(pred);
  return filter(list, pred);
}
module.exports.reject = reject;


// slice

function slice(list, start, end) {
  if (isFalse(list)) return [];
  const length = list.length;
  if (isFalse(length)) return [];
  let result = [];
  if (isFalse(end)) end = length;
  if (isFalse(start)) start = 0;
  for (let i = 0; i < end; i++) {
    if (start <= i && i < end) {
      result.push(list[i]);
    }
  }
  return result;
}
module.exports.slice = slice;