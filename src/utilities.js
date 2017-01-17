/**
 * Converts array to single string.
 * @param {Array.<string>|string} path
 * @param {string} method_name - Name of the method, used in error message.
 * @returns {Array}
 * @ignore
 */
export function sanitizePropertyPath (path, method_name) {
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


/**
 * Returns property of source object, if possible. Otherwise returns `undefined`.
 * @param {*} [source_object]
 * @param {*} [property_id]
 * @returns {*}
 */
export function getPropertyOf (source_object, property_id) {
  return (
    typeof property_id === 'string' &&
    typeof source_object !== 'undefined' &&
    source_object !== null
  ) ? source_object[property_id] : undefined;
}
