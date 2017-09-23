import { toStr } from './constant';
import { toDate, toBoolean, toEpoch } from './to';
import { tryWrap } from './function';
import { keys, duplicates } from './array';

declare var v8debug;
declare var window;

let existsSync, statSync;

if (isNode()) {
  const fs = require('fs');
  existsSync = fs.existsSync.bind(fs);
  statSync = fs.statSync.bind(fs);
}

/**
 * Is Array
 * Check if value is an array.
 *
 * @param val the value to test if is array.
 */
export function isArray(val: any): boolean {
  /* istanbul ignore if */
  if (!Array.isArray)
    return toStr.call(val) === '[object Array]';
  return Array.isArray(val);
}

/**
 * Is Boolean
 *
 * @param val
 */
export function isBoolean(val: any): boolean {
  return isValue(val) && typeof val === 'boolean';
}

/**
 * Is Browser
 * Checks if script is running in browser.
 *
 * @param override an optional key to inspect on process.env.
 */
export function isBrowser(override?: string): boolean {

  // Enables checking a proces.env key while
  // in Node. Good for multi-environment builds.
  if (override)
    return typeof process !== 'undefined' &&
      tryWrap(toBoolean, process.env &&
        process.env[override])(false) === true;

  // Otherwise just return NOT Node.
  return !isNode();

}

/**
 * Is Buffer
 * Checks if value is an instanceof Buffer.
 *
 * @param val the value to inspect as Buffer.
 */
export function isBuffer(val: any): boolean {
  return isValue(val) && (val instanceof Buffer);
}

/**
 * Is Date
 * Inspects if is Date, parses date string when
 * parse flag is set to true.
 *
 * @param val the value to inspect/test if is Date.
 * @param parse when true the value is parsed to see if is date.
 */
export function isDate(val: any): boolean {
  return (
    isValue(val) &&
    val.constructor &&
    val.constructor === Date
  );
}

/**
 * Indicates if app is in debug mode.
 * @param debugging a manual flag to denote debugging.
 */
export function isDebug(debugging?: boolean) {

  // If manually passed just return.
  if (isValue(debugging))
    return debugging;

  const eargv = process && process.execArgv;

  function chkDebug() {
    return (
      eargv.indexOf('--debug') !== -1 ||
      eargv.indexOf('--debug-brk') !== -1 ||
      isValue(v8debug)
    );
  }

  return tryWrap(chkDebug)(false);

}

/**
 * Is Empty
 * Test if value provided is empty.
 * Note 0 would be empty.
 *
 * @param val value to be inspected.
 */
export function isEmpty(val: any): boolean {
  return (
    isUndefined(val) ||
    isNull(val) ||
    (isString(val) && val.length === 0) ||
    (isNumber(val) && isNaN(val)) ||
    (isPlainObject(val) && !keys(val).length) ||
    (isArray(val) && !val.length));
}

/**
 * Is Equal
 * Tests if two values are equal.
 * Does not support "deep equal".
 *
 * @param val the value to be compared.
 * @param comp the comparer value.
 * @param loose when true == is used instead of ===.
 */
export function isEqual(val: any, comp: any, loose?: boolean): boolean {
  if (isDate(val) && isDate(comp))
    return toEpoch(val) === toEpoch(comp);
  if (loose)
    return val == comp;
  return val === comp;
}

/**
 * Is Error
 * Checks if value is an error. Allows custom error property
 * which can be useful in certain scenarios to flag an object
 * as an error.
 *
 * @param val the value/object to be inspected.
 * @param prop a custom property to check if exists indicating is error.
 */
export function isError(val: any, prop?: string): boolean {
  if (!isValue(val) || !isObject(val))
    return false;
  const type = toStr.call(val).toLowerCase();
  return type === '[object error]' || type === '[object domexception]' || !isEmpty(val[prop]);

}

/**
 * Is File
 * Checks if value is path to file in filesytem.
 * NODE ONLY!
 *
 * @param val the value to inspect as file.
 */
export function isFile(val: any) {
  return (
    isNode() &&
    existsSync(val) &&
    statSync(val).isFile()
  );
}

/**
 * Is Directory
 * Checks if value is path to directory in filesytem.
 * NODE ONLY!
 *
 * @param val the value to inspect as file.
 */
export function isDirectory(val: any) {
  return (
    isNode() &&
    existsSync(val) &&
    statSync(val).isDirectory()
  );
}

/**
 * Is Float
 * Checks if number is float.
 *
 * @param val the value to inspect.
 */
export function isFloat(val: any): boolean {
  return (
    isNumber(val) &&
    Number(val) === val && val % 1 !== 0
  );
}

/**
 * Is Function
 * Check if object provided is function.
 *
 * @param val - test object provided is function.
 */
export function isFunction(val: any): boolean {
  return isValue(val) && typeof val === 'function';
}

/**
 * Is Infinite
 * Checks if value is Infinity.
 *
 * @param val the value to test if infinite.
 */
export function isInfinite(val: any): boolean {
  return val === Infinity;
}

/**
 * Indicates if app is started with --inspect flag.
 *
 * @param inspecting a manual flag to denote inspecting.
 */
export function isInspect(inspecting?: boolean) {

  // If manually passed just return.
  if (isValue(inspecting))
    return inspecting;

  const eargv = process && process.execArgv;

  function chkInspect() {
    return (
      eargv.indexOf('--inspect') !== -1 ||
      eargv.indexOf('--inspect-brk') !== -1
    );
  }

  return tryWrap(chkInspect)(false);

}

/**
 * Is Integer
 * Checks if numbers is an integer.
 *
 * @param val the value to inspect.
 */
export function isInteger(val: any): boolean {
  return (
    isNumber(val) &&
    (val % 1 === 0)
  );
}

/**
 * Is Node
 * Tests if is NodeJS.
 */
export function isNode() {
  return typeof module !== 'undefined' &&
    module.exports &&
    typeof window === 'undefined';
}

/**
 * Is Null
 * Checks if value is null.
 *
 * @param val the object to inspect for null.
 */
export function isNull(val: any): boolean {
  return val === null;
}

/**
 * Check if value provided is number.
 * @param val the value to be tested.
 */
export function isNumber(val: any): boolean {
  return !isNaN(parseFloat(val)) && isFinite(val);
}

/**
 * Is Moment
 * Inspects object to detect if is moment.
 *
 * @param val the object to be inspected.
 */
export function isMoment(val: any): boolean {
  return isObject(val) && val._isAMomentObject;
}

/**
 * Is Object
 * Checks if value is an object.
 *
 * @param val the value to inspect.
 */
export function isObject(val: any): boolean {
  return (
    !isUndefined(val) &&
    !isNull(val) &&
    ((val && val.constructor === Object) || typeof val === 'function' || typeof val === 'object')
  );
}

/**
 * Is Plain Object
 * Inspects value checking if is object literal.
 *
 * @param val the value to inspect
 */
export function isPlainObject(val: any): boolean {
  return val && val.constructor && val.constructor === {}.constructor;
}

/**
 * Is Promise
 * Checks if value is a Promise.
 *
 * @param val the value to inspect.
 * @param name optional constructor name for promise defaults to Promise.
 */
export function isPromise(val: any, name?: string): boolean {
  name = name || 'Promise';
  return (
    !isEmpty(val) &&
    val.constructor &&
    val.constructor.name === name
  );
}

/**
 * Is Reg Expression
 * Tests if object is regular expression.
 *
 * @param val the value to inspect as RegExp.
 */
export function isRegExp(val: any): boolean {
  return val && val.constructor && val.constructor === RegExp;
}

/**
 * Is String
 * Inspect value provided testing if is string.
 * @param val the value to be tested.
 */
export function isString(val: any): boolean {
  return isValue(val) && (typeof val === 'string' || val instanceof String);
}

/**
 * Is Symbol
 * Checks if value is of type Symbol.
 *
 * @param val the value to inspect.
 */
export function isSymbol(val: any): boolean {
  return isValue(val) && typeof val === 'symbol';
}

/**
 * Is Truthy
 * Checks if value is truthy e.g. not false, 0,
 * null, undefined, empty.
 *
 * Strings such as 'false', '0',  '-' or 'no'
 * will return true. If NOT desired call toBoolean
 * on the value then pass to isTruthy.
 *
 * @param val the value to inspect.
 */
export function isTruthy(val: any): boolean {
  if (!isValue(val))
    return false;
  if (typeof val === 'number')
    return val > 0;
  if (isString(val) && !val.length)
    return false;
  return (
    val !== false &&
    val !== isNaN(val)
  );
}

/**
 * Is Type
 * Tests if object is instanceof provided Type.
 *
 * @param val the value to inspect.
 * @param Type the instance type to match.
 */
export function isType(val: any, Type: any): boolean {
  return val instanceof Type;
}

/**
 * Is Undefined
 * Tests if value is undefined.
 *
 * @param val the value to inspect
 */
export function isUndefined(val: any) {
  return typeof val === 'undefined' || typeof val === undefined;
}

/**
 * Is Unique
 * Tests if the value is unique in the collection.
 *
 * @param arr the array to be inspected.
 * @param value the value to be matched.
 */
export function isUnique(arr: any[], value: any): boolean {
  return duplicates(arr, value) === 1;
}

/**
 * Is Value
 * Ensures is of some value, e.g. not null
 * not undefined not isNaN & not Infinite.
 *
 * @param val the value to inspect.
 */
export function isValue(val?: any): boolean {
  return (
    !isUndefined(val)
    && !isNull(val) && !(isNumber(val) && isNaN(val))
    && !isInfinite(val)
  );
}

/**
 * Is Windows
 * Returns boolean if node is running in Windows.
 */
export function isWindows(): boolean {
  if (!isNode() || !(process && process.platform))
    return false;
  return process.platform.indexOf('win') === 0;
}