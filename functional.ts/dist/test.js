"use strict"

const assert = require("assert");

const _ = require("./functional");

const obj = { id: 1, name: "Luna", age: 23 };
const list = [ 1, 2, 3, 4 ];
const array_like = {0:1, 1:2, 2:3, length: 3};

const empty_list = [];
const list_for_array_like = [1, 2, 3];
const list_for_obj = [1, "Luna", 23];
const keys_for_obj = ["id", "name", "age"];
const list_odd = [2,4];
const list_even = [1, 3];


describe("isFalse()", function() {
  it('undefined -> true', function() {
    assert.equal(_.isFalse(undefined), true);
  });
  it('null -> true', function() {
    assert.equal(_.isFalse(null), true);
  });
  it('"" -> true', function() {
    assert.equal(_.isFalse(""), true);
  });
  it('object -> false', function() {
    assert.equal(_.isFalse(obj), false);
  });
  it('list -> false', function() {
    assert.equal(_.isFalse(list), false);
  });
  it('array_like -> false', function() {
    assert.equal(_.isFalse(array_like), false);
  });
});


describe("isTrue()", function() {
  it('undefined -> false', function() {
    assert.equal(_.isTrue(undefined), false);
  });
  it('null -> false', function() {
    assert.equal(_.isTrue(null), false);
  });
  it('"" -> false', function() {
    assert.equal(_.isTrue(""), false);
  });
  it('object -> true', function() {
    assert.equal(_.isTrue(obj), true);
  });
  it('list -> true', function() {
    assert.equal(_.isTrue(list), true);
  });
  it('array_like -> true', function() {
    assert.equal(_.isTrue(array_like), true);
  });
});


describe("each()", function() {
  it('undefined -> undefined', function() {
    assert.equal(_.each(undefined), undefined);
  });
  it('null -> undefined', function() {
    assert.equal(_.each(null), undefined);
  });
  it('"" -> undefined', function() {
    assert.equal(_.each(""), undefined);
  });
  it('object', function() {
    let result = [];
    _.each(obj, a => result.push(a));
    assert.equal(_.isSameList(result, list_for_obj), true);
  });
  it('list', function() {
    let result = [];
    _.each(list, a => result.push(a));
    assert.equal(_.isSameList(result, list), true);
  });
  it('array_like', function() {
    let result = [];
    _.each(array_like, a => result.push(a));
    assert.equal(_.isSameList(result, list_for_array_like), true);
  });
});


describe("isIn()", function() {
  it('undefined -> false', function() {
    assert.equal(_.isIn(undefined), false);
  });
  it('null -> false', function() {
    assert.equal(_.isIn(null), false);
  });
  it('"" -> false', function() {
    assert.equal(_.isIn(""), false);
  });
  it('value in object -> true', function() {
    assert.equal(_.isIn(obj, "Luna"), true);
  });
  it('value not in object -> false', function() {
    assert.equal(_.isIn(obj, "Luna1"), false);
  });
  it('value in list  -> true', function() {
    assert.equal(_.isIn(list, 4), true);
  });
  it('value not in list  -> false', function() {
    assert.equal(_.isIn(list, 0), false);
  });
  it('value in array_like -> true', function() {
    assert.equal(_.isIn(array_like, 3), true);
  });
  it('value not in array_like -> false', function() {
    assert.equal(_.isIn(array_like, 0), false);
  });
});


describe("getKeys()", function() {
  it('undefined -> []', function() {
    assert.equal(
      _.isSameList(
        _.getKeys(undefined), empty_list), true);
  });
  it('null -> []', function() {
    assert.equal(
      _.isSameList(
        _.getKeys(null), empty_list), true);
  });
  it('"" -> []', function() {
    assert.equal(
      _.isSameList(
        _.getKeys(""), empty_list), true);
  });
  it('object', function() {
    assert.equal(
      _.isSameList(
        _.getKeys(obj), keys_for_obj), true);
  });
});


describe("hasKey()", function() {
  it('undefined -> false', function() {
    assert.equal(_.hasKey(undefined), false);
  });
  it('null -> false', function() {
    assert.equal(_.hasKey(null), false);
  });
  it('"" -> false', function() {
    assert.equal(_.hasKey(""), false);
  });
  it('key in object -> true', function() {
    assert.equal(_.hasKey(obj, "id"), true);
  });
  it('key not in object -> false', function() {
    assert.equal(_.hasKey(obj, "id1"), false);
  });
});


describe("get()", function() {
  it('undefined -> undefined', function() {
    assert.equal(_.get(undefined, "id"), undefined);
  });
  it('null -> undefined', function() {
    assert.equal(_.get(null, "id"), undefined);
  });
  it('"" -> undefined', function() {
    assert.equal(_.get("", "id"), undefined);
  });
  it('key in object', function() {
    const id = _.get(obj, "id");
    assert.equal(_.get(obj, "id"), obj.id);
  });
  it('key not in object -> undefined', function() {
    assert.equal(_.get(obj, "id1"), undefined);
  });
  it('curryr test', function() {
    const getId = _.get("id");
    assert.equal(getId(obj), obj.id);
  });
  it('index in list', function() {
    assert.equal(_.get(list, 3), 4);
  });
  it('index not in list -> undefined', function() {
    assert.equal(_.get(list, 4), undefined);
  });
});


describe("map()", function() {
  it('map test', function() {
    assert.equal(
      _.isSameList(
        _.map(list, a => a*a),
        [1,4,9,16]), true);
  });
  it('curryr map test', function() {
    const square = _.map(a => a*a);
    assert.equal(
      _.isSameList(
        square(list),
        [1,4,9,16]), true);
  });
});


describe("reduce()", function() {
  it('reduce test', function() {
    assert.equal(_.reduce(list, (a,b) => a+b), 10);
  });
  it('reduce with default value test', function() {
    assert.equal(_.reduce(list, (a,b) => a+b, -10), 0);
  });
});


describe("pipe()", function() {
  it('pipe test', function () {
    const square = _.map(a => a * a);
    const get4 = _.get(3);
    const func = _.pipe(square, get4);
    assert.equal(func(list), 16);
  });
  it('pipe test : input list', function () {
    const square = _.map(a => a * a);
    const get4 = _.get(3);
    const func_list = [square, get4];
    const func = _.pipe(func_list);
    assert.equal(func(list), 16);
  });
});

describe("filter()", function() {
  it('filter test 1', function () {
    const odd = _.filter(list, a => a%2 == 0);
    assert.equal(_.isSameList(odd, list_odd), true);
  });
  it('filter test 2', function () {
    const odd = _.filter(list, a => a%2 == 1);
    assert.equal(_.isSameList(odd, list_even), true);
  });
  it('filter test 3', function () {
    const odd = _.filter(list, a => a%2 == 0);
    assert.equal(_.isSameList(odd, list_even), false);
  });
  it('filter currying test', function () {
    const filterOdd = _.filter(a => a%2 == 0);
    const odd = filterOdd(list);
    assert.equal(_.isSameList(odd, list_odd), true);
  });
});

describe("reject()", function() {
  it('reject test 1', function () {
    const odd = _.reject(list, a => a%2 == 0);
    assert.equal(_.isSameList(odd, list_even), true);
  });
  it('reject test 2', function () {
    const odd = _.reject(list, a => a%2 == 1);
    assert.equal(_.isSameList(odd, list_odd), true);
  });
  it('reject test 3', function () {
    const odd = _.reject(list, a => a%2 == 0);
    assert.equal(_.isSameList(odd, list_odd), false);
  });
  it('reject currying test', function () {
    const filterOdd = _.reject(a => a%2 == 0);
    const odd = filterOdd(list);
    assert.equal(_.isSameList(odd, list_even), true);
  });
});


describe("slice()", function() {
  it('slice test 1', function () {
    assert.equal(_.isSameList(_.slice(list,0), list), true);
  });
  it('slice test 2', function () {
    assert.equal(_.isSameList(_.slice(list,0,2), [1,2]), true);
  });
  it('slice test 3', function () {
    assert.equal(_.isSameList(_.slice(list,undefined,2), [1,2]), true);
  });
  it('slice test 4', function () {
    assert.equal(_.isSameList(_.slice(list,2), [3,4]), true);
  });
  it('slice test 5', function () {
    assert.equal(_.isSameList(_.slice(list,1,3), [2,3]), true);
  });
});


describe("go()", function() {
  it('go test', function () {
    const square = _.map(a => a * a);
    const get4 = _.get(3);
    assert.equal(_.go(list, square, get4), 16);
  });
});