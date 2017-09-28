// https://github.com/DevStarSJ/functional.js

export function curry (func) {
    return function(...a) {
        return function(...b) {
            return func(...a, ...b);
        }
    }
}

export function curryr (func) {
    return function(...a) {
        return function(...b) {
            return func(...b, ...a);
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

type stringOrNumber = string | number;

export function get(obj: any, key: number | string | stringOrNumber [] , defaultValue = undefined): any {
    if (isFalse(obj)) return defaultValue;

    let keys: stringOrNumber[] = [];
    if (typeof key === "string") {
        keys = key.split(".")
            .map(k => parseInt(k) >= 0 ? parseInt(k) : k.trim())
            .filter(k => typeof k === "number" || (typeof k === "string" && k.length > 0));
    } else if (typeof key === "number") {
        keys.push(key);
    } else {
        keys = key;
    }

    if (keys.length === 0) {
        return obj;
    }

    const travelingNode = isArray(obj) ?
        (typeof keys[0] === "number" && obj.length > keys[0] ? obj[keys[0]] : defaultValue) :
        obj[keys[0]] || defaultValue;

    return keys.length === 1 ? travelingNode :
        get(travelingNode, keys.slice(1), defaultValue);
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


export async function goAsync(data: any, ...args: any[]): Promise<any> {
    let acc: any = data;
    for (let i = 0; i < args.length; i++)
        acc = await args[i](acc);
    return acc;
}


export function isInteger(s) {
    const n = Number(s);
    return n === +n && n === (n|0);
}


export function toBoolean(value: string | boolean | number): boolean {
    return value === true || value === "true" || value > 0 ? true : false;
}


export function isNullOrEmpty(word) {
    return word === undefined || word === null || word === '' ? true : false;
}


export function nvl(value, defaultValue = null, func = null) {
    return isNullOrEmpty(value) ? defaultValue : func ? func(value) : value;
}


export function distinct(list: any[]) : any[] {
    return list ? list.filter((v, i, self) => self.indexOf(v) == i) : [];
}
