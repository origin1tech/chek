
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
  /* istanbul ignore if  */
  if (match && match.length === 3) {
    return { name: match[1], index: match[2] };
  }
  return false;
}

/**
 * Del
 * Deletes keys in an object.
 *
 * @param obj the object whose keys should be deleted.
 * @param props the property keys that should be deleted.
 */
export function del(obj: any, key: string | string[]): any {

  if (arguments.length !== 2 || (!isArray(key) && !isString(key)))
    return null;

  const props: string[] = split(key);
  const prop = props.shift();
  const match = matchIndex(prop);

  let next = obj[prop];

  /* istanbul ignore if  */
  if (match)
    next = obj[match.name][match.index];

  if (props.length > 0) {
    del(next, props);
  }

  else {
    if (match) {
      /* istanbul ignore next  */
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
 * Gets a property within the supplied object.
 *
 * @param obj the object to inspect.
 * @param prop
 */
export function get<T>(obj: any, key: string | string[]): T {

  if (arguments.length !== 2 || (!isArray(key) && !isString(key)))
    return null;

  let _clone = clone<T>(obj);
  let props: string[] = isArray(key) ? <string[]>key : split(key);

  while (props.length && _clone) {

    let prop = props.shift(),
      match;

    match = matchIndex(prop);

    if (match) {

      /* istanbul ignore next  */
      if (!isUndefined(_clone[match.name]))
        _clone = _clone[match.name][match.index];

    }

    else {
      _clone = _clone[prop];

    }

  }

  return _clone;
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
 * Set
 * Sets a value on an object using dot notation or url path.
 *
 * @todo need to refactor this method.
 *
 * @param obj the object to set the value on.
 * @param key the property used for setting the value.
 * @param value the value used for updating the property.
 * @param dynamic when NOT false objects are dynamically created if required.
 */
export function set(obj: any, key: string | string[], val: any, dynamic?: boolean) {

  /* istanbul ignore next  */
  if (arguments.length !== 3 || (!isArray(key) && !isString(key)))
    return null;

  let props: string[] = split(key);

  /* istanbul ignore next  */
  if (!isValue(val) && dynamic !== false)
    val = {};

  const prop = props.shift();
  const match = matchIndex(prop);
  let next = obj[prop];

  /* istanbul ignore next  */
  if (!isValue(next) && dynamic !== false)
    next = obj[prop] = {};

  /* istanbul ignore next  */
  if (match)
    next = obj[match.name][match.index];

  if (props.length > 0) {
    set(next, props, val);
  }

  else {
    /* istanbul ignore next  */
    if (match)
      obj[match.name][match.index] = val;
    else
      obj[prop] = val;

  }

  return obj;

}