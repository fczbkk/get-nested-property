import {
  sanitizePropertyPath,
  getPropertyOf
} from './utilities';


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
export function getNestedProperty (data = window, path = '', default_value) {
  const path_segments = sanitizePropertyPath(path, 'getNestedProperty');

  let result = data;
  for (let i = 0; i < path_segments.length; i++) {
    result = getPropertyOf(result, path_segments[i]);
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


export default getNestedProperty;
