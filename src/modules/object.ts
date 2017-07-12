
import * as _clone from 'clone';
import { keys } from './array';
import { isArray, isString, isUndefined, isPlainObject, isBoolean, isObject, isValue } from './is';
import { split } from './string';

/**
 * Match Index
 * @private
 *
 * @param prop the property to match.
 */
function matchIndex(prop) {
  // expression for matching arrays.
  const match = new RegExp('(.+)\\[([0-9]*)\\]', 'i').exec(prop);
  if (match && match.length === 3) {
    return { name: match[1], index: match[2] };
  }
  return false;
}

/**
 * Del
 * @private
 */
function _del<T>(obj: any, key: string | string[]): T {

  if (arguments.length !== 2 || (!isArray(key) && !isString(key)))
    return null;

  const props: string[] = split(key);
  const prop = props.shift();
  const match = matchIndex(prop);

  let next = obj[prop];

  if (match)
    next = obj[match.name][match.index];

  if (props.length > 0) {
    _del(next, props);
  }

  else {
    if (match) {
      obj[match.name].splice(match.index, 1);
    }
    else {
      delete obj[prop];
    }

  }

  return obj;

}

/**
 * Get
 * @private
 */
function _get<T>(obj: any, key: string | string[]): T {

  if (arguments.length !== 2 || (!isArray(key) && !isString(key)))
    return null;

  let props: string[] = isArray(key) ? <string[]>key : split(key);

  while (props.length && obj) {

    let prop = props.shift(),
      match;

    match = matchIndex(prop);

    if (match) {

      /* istanbul ignore next  */
      if (!isUndefined(obj[match.name]))
        obj = obj[match.name][match.index];

    }

    else {
      obj = obj[prop];

    }

  }

  return obj as T;

}

/**
 * Set
 * @private
 */
function _set<T>(obj: any, key: string | string[], val: any): T {


  if (arguments.length !== 3 || (!isArray(key) && !isString(key)))
    return null;

  let props: string[] = split(key);

  /* istanbul ignore if */
  if (!isValue(val))
    val = {};

  const prop = props.shift();
  const match = matchIndex(prop);
  let next = obj[prop];

  if (!isValue(next))
    next = obj[prop] = {};

  if (match)
    next = obj[match.name][match.index];

  if (props.length > 0) {
    _set(next, props, val);
  }

  else {

    if (match)
      obj[match.name][match.index] = val;
    else
      obj[prop] = val;

  }

  return obj;

}

/**
 * Del
 * Removes a property within the supplied object.
 *
 * @param obj the object to inspect.
 * @param key the dot notated key or array of keys.
 * @param immutable when true original object NOT mutated.
 */
export function del<T>(obj: any, key: string | string[], immutable?: boolean): T {
  if (immutable)
    return _del(clone(obj), key);
  return _del(obj, key);
}

/**
 * Get
 * Gets a property within the supplied object.
 *
 * @param obj the object to inspect.
 * @param key the dot notated key or array of keys.
 */
export function get<T>(obj: any, key: string | string[]): T {
  return _get(clone(obj), key);
}

/**
 * Clone
 * Performs deep cloning of objects.
 *
 * @param obj object to be cloned.
 * @param json performs quick shallow clone using JSON.
 */
export function clone<T>(obj: any, json?: boolean): T {
  if (json)
    return JSON.parse(JSON.stringify(obj));
  return _clone<T>(obj);
}

/**
 * Extend
 * Extends objects similar to Object.assign
 * with the exception that undefined values are ignored.
 *
 * @example
 * extend({ name: 'Bob', active: true }, { active: undefined })
 * results in:
 * { name: 'Bob', active: true }
 *
 * @param obj primary object.
 * @param args unlimited number of objects to extend from.
 */
export function extend<T>(obj: any, ...args: any[]): T {

  let shallow = false;
  let dest: any = obj;

  // Determin if is shallow.
  if (isBoolean(dest)) {
    shallow = dest;
    if (!args.length)
      return {} as T;
    // get first arg as destination.
    dest = args.shift();
  }

  // If not an object return null.
  if (!isObject(dest))
    return null;

  // Itearate each object and extend
  // to the target object.
  for (let i = 0, src: any; src = args[i]; i++) {

    // Ignore if not and object.
    if (!isObject(src))
      continue;

    for (let p in src) {

      if (src.hasOwnProperty(p)) {

        // Copy only top level props.
        if (shallow) {
          if (!isUndefined(src[p]))
            dest[p] = src[p];
        }

        else {

          if (isArray(src[p]) && isArray(dest[p])) {

            // Iterate the array.
            src[p].forEach((v, idx) => {
              dest[p][idx] = v;
            });

          }

          else if (isPlainObject(src[p])) {
            dest[p] = extend(dest[p] || {}, src[p]);
          }

          else {
            if (!isUndefined(src[p]))
              dest[p] = src[p];
          }

        }

      }

    }

  }

  return dest;
}

/**
 * Reverse
 * Reverses arrays, strings or objects.
 * Only numbers, strings or booleans are supported
 * when reverse mapping objects.
 *
 * @param obj the object to reverse.
 */
export function reverse<T>(obj: any): T {

  if (!isValue(obj))
    return null;

  // Reverse an array.
  if (isArray(obj))
    return obj.reverse();

  // Reverse a string.
  if (isString(obj)) {
    let i = obj.toString().length;
    let tmpStr: any = '';
    while (i--) {
      tmpStr += obj[i];
    }
    return tmpStr as T;
  }

  // Reverse an object.
  let result: any = {};
  for (let p in obj) {
    if (isObject(obj[p]))
      continue;
    result[obj[p]] = p;
  }

  return result as T;

}

/**
 * Set
 * Sets a value on an object using dot notation or url path.
 *
 * @todo need to refactor this method.
 *
 * @param obj the object to set the value on.
 * @param key the property used for setting the value.
 * @param value the value used for updating the property.
 * @param immutable when true the original object is NOT mutated.
 *
 */
export function set<T>(obj: any, key: string | string[], val: any, immutable?: boolean): T {
  if (immutable)
    return _set(clone(obj), key, val);
  return _set(obj, key, val);
}



