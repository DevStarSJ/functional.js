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