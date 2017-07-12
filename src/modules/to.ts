
import { IMap } from '../interfaces';
import { keys, push } from './array';
import { fromEpoch } from './from';
import { isValue, isArray, isString, isUndefined, isPlainObject, isBoolean, isObject, isNull, isInfinite, isDate, isFloat, isInteger, isRegExp, isBrowser } from './is';
import { clone, set, extend, del } from './object';
import { tryWrap } from './function';
import { split } from './string';

declare var window;

/**
 * To Array
 * Converts value to array or converts object to array where
 * key will be inserted into object as $id: 'your object key'
 *
 * @param val the value to convert to array.
 * @param def optional default value on null or error.
 */
export function toArray<T>(val: any, id?: string | T[], def?: T[]): T[] {

  if (!isValue(val))
    return toDefault(null, def);

  if (isArray(val))
    return val;

  if (isArray(id)) {
    def = <any>id;
    id = undefined;
  }

  id = id || '$id';

  if (isPlainObject(val)) {

    let arr = [];

    for (let p in val) {
      if (val.hasOwnProperty(p)) {
        const cur = val[p];
        if (isPlainObject(cur)) {
          const tmp = {};
          tmp[(id as string)] = p;
          const obj = Object.assign({}, cur, tmp);
          arr.push(obj);
        }
        else {
          arr.push(val);
        }
      }
    }

    return arr;

  }

  return [val];
}

/**
 * To Boolean
 * Converts value if not boolean to boolean.
 * Will convert 'true', '1', 'yes' or '+' to true.
 *
 * @param val the value to inspect.
 * @param def optional default value on null.
 */
export function toBoolean(val: any, def?: boolean): boolean {
  if (isBoolean(val))
    return val;
  if (!isValue(val))
    return toDefault(null, def);
  val = val.toString();
  return (
    parseFloat(val) > 0 ||
    isInfinite(val) ||
    val === 'true' ||
    val === 'yes' ||
    val === '1' ||
    val === '+'
  );
}

/**
 * To Date
 * Converts value to date using Date.parse when string.
 *
 * @param val the value to be converted to date.
 * @param def a default date when null.
 */
export function toDate(val: any, def?: Date): Date {

  // This just checks loosely if string is
  // date like string, below parse should
  // catch majority of scenarios.
  function canParse() {
    return !/^[0-9]+$/.test(val) &&
      (isString(val) && /[0-9]/g.test(val) &&
        /(\.|\/|-|:)/g.test(val));
  }

  function parseDate() {
    let date = Date.parse(val);
    if (!isNaN(date))
      return fromEpoch(<number>date);
    return toDefault(null, def);
  }

  if (isDate(val))
    return val;

  if (!canParse())
    return toDefault(null, def);

  return tryWrap(parseDate)(def);

}

/**
 * To Default
 * Returns a default value when provided if
 * primary value is null or undefined. If neither
 * then null is returned.
 *
 * @param val the value to return if defined.
 * @param def an optional default value to be returned.
 */
export function toDefault(val: any, def?: any) {
  if (isValue(val))
    return val;
  return (isValue(def) && def) || null;
}

/**
 * To Epoch
 * Converts a Date type to an epoch.
 *
 * @param val the date value to convert.
 * @param def optional default value when null.
 */
export function toEpoch(val: Date, def?: number): number {
  return toDefault((isDate(val) && val.getTime()), def);
}

/**
 * To Float
 * Converts value to a float.
 *
 * @param val the value to convert to float.
 */
export function toFloat(val: any, def?: number): number {
  if (isFloat(val))
    return val;
  if (!isValue(val))
    return toDefault(null, def);
  const parsed = tryWrap(parseFloat, val.toString())(def);
  if (isFloat(parsed))
    return parsed;
  if (toBoolean(val))
    return 1;
  return 0;
}

/**
 * To JSON
 * Simple wrapper to strinigy using JSON.
 *
 * @param obj the object to be stringified.
 * @param pretty an integer or true for tabs in JSON.
 * @param def optional default value on null.
 */
export function toJSON(obj: any, pretty?: number | boolean | string, def?: string): string {
  if (isString(pretty)) {
    def = <string>pretty;
    pretty = undefined;
  }
  let tabs = 0;
  pretty = isBoolean(pretty) ? 2 : <number>pretty;
  tabs = pretty ? pretty : tabs;
  if (!isObject(obj))
    return toDefault(null, def);
  return tryWrap(JSON.stringify, obj, null, tabs)(def);
}

/**
 * To Integer
 * Convert value to integer.
 *
 * @param val the value to convert to integer.
 * @param def optional default value on null or error.
 */
export function toInteger(val: any, def?: number): number {

  if (isInteger(val))
    return val;

  if (!isValue(val))
    return toDefault(null, def);

  const parsed = tryWrap(parseInt, val.toString())(def);

  if (isInteger(parsed))
    return parsed;

  if (toBoolean(val))
    return 1;
  return 0;

}

/**
 * To Map
 * Converts arrays, strings, to an object literal.
 *
 * @example
 * Array: ['one', 'two', 'three'] Maps To: { 0: 'one', 1: 'two', 2: 'three' }
 * String: 'Star Wars' Maps To: { 0: 'Star Wars' }
 * String: 'Star Wars, Star Trek' Maps To { 0: 'Star Wars', 1: 'Star Trek' }
 * Array: [{ id: '123', name: 'Joe' }] Maps To: { 123: { name: 'Joe' }}
 * Array: [{ name: 'Joe' }, { name: 'Amy' }]
 * Maps To: { 0: { name: 'Joe' }, 2: { name: 'Amy' }}
 *
 * NOTE: mixed content arrays not supported.
 *
 * @param val the value to be mapped.
 * @param id optional id key when iterating array of objects.
 * @param def optional default value on null or error.
 */
export function toMap<T>(val: any, id?: string | IMap<any>, def?: IMap<any>): T {

  if (isValue(id) && !isString(id)) {
    def = <any>id;
    id = undefined;
  }

  if (isPlainObject(val))
    return val;

  if (!isValue(val) || (!isString(val) && !isArray(val)))
    return toDefault(null, def);

  // Default id key.
  id = <string>id || '$id';

  const exp = /(\/|\.|,|;|\|)/g;
  let i = 0;
  let obj: any = {};

  if (isString(val)) {

    // simple string.
    if (!exp.test(val))
      return <any>{ 0: val } as T;

    // split string into array, iterate.
    val = split(val);

    (<any[]>val).forEach((v, i) => obj[i] = v);

    return obj as T;

  }

  while (i < val.length) {

    if (isString(val[i])) {
      obj[i] = val[i];
    }
    else if (isPlainObject(val[i])) {
      let itm = Object.assign({}, val[i]);
      const key = itm[id] ? itm[id] : i;
      obj[key] = itm[id] ? del(itm, id) : itm;
    }
    i++;
  }

  return obj;

}

/**
 * To Nested
 * Takes an object that was flattened by toUnnested
 * and re-nests it.
 *
 * @param val the flattened object to be nested.
 */
export function toNested<T>(val: IMap<any>, def?: IMap<any>): T {
  function nest(src) {
    const dest = {};
    for (let p in src) {
      if (src.hasOwnProperty(p))
        if (/\./g.test(p))
          set(dest, p, src[p]);
        else
          dest[p] = src[p];
    }
    return dest;
  }
  return tryWrap(nest, val)(def);
}

/**
 * To Number
 * Converts value to number.
 *
 * @param val the value to convert to number.
 * @param def optional default value on null.
 */
export function toNumber(val: any, def?: number) {
  return toFloat(val);
}

/**
 * To Regular Expression
 * Attempts to convert to a regular expression
 * from a string.
 *
 * @param val the value to convert to RegExp.
 * @param def optional express as default on null.
 */
export function toRegExp(val: any, def?: RegExp) {
  const exp = /^\/.+\/(g|i|m)?([m,i,u,y]{1,4})?/;
  const optsExp = /(g|i|m)?([m,i,u,y]{1,4})?$/;
  if (isRegExp(val))
    return val;
  if (!isValue(val) || !isString(val))
    return toDefault(null, def);
  function regExpFromStr() {
    let opts;
    if (exp.test(val)) {
      optsExp.exec(val)[0];
      val = val.replace(/^\//, '').replace(optsExp, '').replace(/\/$/, '');
    }
    return new RegExp(val, opts);
  }
  return tryWrap(regExpFromStr)(def);
}

/**
 * To String
 * When not null or undefined calls to string method on object.
 *
 * @param val the value to convert to string.
 * @param def optional default value on null.
 */
export function toString(val: any, def?: string): string {
  if (isString(val))
    return val;
  if (!isValue(val))
    return toDefault(null, def);
  function _toString() {
    return val.toString();
  }
  return tryWrap(_toString)(def);
}

/**
 * To Unnested
 * Takes a nested object and flattens it
 * to a single level safely. To disable key
 * prefixing set prefix to false.
 *
 * @param val the object to be unnested.
 * @param prefix when NOT false parent key is prefixed to children.
 * @param def optional default value on null.
 */
export function toUnnested<T>(obj: IMap<any>, prefix?: boolean | IMap<any>, def?: IMap<any>): IMap<T> {

  if (isValue(prefix) && !isBoolean(prefix)) {
    def = <any>prefix;
    prefix = undefined;
  }
  let dupes = 0;

  function unnest(src, dest, pre) {
    dest = dest || {};
    for (let p in src) {
      if (dupes > 0)
        return;
      if (src.hasOwnProperty(p)) {
        if (isPlainObject(src[p])) {
          const parent = prefix !== false &&
            (pre && pre.length) ?
            pre + '.' + p : p;
          unnest(src[p], dest, parent);
        }
        else {
          const name = prefix !== false &&
            pre && pre.length ?
            pre + '.' + p : p;
          if (dest[name])
            dupes += 1;
          else
            dest[name] = src[p];
        }
      }
    }
    if (dupes > 0)
      return null;
    return dest;
  }

  return tryWrap(unnest, clone(obj))(def);

}

/**
 * To Window
 * Adds key to window object if is browser.
 *
 * @param key the key or object to add to the window object.
 * @param val the corresponding value to add to window object.
 */
export function toWindow(key: any, val?: any): void {

  /* istanbul ignore if */
  if (!isBrowser())
    return;

  let obj = key;

  if (!isPlainObject(obj)) {
    obj = {};
    obj[key] = val;
  }

  let _keys = keys(obj);
  let i = _keys.length;

  while (i--) {
    window[_keys[i]] = obj[_keys[i]];
  }

}