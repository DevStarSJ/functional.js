"use strict";
// https://github.com/DevStarSJ/functional.js
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
function curry(func) {
    return function (a) {
        return function (b) {
            return func(a, b);
        };
    };
}
exports.curry = curry;
function curryr(func) {
    return function (a) {
        return function (b) {
            return func(b, a);
        };
    };
}
exports.curryr = curryr;
exports.isFalse = obj => !obj;
exports.isTrue = obj => !exports.isFalse(obj);
function isIn(list, value) {
    if (exports.isFalse(list))
        return false;
    let result = false;
    exports.each(list, a => { if (a == value)
        result = true; });
    return result;
}
exports.isIn = isIn;
exports.isArray = a => a.hasOwnProperty("length");
exports.each = (list, func) => {
    if (exports.isFalse(list))
        return;
    if (exports.isArray(list)) {
        for (let i = 0; i < list.length; i++) {
            func(list[i]);
        }
    }
    else {
        for (let key in list)
            func(list[key]);
    }
};
function isSameList(left, right) {
    const length = left.length;
    if (length != right.length)
        return false;
    for (let i = 0; i < length; i++) {
        if (left[i] != right[i])
            return false;
    }
    return true;
}
exports.isSameList = isSameList;
function hasKey(obj, key) {
    if (exports.isFalse(obj))
        return false;
    return isIn(getKeys(obj), key);
}
exports.hasKey = hasKey;
function getKeys(obj) {
    if (exports.isFalse(obj))
        return [];
    let keys = [];
    for (let key in obj) {
        keys.push(key);
    }
    return keys;
}
exports.getKeys = getKeys;
function get(obj, key) {
    if (arguments.length == 1)
        return curryr(get)(obj);
    if (exports.isFalse(obj))
        return undefined;
    if (exports.isArray(obj)) {
        if (obj.length <= key)
            return undefined; // out of range
        return obj[key];
    }
    else if (hasKey(obj, key))
        return obj[key];
    return undefined;
}
exports.get = get;
function map(list, func) {
    if (exports.isFalse(list))
        return [];
    if (arguments.length == 1)
        return curryr(map)(list);
    let result = [];
    exports.each(list, a => result.push(func(a)));
    return result;
}
exports.map = map;
function reduce(list, func, base) {
    if (exports.isFalse(list))
        return base;
    let start = 0;
    let result = base;
    if (exports.isFalse(base)) {
        start = 1;
        result = get(list, 0);
    }
    for (let i = start; i < list.length; i++) {
        result = func(result, get(list, i));
    }
    return result;
}
exports.reduce = reduce;
function pipe(...args) {
    const func_list = arguments.length == 1 && get(arguments, 0).hasOwnProperty("length") ?
        arguments[0] :
        arguments;
    return function (arg) {
        return reduce(func_list, (acc, fn) => fn(acc), arg);
    };
}
exports.pipe = pipe;
function filter(list, pred) {
    if (exports.isFalse(list))
        return [];
    if (arguments.length == 1)
        return curryr(filter)(list);
    let result = [];
    exports.each(list, a => { if (pred(a))
        result.push(a); });
    return result;
}
exports.filter = filter;
function reject(list, pred) {
    if (exports.isFalse(list))
        return [];
    pred = arguments.length == 1 ? list : pred;
    pred = pipe(pred, exports.isFalse);
    if (arguments.length == 1)
        return curryr(filter)(pred);
    return filter(list, pred);
}
exports.reject = reject;
function slice(list, start, end) {
    if (exports.isFalse(list))
        return [];
    const length = list.length;
    if (exports.isFalse(length))
        return [];
    let result = [];
    if (exports.isFalse(end))
        end = length;
    if (exports.isFalse(start))
        start = 0;
    for (let i = 0; i < end; i++) {
        if (start <= i && i < end) {
            result.push(list[i]);
        }
    }
    return result;
}
exports.slice = slice;
function go(...args) {
    if (arguments.length < 2)
        return undefined;
    const data = get(arguments, 0);
    const funcs = slice(arguments, 1);
    return pipe(funcs)(data);
}
exports.go = go;
function random() {
    return Math.random();
}
exports.random = random;
function randomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(random() * (max - min + 1)) + min;
}
exports.randomInt = randomInt;
function sample(list) {
    if (exports.isFalse(list) || !exports.isArray(list))
        return undefined;
    const length = list.length;
    const index = randomInt(0, length);
    return get(list, index);
}
exports.sample = sample;
function async_go(data, ...args) {
    return __awaiter(this, void 0, void 0, function* () {
        console.info("in async_go : ", args);
        let acc = data;
        console.info("before foreach : ", acc);
        for (let i = 0; i < args.length; i++) {
            acc = yield args[i](acc);
            console.info("in foreach: ", acc);
        }
        console.info("after foreach : ", acc);
        return acc;
    });
}
exports.async_go = async_go;
