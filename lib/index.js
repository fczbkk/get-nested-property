'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

exports.default = getNestedProperty;
/**
 * Returns nested property by path.
 * @param [data=window] Data object in which we will be looking for property.
 * @param [path=''] Dot separated path to the nested property inside object.
 * @param [default_value] Returned if property at given path is not defined.
 * @returns {*} Found property of the object or `undefined` if not found.
 *
 * @example
 * var data = {aaa: {bbb: 'ccc'}};
 * getNestedProperty(data, 'aaa.bbb');
 * // returns 'ccc'
 */
function getNestedProperty() {
  var data = arguments.length <= 0 || arguments[0] === undefined ? window : arguments[0];
  var path = arguments.length <= 1 || arguments[1] === undefined ? '' : arguments[1];
  var default_value = arguments[2];


  if (typeof path === 'string') {
    var _ret = function () {

      var result = data;

      if (path !== '') {
        path.split('.').forEach(function (segment) {
          result = typeof result !== 'undefined' && typeof result[segment] !== 'undefined' ? result[segment] : undefined;
        });
      }

      return {
        v: typeof result === 'undefined' ? default_value : result
      };
    }();

    if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
  } else {

    throw new TypeError('getNestedProperty: Provided path must be String (is "' + path + '").');
  }
}