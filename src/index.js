/**
 * Returns nested property by path.
 * @name getNestedProperty
 * @param {Object} [data=window] Data object in which we will be looking for property.
 * @param {string|Array.<string>} [path=''] Dot separated path to the nested property inside object. If array is used, it will be merged together as a single path.
 * @param {*} [default_value] Returned if property at given path is not defined.
 * @returns {*} Found property of the object or `undefined` if not found.
 *
 * @example
 * var data = {aaa: {bbb: 'ccc'}};
 * getNestedProperty(data, 'aaa.bbb');       // --> 'ccc'
 * getNestedProperty(data, ['aaa', 'bbb']);  // --> 'ccc'
 */
export function getNestedProperty (
  data = window,
  path = '',
  default_value
) {
  // `null` can't be checked for properties, so let's skip right to default
  if (data === null) {
    return default_value;
  }

  let result = data;

  path = sanitizePropertyPath(path, 'getNestedProperty');
  for (let i = 0; i < path.length; i++) {
    const segment = path[i];
    const is_last_item = i === path.length - 1;

    // we can not ask for properties of `null`, so let's stop the cycle
    if (!is_last_item && result[segment] === null) {
      result = undefined;
      break;
    }

    result = (
      typeof result !== 'undefined' &&
      typeof result[segment] !== 'undefined'
    )
      ? result[segment]
      : undefined;
  }

  return (typeof result === 'undefined') ? default_value : result;
}


/**
 * Deletes nested property by path in object.
 * @name deleteNestedProperty
 * @param {Object} [data=window] Data object in which we will be looking for property.
 * @param {string|Array.<string>} [path=''] Dot separated path to the nested property inside object. If array is used, it will be merged together as a single path.
 * @returns {*} Original object with removed property.
 *
 * @example
 * var data = {aaa: {bbb: 'ccc', ddd: 'eee'}};
 * deleteNestedProperty(data, 'aaa.bbb');       // --> {aaa: {ddd: 'eee'}}
 * deleteNestedProperty(data, ['aaa', 'bbb']);  // --> {aaa: {ddd: 'eee'}}
 */
export function deleteNestedProperty (data = window, path = '') {
  path = sanitizePropertyPath(path, 'getNestedProperty');

  if (path.length > 0) {
    const last_step = path.pop();
    delete getNestedProperty(data, path)[last_step];
  }

  return data;
}


/**
 * Converts array to single string.
 * @param {Array.<string>|string} path
 * @param {string} method_name - Name of the method, used in error message.
 * @returns {Array}
 * @ignore
 */
function sanitizePropertyPath (path, method_name) {
  let sanitized_path = path;

  // convert array notation to a single string
  if (Array.isArray(sanitized_path)) {
    sanitized_path = sanitized_path.join('.');
  }

  if (typeof sanitized_path !== 'string') {
    throw new TypeError(
      `${method_name}: Provided path must be String or Array (is "${path}").`
    );
  }

  return sanitized_path === '' ? [] : sanitized_path.split('.');
}


export default getNestedProperty;
