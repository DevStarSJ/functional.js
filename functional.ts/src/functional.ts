// https://github.com/DevStarSJ/functional.js

export function curry (func) {
    return function(a) {
        return function(b) {
            return func(a, b);
        }
    }
}

export function curryr (func) {
    return function(a) {
        return function(b) {
            return func(b, a);
        }
    }
}

export const isFalse = obj => !obj;
export const isTrue = obj => !isFalse(obj)


export function isIn(list, value) {
    if (isFalse(list)) return false;
    let result = false;
    each(list, a => { if (a == value) result = true; });
    return result;
}

export const isArray = a => a.hasOwnProperty("length");

export const each = (list, func) => {
    if (isFalse(list)) return;
    if (isArray(list)) {
        for (let i=0; i < list.length; i++) {
            func(list[i]);
        }
    } else {
        for (let key in list) func(list[key]);
    }
}

export function isSameList(left, right) {
    const length = left.length;
    if (length != right.length) return false;
    for (let i = 0; i < length; i++) {
        if (left[i] != right[i])
            return false;
    }
    return true;
}

export function hasKey(obj, key) {
    if (isFalse(obj)) return false;
    return isIn(getKeys(obj), key);
}

export function getKeys(obj) {
    if (isFalse(obj)) return [];

    let keys = []
    for (let key in obj) {
        keys.push(key);
    }
    return keys;
}

export function get(obj, key) {
    if (arguments.length == 1) return curryr(get)(obj);
    if (isFalse(obj)) return undefined;
    if (isArray(obj)) { // key == length
        if (obj.length <= key) return undefined; // out of range
        return obj[key];
    } else if (hasKey(obj, key)) return obj[key];
    return undefined;
}

export function map(list, func) {
    if (isFalse(list)) return [];
    if (arguments.length == 1) return curryr(map)(list);
    let result = [];
    each(list, a => result.push(func(a)));
    return result;
}

export function reduce(list, func, base) {
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

export function pipe(...args: any[]) {
    const func_list =
        arguments.length == 1 && get(arguments,0).hasOwnProperty("length") ?
            arguments[0] :
            arguments;
    return function(arg) {
        return reduce(func_list, (acc, fn) => fn(acc), arg);
    }
}

export function filter(list, pred) {
    if (isFalse(list)) return [];
    if (arguments.length == 1) return curryr(filter)(list);
    let result = [];
    each(list, a => { if (pred(a)) result.push(a) });
    return result;
}

export function reject(list, pred) {
    if (isFalse(list)) return [];
    pred = arguments.length == 1 ? list : pred;
    pred = pipe(pred, isFalse);
    if (arguments.length == 1)  return curryr(filter)(pred);
    return filter(list, pred);
}

export function slice(list, start, end?) {
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

export function go(...args: any[]) {
    if (arguments.length < 2) return undefined;
    const data = get(arguments, 0);
    const funcs = slice(arguments, 1);
    return pipe(funcs)(data);
}

export function random() {
    return Math.random();
}

export function randomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(random() * (max - min + 1)) + min;
}

export function sample(list) {
    if (isFalse(list) || !isArray(list)) return undefined;
    const length = list.length;
    const index = randomInt(0, length);
    return get(list, index);
}

export async function async_go(data: any, ...args: any[]): Promise<any> {

    console.info("in async_go : ", args);
    let acc: any = data;
    console.info("before foreach : ", acc);
    for (let i = 0; i < args.length; i++) {
        acc = await args[i](acc);
        console.info("in foreach: ", acc);

    }
    console.info("after foreach : ", acc);
    return acc;
}