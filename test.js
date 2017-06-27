"use strict"

const assert = require("assert");

const _ = require("./functional");


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
    assert.equal(_.isFalse({}), false);
  });
  it('list -> false', function() {
    assert.equal(_.isFalse([]), false);
  });
});