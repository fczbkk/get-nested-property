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

    return path
      .split('.')
      .filter(function(segment) {
        return segment.length > 0
      })
      .reduce(function(parent, segment) {
        return (
          typeof parent !== 'undefined' &&
          typeof parent[segment] !== 'undefined'
        )
          ? parent[segment]
          : undefined
      }, data)

  } else {

    throw new TypeError(
      `getNestedProperty: Provided path must be String (is "${path}").`
    );

  }

}
