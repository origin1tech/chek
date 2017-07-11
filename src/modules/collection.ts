import { keys } from './array';
import { isArray, isString, isPlainObject, isValue, isNumber, isBoolean, isObject } from './is';

/**
 * Reverse
 * Reverses arrays, strings or objects.
 * Only numbers, strings or booleans are supported
 * when reverse mapping objects.
 *
 * @param val the object to reverse.
 */
export function reverse(val: any, deep?: boolean) {

  if (!isValue(val))
    return null;

  // Reverse an array.
  if (isArray(val))
    return val.reverse();

  // Reverse a string.
  if (isString(val)) {
    let i = val.toString().length;
    let tmpStr = '';
    while (i--) {
      tmpStr += val[i];
    }
    return tmpStr;
  }

  // Reverse an object.
  let result = {};
  for (let p in val) {
    if (isObject(val[p]))
      continue;
    result[val[p]] = p;
  }

  return result;

}

// export function sort<T>(val: any): T {
//   return null;
// }