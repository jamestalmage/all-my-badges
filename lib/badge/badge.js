var assert = require('assert');
var merge = require('merge');

module.exports = function(){

  function Badge (opts) {
    this._opts = opts;
  }

  function Format (data) {
    this._data = data;
  }

  Badge.addProvider = function(name, fn) {
    assert.equal('string', typeof name);
    assert.equal('function', typeof fn);

    bp[name] = function (opts) {
      return new Format(fn(this._opts, opts));
    };
  };

  Badge.addFormat = function(name, fn) {
    assert.equal('string', typeof name);
    assert.equal('function', typeof fn);

    fp[name] = function (opts) {
      return fn(this._data, opts);
    };
  };

  Badge.use = function use () {
    for (var i = 0; i < arguments.length; i++) {
      arguments[i](Badge);
    }
  };

  var bp = Badge.prototype = {};
  var fp = Badge.prototype = {};

  return Badge;
};