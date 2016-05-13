/**
 * Returns nested property by path.
 * @param [data=window] Data object in which we will be looking for property.
 * @param [path=''] Dot separated path to the nested property inside object.
 * @returns {*} Found property of the object or `undefined` if not found.
 *
 * @example
 * var data = {aaa: {bbb: 'ccc'}};
 * getNestedProperty(data, 'aaa.bbb');
 * // returns 'ccc'
 */
export default function getNestedProperty (data = window, path = '') {

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

    return result;

  } else {

    throw new TypeError(
      `getNestedProperty: Provided path must be String (is "${path}").`
    );

  }

}
