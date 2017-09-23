/**
 * Is Array
 * Check if value is an array.
 *
 * @param val the value to test if is array.
 */
export declare function isArray(val: any): boolean;
/**
 * Is Boolean
 *
 * @param val
 */
export declare function isBoolean(val: any): boolean;
/**
 * Is Browser
 * Checks if script is running in browser.
 *
 * @param override an optional key to inspect on process.env.
 */
export declare function isBrowser(override?: string): boolean;
/**
 * Is Buffer
 * Checks if value is an instanceof Buffer.
 *
 * @param val the value to inspect as Buffer.
 */
export declare function isBuffer(val: any): boolean;
/**
 * Is Date
 * Inspects if is Date, parses date string when
 * parse flag is set to true.
 *
 * @param val the value to inspect/test if is Date.
 * @param parse when true the value is parsed to see if is date.
 */
export declare function isDate(val: any): boolean;
/**
 * Indicates if app is in debug mode.
 * @param debugging a manual flag to denote debugging.
 */
export declare function isDebug(debugging?: boolean): any;
/**
 * Is Empty
 * Test if value provided is empty.
 * Note 0 would be empty.
 *
 * @param val value to be inspected.
 */
export declare function isEmpty(val: any): boolean;
/**
 * Is Equal
 * Tests if two values are equal.
 * Does not support "deep equal".
 *
 * @param val the value to be compared.
 * @param comp the comparer value.
 * @param loose when true == is used instead of ===.
 */
export declare function isEqual(val: any, comp: any, loose?: boolean): boolean;
/**
 * Is Error
 * Checks if value is an error. Allows custom error property
 * which can be useful in certain scenarios to flag an object
 * as an error.
 *
 * @param val the value/object to be inspected.
 * @param prop a custom property to check if exists indicating is error.
 */
export declare function isError(val: any, prop?: string): boolean;
/**
 * Is Float
 * Checks if number is float.
 *
 * @param val the value to inspect.
 */
export declare function isFloat(val: any): boolean;
/**
 * Is Function
 * Check if object provided is function.
 *
 * @param val - test object provided is function.
 */
export declare function isFunction(val: any): boolean;
/**
 * Is Infinite
 * Checks if value is Infinity.
 *
 * @param val the value to test if infinite.
 */
export declare function isInfinite(val: any): boolean;
/**
 * Indicates if app is started with --inspect flag.
 *
 * @param inspecting a manual flag to denote inspecting.
 */
export declare function isInspect(inspecting?: boolean): any;
/**
 * Is Integer
 * Checks if numbers is an integer.
 *
 * @param val the value to inspect.
 */
export declare function isInteger(val: any): boolean;
/**
 * Is Node
 * Tests if is NodeJS.
 */
export declare function isNode(): boolean;
/**
 * Is Null
 * Checks if value is null.
 *
 * @param val the object to inspect for null.
 */
export declare function isNull(val: any): boolean;
/**
 * Check if value provided is number.
 * @param val the value to be tested.
 */
export declare function isNumber(val: any): boolean;
/**
 * Is Moment
 * Inspects object to detect if is moment.
 *
 * @param val the object to be inspected.
 */
export declare function isMoment(val: any): boolean;
/**
 * Is Object
 * Checks if value is an object.
 *
 * @param val the value to inspect.
 */
export declare function isObject(val: any): boolean;
/**
 * Is Plain Object
 * Inspects value checking if is object literal.
 *
 * @param val the value to inspect
 */
export declare function isPlainObject(val: any): boolean;
/**
 * Is Promise
 * Checks if value is a Promise.
 *
 * @param val the value to inspect.
 * @param name optional constructor name for promise defaults to Promise.
 */
export declare function isPromise(val: any, name?: string): boolean;
/**
 * Is Reg Expression
 * Tests if object is regular expression.
 *
 * @param val the value to inspect as RegExp.
 */
export declare function isRegExp(val: any): boolean;
/**
 * Is String
 * Inspect value provided testing if is string.
 * @param val the value to be tested.
 */
export declare function isString(val: any): boolean;
/**
 * Is Symbol
 * Checks if value is of type Symbol.
 *
 * @param val the value to inspect.
 */
export declare function isSymbol(val: any): boolean;
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
export declare function isTruthy(val: any): boolean;
/**
 * Is Type
 * Tests if object is instanceof provided Type.
 *
 * @param val the value to inspect.
 * @param Type the instance type to match.
 */
export declare function isType(val: any, Type: any): boolean;
/**
 * Is Undefined
 * Tests if value is undefined.
 *
 * @param val the value to inspect
 */
export declare function isUndefined(val: any): boolean;
/**
 * Is Unique
 * Tests if the value is unique in the collection.
 *
 * @param arr the array to be inspected.
 * @param value the value to be matched.
 */
export declare function isUnique(arr: any[], value: any): boolean;
/**
 * Is Value
 * Ensures is of some value, e.g. not null
 * not undefined not isNaN & not Infinite.
 *
 * @param val the value to inspect.
 */
export declare function isValue(val?: any): boolean;
/**
 * Is Windows
 * Returns boolean if node is running in Windows.
 */
export declare function isWindows(): boolean;
