"use strict"

const assert = require("assert");

const _ = require("./functional");

const obj = { id: 1, name: "Luna", age: 23 };
const list = [ 1, 2, 3, 4 ];
const array_like = {0:1, 1:2, 2:3, length: 3};


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

