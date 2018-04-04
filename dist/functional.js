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
    return function (...a) {
        return function (...b) {
            return func(...a, ...b);
        };
    };
}
exports.curry = curry;
function curryr(func) {
    return function (...a) {
        return function (...b) {
            return func(...b, ...a);
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
function get(obj, key, defaultValue = undefined) {
    if (exports.isFalse(obj))
        return defaultValue;
    let keys = [];
    if (typeof key === "string") {
        keys = key.split(".")
            .map(k => parseInt(k) >= 0 ? parseInt(k) : k.trim())
            .filter(k => typeof k === "number" || (typeof k === "string" && k.length > 0));
    }
    else if (typeof key === "number") {
        keys.push(key);
    }
    else {
        keys = key;
    }
    if (keys.length === 0) {
        return obj;
    }
    const travelingNode = exports.isArray(obj) ?
        (typeof keys[0] === "number" && obj.length > keys[0] ? obj[keys[0]] : defaultValue) :
        obj[keys[0]] || defaultValue;
    return keys.length === 1 ? travelingNode :
        get(travelingNode, keys.slice(1), defaultValue);
}
exports.get = get;
function map(list, func) {
    if (arguments.length == 1)
        return curryr(map)(list); // curryr 내장
    if (exports.isFalse(list))
        return [];
    let result = [];
    exports.each(list, a => result.push(func(a)));
    return result;
}
exports.map = map;
function reduce(list, func, base) {
    if (arguments.length == 2)
        return curryr(reduce)(list, func); // curryr 내장
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
    if (arguments.length == 1)
        return curryr(filter)(list); // curryr 내장
    if (exports.isFalse(list))
        return [];
    let result = [];
    exports.each(list, a => { if (pred(a))
        result.push(a); });
    return result;
}
exports.filter = filter;
function reject(list, pred) {
    if (arguments.length == 1)
        return curryr(reject)(list); // curryr 내장
    if (exports.isFalse(list))
        return [];
    pred = arguments.length == 1 ? list : pred;
    pred = pipe(pred, exports.isFalse);
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
function goAsync(data, ...args) {
    return __awaiter(this, void 0, void 0, function* () {
        let acc = data;
        for (let i = 0; i < args.length; i++)
            acc = yield args[i](acc);
        return acc;
    });
}
exports.goAsync = goAsync;
function isInteger(s) {
    const n = Number(s);
    return n === +n && n === (n | 0);
}
exports.isInteger = isInteger;
function toBoolean(value) {
    return value === true || value === "true" || value > 0 ? true : false;
}
exports.toBoolean = toBoolean;
function isNullOrEmpty(word) {
    return word === undefined || word === null || word === '' ? true : false;
}
exports.isNullOrEmpty = isNullOrEmpty;
function nvl(value, defaultValue = null, func = null) {
    return isNullOrEmpty(value) ? defaultValue : func ? func(value) : value;
}
exports.nvl = nvl;
function distinct(list) {
    const result = [];
    list.forEach(one => {
        if (result.every(e => !deepEqual(e, one))) {
            result.push(one);
        }
    });
    return result;
}
exports.distinct = distinct;
function all(list, pred) {
    if (arguments.length == 1)
        return curryr(all)(list); // curryr 내장
    return exports.isArray(list) ? list.every(pred) : false;
}
exports.all = all;
function any(list, pred) {
    if (arguments.length == 1)
        return curryr(any)(list); // curryr 내장
    return exports.isArray(list) ? list.some(pred) : false;
}
exports.any = any;
function deepEqual(a, b) {
    const type = typeof a;
    if (type != typeof b)
        return false;
    if (type != "object")
        return a === b;
    const keysOfA = getKeys(a);
    const keysOfB = getKeys(b);
    if (keysOfA.length != keysOfB.length)
        return false;
    if (keysOfA.some(key => keysOfB.indexOf(key) < 0))
        return false;
    return keysOfA.every(key => deepEqual(a[key], b[key]));
}
exports.deepEqual = deepEqual;
function subObj(obj, keys) {
    if (arguments.length == 1)
        return curryr(subObj)(obj); // curryr 내장
    const data = {};
    keys.forEach(key => { data[key] = obj[key]; });
    return data;
}
exports.subObj = subObj;
function minusObjByKeys(obj, keys) {
    if (arguments.length == 1)
        return curryr(minusObjByKeys)(obj); // curryr 내장
    let data = Object.assign({}, obj);
    keys.forEach(key => { delete data[key]; });
    return data;
}
exports.minusObjByKeys = minusObjByKeys;
function getSubProprtties(group, list, label = "values") {
    if (arguments.length == 2)
        return curryr(getSubProprtties)(group, list); // curryr 내장
    const keys = getKeys(group);
    group[label] = go(list, filter(row => all(keys, key => group[key] == row[key])), map(minusObjByKeys(keys)));
    return group;
}
exports.getSubProprtties = getSubProprtties;
function groupBy(list, keys, label = "values") {
    if (arguments.length == 2)
        return curryr(groupBy)(list, keys); // curryr 내장
    return go(list, map(subObj(keys)), distinct, map(getSubProprtties(list, label)));
}
exports.groupBy = groupBy;
function head(list) {
    if (exports.isArray(list))
        return list.length > 0 ? list[0] : undefined;
    return list;
}
exports.head = head;
function hasSameKeys(left, right, keys) {
    if (!left)
        return false;
    if (!right)
        return false;
    for (const key of keys)
        if (!deepEqual(left[key], right[key]))
            return false;
    return true;
}
exports.hasSameKeys = hasSameKeys;
function leftJoin(lefts, rights, keys) {
    const compFunc1 = curryr(hasSameKeys)(keys);
    return lefts.map(left => {
        const compFunc2 = curry(compFunc1)(left);
        const right = head(rights.filter(right => compFunc2(right)));
        return Object.assign(left, right);
    });
}
exports.leftJoin = leftJoin;
