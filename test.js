"use strict"

const assert = require("assert");

const _ = require("./dist/functional");

const obj = { id: 1, name: "Luna", age: 23 };
const list = [ 1, 2, 3, 4 ];
const array_like = {0:1, 1:2, 2:3, length: 3};
const obj2 = {id: 2 , obj: obj};
const obj3 = {id: 3, l: [obj, obj2, obj], '0': 10, '1': 20};

const empty_list = [];
const list_for_array_like = [1, 2, 3];
const list_for_obj = [1, "Luna", 23];
const keys_for_obj = ["id", "name", "age"];
const list_odd = [2,4];
const list_even = [1, 3];

const add2 = (a, b) => a + b;
const sub2 = (a, b) => a - b;
const sub4 = (a, b, c, d) => a - b - c - d;


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
    assert.equal(_.get(obj, "id"), obj.id);
  });
  it('key not in object -> undefined', function() {
    assert.equal(_.get(obj, "id1"), undefined);
  });
  it('index in list', function() {
    assert.equal(_.get(list, 3), 4);
  });
  it('index not in list -> undefined', function() {
    assert.equal(_.get(list, 4), undefined);
  });
  it('get multi-depth: key string', function() {
    assert.equal(_.get(obj2, "obj.age"), 23);
  });
  it('get multi-depth: key string[]', function() {
    assert.equal(_.get(obj2, ["obj","age"]), 23);
  });
  it('get complex obj', function() {
    assert.equal(_.get(obj3, ["l", 1, "id"]), 2);
    assert.equal(_.get(obj3, ["l", 0, "id"]), 1);
  });
  it('get key name is number', function() {
    assert.equal(_.get(obj3, [0]), 10);
    assert.equal(_.get(obj3, [1]), 20);
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
    assert.equal(_.reduce(list, (a,b) => a+b, 0), 10);
  });
  it('reduce with default value test', function() {
    assert.equal(_.reduce(list, (a,b) => a+b, -10), 0);
  });
});


describe("pipe()", function() {
  it('pipe test', function () {
    const square = _.map(a => a * a);
    const get4 = _.curryr(_.get)(3, undefined);
    const func = _.pipe(square, get4);
    assert.equal(func(list), 16);
  });
  it('pipe test : input list', function () {
    const square = _.map(a => a * a);
    const get4 = _.curryr(_.get)(3, undefined);
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
    const get4 = _.curryr(_.get)(3, undefined);
    assert.equal(_.go(list, square, get4), 16);
  });
});

describe("curry()", function() {
  it('curry test', function() {
    const subTest1 = _.curry(sub2)(10);
    assert.equal(subTest1(3), 7);
    const subTest2 = _.curry(sub4)(6, 3);
    assert.equal(subTest2(1, 2), 0);
    const subTest3 = _.curry(sub4)(7, 1, 2);
    assert.equal(subTest3(3), 1);
  });
});

describe("curryr()", function() {
  it('curryr test', function() {
    const subTest1 = _.curryr(sub2)(3);
    assert.equal(subTest1(10), 7);
    const subTest2 = _.curryr(sub4)(1,2);
    assert.equal(subTest2(6,3), 0);
    const subTest3 = _.curryr(sub4)(1,2,3);
    assert.equal(subTest3(7), 1);
  });
});

describe("distinct()", function() {
  it('distinct test', function() {
    const list = [1,2,3,4,5,4,3,2,1,3,4,2];
    const distList = _.distinct(list);
    assert.equal(distList.length, 5);
  });
});

describe("groupBy()", function() {
	it('groupBy test', function() {
		const list = [
			{ local1: "서울", code: 11, local2: "마포구", value: 2},
			{ local1: "서울", code: 11, local2: "종로구", value: 1},
			{ local1: "서울", code: 11, local2: "강남구", value: 3},
			{ local1: "서울", code: 11, local2: "강서구", value: 4},
			{ local1: "경기도", code: 20, local2: "수원", value: 1},
			{ local1: "경기도", code: 20, local2: "성남", value: 3},
			{ local1: "경기도", code: 20, local2: "용인", value: 5},
			{ local1: "경기도", code: 20, local2: "부천", value: 6},
		];

		const result = _.groupBy(list, ["local1", "code"], "local2s");
		assert.equal(result.length, 2);
		assert.equal(result[0].local1, "서울");
		assert.equal(result[0].local2s.length, 4);
		assert.equal(result[1].local2s.length, 4);
	});
});