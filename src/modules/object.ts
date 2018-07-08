
import * as _clone from 'clone';
import { keys, contains } from './array';
import { isArray, isString, isUndefined, isPlainObject, isBoolean, isObject, isValue } from './is';
import { split } from './string';
import { toArray } from './to';

/**
 * Match Index
 * @private
 *
 * @param prop the property to match.
 */
function matchIndex(prop) {
  if (!prop || !/\[\d+\]/.test(prop))
    return false;
  const prefix = prop.match(/[^\[]+/i);
  let idx;
  const indices = prop.match(/\d+/g);
  if (!indices)
    return false;
  return {
    name: prefix[0],
    index: indices[0],
    indices: indices.slice(1)
  };
}

/**
 * Del
 * @private
 */
function _del<T>(obj: any, key: string | string[]): T {

  if (arguments.length !== 2 || !isObject(obj) || (!isArray(key) && !isString(key)))
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

  if (!isObject(obj) || (!isArray(key) && !isString(key)))
    return null;

  let props: string[] = isArray(key) ? <string[]>key : split(key);

  while (props.length && obj) {

    let prop = props.shift(),
      match;

    match = matchIndex(prop);

    if (match) {
      /* istanbul ignore next  */
      if (!isUndefined(obj[match.name])) {
        obj = obj[match.name][match.index];
        // iterate each indices and set obj to that index.
        match.indices.forEach(i => obj = obj[i]);
      }
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

  if (arguments.length !== 3 || !isObject(obj) || (!isArray(key) && !isString(key)))
    return null;

  let props: string[] = split(key);

  /* istanbul ignore if */
  if (!isValue(val))
    val = {};

  const prop = props.shift();
  const match = matchIndex(prop);
  let next = obj[prop];

  if (!isValue(next) && !match)
    next = obj[prop] = {};

  if (match) {
    if (!obj[match.name])
      obj[match.name] = [];
    next = obj[match.name][match.index];
  }

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

function _put<T>(obj: any, key: string | string[], val: any): T {

  if (!isObject(obj) || (!isArray(key) && !isString(key)))
    return null;

  // Get current and ensure an array.
  const cur = toArray(get(obj, key), []);

  if (!isArray(val))
    val = [val];

  return _set<T>(obj, key, [...cur, ...val]);

}

/**
 * Assign
 * Convenience wrapper to Object.assign falls back to extend
 * which is NOT a polyfill fyi.
 *
 * @param obj object to assign.
 * @param args additional source object.
 */
export function assign<T>(obj: any, ...args: any[]): T {
  if (Object.prototype.hasOwnProperty('assign'))
    return Object.assign(obj, ...args) as T;
  return extend(obj, ...args) as T;
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
    return _del<T>(clone(obj), key);
  return _del<T>(obj, key);
}

/**
 * Get
 * Gets a property within the supplied object.
 *
 * @param obj the object to inspect.
 * @param key the dot notated key or array of keys.
 * @param def a default value to set if not exists.
 */
export function get<T>(obj: any, key: string | string[], def?: any): T {
  let result = _get<T>(clone(obj), key);
  if (!isValue(result) && def) {
    _set(obj, key, def);
    result = def;
  }
  return result;
}

/**
 * Has
 * Checks if property exists in object.
 *
 * @param obj the object to be inpsected.
 * @param key the key to be found.
 */
export function has(obj: any, key: string | string[]): boolean {


  if (!isObject(obj) || (!isArray(key) && !isString(key)))
    return false;

  obj = clone(obj);

  let props: string[] = isArray(key) ? <string[]>key : split(key);

  while (props.length && obj) {

    let prop = props.shift(),
      match = matchIndex(prop);

    if (!props.length) { // no more props chek path.
      const _keys = keys(obj);
      if (match) {
        return contains(_keys, match.name) && isValue(obj[match.name][match.index]);
      }
      else {
        return contains(_keys, prop);
      }
    }

    if (match) {
      /* istanbul ignore next  */
      if (!isUndefined(obj[match.name])) {
        obj = obj[match.name][match.index];
        // iterate each indices and set obj to that index.
        match.indices.forEach(i => obj = obj[i]);
      }
    }

    else {
      obj = obj[prop];
    }

  }

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
 * Extend properties between target/source objects. This is NOT
 * a deep copy.
 *
 * NOTE: use Object.assign if available!!
 *
 * @example extend({ name: 'Bob', active: true }, { active: undefined })
 *
 * @param obj primary target object.
 * @param args additional source objects to merge with target.
 */
export function extend<T>(obj: any, ...args: any[]): T;

/**
 * Extend properties between target/source objects. This is NOT
 * a deep copy.
 *
 * NOTE: use Object.assign if available!!
 *
 * @example extend(true, { name: 'Bob' }, { nested: { key: 'value' } })
 *
 * @param shallow when true only extends top level.
 * @param obj primary target object.
 * @param args additional source objects to merge with target.
 */
export function extend<T>(shallow: boolean, obj: any, ...args: any[]): T;

export function extend<T>(obj: any, ...args: any[]): T {

  let shallow = false;
  let dest: any = obj;

  // Determine if is shallow.
  if (isBoolean(dest)) {
    shallow = dest;
    if (!args.length)
      return {} as T;
    // get first arg as destination.
    dest = args[0];
    args = args.slice(1);
  }

  // If not an object return.
  if (!isObject(dest))
    return dest;

  let i = 0;

  while (i < args.length) {

    let src = args[i];

    if (!isObject(src))
      src = {};

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

          else if (isArray(src[p])) {
            dest[p] = src[p];
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

    i++;

  }

  return dest;

}

/**
 * Put a value to key. If the value is not currently an array it converts.
 *
 * @param obj the object to push value to.
 * @param key the key or array of keys to be joined as dot notation.
 * @param val the value to be pushed.
 * @param immutable when true update in immutable mode.
 */
export function put<T>(obj: any, key: string | string[], val: any, immutable?: boolean) {
  if (immutable)
    return _put<T>(clone(obj), key, val);
  return _put<T>(obj, key, val);
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
    while (i--)
      tmpStr += obj[i];
    return tmpStr as T;
  }

  // Reverse an object.
  let result: any = {};
  for (const p in obj) {
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
    return _set<T>(clone(obj), key, val);
  return _set<T>(obj, key, val);
}

/**
 * Create is a convenience method that simply calls Object.create().
 * If no object is passed creates using null.
 *
 * @param obj optional object to use with Object.create.
 */
export function create<T>(obj?: any) {
  return Object.create(obj || null);
}

/**
 * Omits characters or words from strings, removes
 * trailing whitespace before punctuation and also double spaces.
 *
 * @param str the string to omit chars from.
 * @param chars the characters or words to be omitted.
 */
export function omit<T>(str: string, chars: string | string[]): T;

/**
 * Omits a value from an array.
 *
 * @param arr the array to be filtered.
 * @param elements the elements to be removed.
 */
export function omit<T>(arr: any[], elements: any | any[]): T;

/**
 * Omits properties from an object, supports dot notation nested removals.
 *
 * @example .omit({ name: 'bob', blogs: { blog1: 'Title }}, ['blogs.blog1']);
 *
 * @param obj the object to remove properties from.
 * @param props the properties to be removed.
 * @param immutable when true object is first cloned to not mutated source.
 */
export function omit<T>(obj: object, props: string | string[], immutable?: boolean): T;

export function omit<T>(obj: any, props: any | any[], immutable?: boolean): T {

  props = toArray(props, []);

  if (!isValue(obj) || (!isArray(obj) && !isObject(obj) && !isString(obj)) || !props || !props.length)
    return obj;

  props = toArray<string>(props);

  // Note replaces double spaces only after
  // removing props from string. Also removes
  // space if trailed by any of the following
  // punctuation: .!?;,:
  if (isString(obj)) {
    return props.reduce((a, c) => {
      if ((c instanceof RegExp))
        return a.replace(c, '');
      a = (a.slice(0, a.indexOf(c)) + a.slice(a.indexOf(c) + c.length)).replace(/\s{2}/, ' ');
      a = a.replace(/\s[.!?;,:]/, a.slice(a.length - 1));
      return a;
    }, obj);
  }

  if (isArray(obj))
    return obj.filter(v => !~props.indexOf(v));

  if (!immutable)
    return props.reduce((a, c) => del(a, c), obj);

  return props.reduce((a, c) => del(a, c, true), obj);

}

/**
 * Picks values from object by property name.
 *
 * @param obj the object to pick from.
 * @param props the properties to be picked.
 */
export function pick<T>(obj: any, props: string | string[]): T {

  props = toArray(props, []);

  if (!isValue(obj) || !isObject(obj) || !props || !props.length)
    return obj;

  return props.reduce((a, c) => {
    return set(a, c, get(obj, c, undefined));
  }, {}) as T;

}


