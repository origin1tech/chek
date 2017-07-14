"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var constant_1 = require("./constant");
var to_1 = require("./to");
var function_1 = require("./function");
var array_1 = require("./array");
/**
 * Is Array
 * Check if value is an array.
 *
 * @param val the value to test if is array.
 */
function isArray(val) {
    /* istanbul ignore if */
    if (!Array.isArray)
        return constant_1.toStr.call(val) === '[object Array]';
    return Array.isArray(val);
}
exports.isArray = isArray;
/**
 * Is Boolean
 *
 * @param val
 */
function isBoolean(val) {
    return isValue(val) && typeof val === 'boolean';
}
exports.isBoolean = isBoolean;
/**
 * Is Browser
 * Checks if script is running in browser.
 *
 * @param override an optional key to inspect on process.env.
 */
function isBrowser(override) {
    // Enables checking a proces.env key while
    // in Node. Good for multi-environment builds.
    if (override)
        return typeof process !== 'undefined' &&
            function_1.tryWrap(to_1.toBoolean, process.env &&
                process.env[override])(false) === true;
    // Otherwise just return NOT Node.
    return !isNode();
}
exports.isBrowser = isBrowser;
/**
 * Is Date
 * Inspects if is Date, parses date string when
 * parse flag is set to true.
 *
 * @param val the value to inspect/test if is Date.
 * @param parse when true the value is parsed to see if is date.
 */
function isDate(val) {
    return (isValue(val) &&
        val.constructor &&
        val.constructor === Date);
}
exports.isDate = isDate;
/**
 * Indicates if app is in debug mode.
 * @param debugging a manual flag to denote debugging.
 */
function isDebug(debugging) {
    // If manually passed just return.
    if (isValue(debugging))
        return debugging;
    var eargv = process && process.execArgv;
    function chkDebug() {
        return (eargv.indexOf('--debug') !== -1 ||
            eargv.indexOf('--debug-brk') !== -1 ||
            isValue(v8debug));
    }
    return function_1.tryWrap(chkDebug)(false);
}
exports.isDebug = isDebug;
/**
 * Is Empty
 * Test if value provided is empty.
 * Note 0 would be empty.
 *
 * @param val value to be inspected.
 */
function isEmpty(val) {
    return (isUndefined(val) ||
        isNull(val) ||
        (isString(val) && val.length === 0) ||
        (isNumber(val) && isNaN(val)) ||
        (isPlainObject(val) && !array_1.keys(val).length) ||
        (isArray(val) && !val.length));
}
exports.isEmpty = isEmpty;
/**
 * Is Equal
 * Tests if two values are equal.
 * Does not support "deep equal".
 *
 * @param val the value to be compared.
 * @param comp the comparer value.
 * @param loose when true == is used instead of ===.
 */
function isEqual(val, comp, loose) {
    if (isDate(val) && isDate(comp))
        return to_1.toEpoch(val) === to_1.toEpoch(comp);
    if (loose)
        return val == comp;
    return val === comp;
}
exports.isEqual = isEqual;
/**
 * Is Error
 * Checks if value is an error. Allows custom error property
 * which can be useful in certain scenarios to flag an object
 * as an error.
 *
 * @param val the value/object to be inspected.
 * @param prop a custom property to check if exists indicating is error.
 */
function isError(val, prop) {
    if (!isValue(val) || !isObject(val))
        return false;
    var type = constant_1.toStr.call(val).toLowerCase();
    return type === '[object error]' || type === '[object domexception]' || !isEmpty(val[prop]);
}
exports.isError = isError;
/**
 * Is Float
 * Checks if number is float.
 *
 * @param val the value to inspect.
 */
function isFloat(val) {
    return (isNumber(val) &&
        Number(val) === val && val % 1 !== 0);
}
exports.isFloat = isFloat;
/**
 * Is Function
 * Check if object provided is function.
 *
 * @param val - test object provided is function.
 */
function isFunction(val) {
    return isValue(val) && typeof val === 'function';
}
exports.isFunction = isFunction;
/**
 * Is Infinite
 * Checks if value is Infinity.
 *
 * @param val the value to test if infinite.
 */
function isInfinite(val) {
    return val === Infinity;
}
exports.isInfinite = isInfinite;
/**
 * Is Integer
 * Checks if numbers is an integer.
 *
 * @param val the value to inspect.
 */
function isInteger(val) {
    return (isNumber(val) &&
        (val % 1 === 0));
}
exports.isInteger = isInteger;
/**
 * Is Node
 * Tests if is NodeJS.
 */
function isNode() {
    return typeof module !== 'undefined' &&
        module.exports &&
        typeof window === 'undefined';
}
exports.isNode = isNode;
/**
 * Is Null
 * Checks if value is null.
 *
 * @param val the object to inspect for null.
 */
function isNull(val) {
    return val === null;
}
exports.isNull = isNull;
/**
 * Check if value provided is number.
 * @param val the value to be tested.
 */
function isNumber(val) {
    return !isNaN(parseFloat(val)) && isFinite(val);
}
exports.isNumber = isNumber;
/**
 * Is Moment
 * Inspects object to detect if is moment.
 *
 * @param val the object to be inspected.
 */
function isMoment(val) {
    return isObject(val) && val._isAMomentObject;
}
exports.isMoment = isMoment;
/**
 * Is Object
 * Checks if value is an object.
 *
 * @param val the value to inspect.
 */
function isObject(val) {
    return (!isUndefined(val) &&
        !isNull(val) &&
        ((val && val.constructor === Object) || typeof val === 'function' || typeof val === 'object'));
}
exports.isObject = isObject;
/**
 * Is Plain Object
 * Inspects value checking if is object literal.
 *
 * @param val the value to inspect
 */
function isPlainObject(val) {
    return val && val.constructor && val.constructor === {}.constructor;
}
exports.isPlainObject = isPlainObject;
/**
 * Is Promise
 * Checks if value is a Promise.
 *
 * @param val the value to inspect.
 * @param name optional constructor name for promise defaults to Promise.
 */
function isPromise(val, name) {
    name = name || 'Promise';
    return (!isEmpty(val) &&
        val.constructor &&
        val.constructor.name === name);
}
exports.isPromise = isPromise;
/**
 * Is Reg Expression
 * Tests if object is regular expression.
 *
 * @param val the value to inspect as RegExp.
 */
function isRegExp(val) {
    return val && val.constructor && val.constructor === RegExp;
}
exports.isRegExp = isRegExp;
/**
 * Is String
 * Inspect value provided testing if is string.
 * @param val the value to be tested.
 */
function isString(val) {
    return isValue(val) && (typeof val === 'string' || val instanceof String);
}
exports.isString = isString;
/**
 * Is Symbol
 * Checks if value is of type Symbol.
 *
 * @param val the value to inspect.
 */
function isSymbol(val) {
    return isValue(val) && typeof val === 'symbol';
}
exports.isSymbol = isSymbol;
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
function isTruthy(val) {
    if (!isValue(val))
        return false;
    if (typeof val === 'number')
        return val > 0;
    if (isString(val) && !val.length)
        return false;
    return (val !== false &&
        val !== isNaN(val));
}
exports.isTruthy = isTruthy;
/**
 * Is Type
 * Tests if object is instanceof provided Type.
 *
 * @param val the value to inspect.
 * @param Type the instance type to match.
 */
function isType(val, Type) {
    return val instanceof Type;
}
exports.isType = isType;
/**
 * Is Undefined
 * Tests if value is undefined.
 *
 * @param val the value to inspect
 */
function isUndefined(val) {
    return typeof val === 'undefined' || typeof val === undefined;
}
exports.isUndefined = isUndefined;
/**
 * Is Unique
 * Tests if the value is unique in the collection.
 *
 * @param arr the array to be inspected.
 * @param value the value to be matched.
 */
function isUnique(arr, value) {
    return array_1.duplicates(arr, value) === 1;
}
exports.isUnique = isUnique;
/**
 * Is Value
 * Ensures is of some value, e.g. not null
 * not undefined not isNaN & not Infinite.
 *
 * @param val the value to inspect.
 */
function isValue(val) {
    return (!isUndefined(val)
        && !isNull(val) && !(isNumber(val) && isNaN(val))
        && !isInfinite(val));
}
exports.isValue = isValue;
//# sourceMappingURL=is.js.map