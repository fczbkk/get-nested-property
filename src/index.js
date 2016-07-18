/**
 * Returns nested property by path.
 * @param {Object} [data=window] Data object in which we will be looking for property.
 * @param {string|Array} [path=''] Dot separated path to the nested property inside object. If array is used, it will be merged together as a single path.
 * @param {*} [default_value] Returned if property at given path is not defined.
 * @returns {*} Found property of the object or `undefined` if not found.
 *
 * @example
 * var data = {aaa: {bbb: 'ccc'}};
 * getNestedProperty(data, 'aaa.bbb');       // --> 'ccc'
 * getNestedProperty(data, ['aaa', 'bbb']);  // --> 'ccc'
 */
export default function getNestedProperty (
  data = window,
  path = '',
  default_value
) {

  // convert array notation to a single string
  if (Array.isArray(path)) {path = path.join('.');}

  if (typeof path === 'string') {

    let result = data;

    if (path !== '') {
      path.split('.').forEach(function (segment) {
        result = (
          typeof result !== 'undefined' &&
          typeof result[segment] !== 'undefined'
        )
          ? result[segment]
          : undefined;
      });
    }

    return (typeof result === 'undefined') ? default_value : result;

  } else {

    throw new TypeError(
      `getNestedProperty: Provided path must be String or Array (is "${path}").`
    );

  }

}
