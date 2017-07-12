import { IMap } from '../interfaces';
/**
 * To Array
 * Converts value to array or converts object to array where
 * key will be inserted into object as $id: 'your object key'
 *
 * @param val the value to convert to array.
 * @param def optional default value on null or error.
 */
export declare function toArray<T>(val: any, id?: string | T[], def?: T[]): T[];
/**
 * To Boolean
 * Converts value if not boolean to boolean.
 * Will convert 'true', '1', 'yes' or '+' to true.
 *
 * @param val the value to inspect.
 * @param def optional default value on null.
 */
export declare function toBoolean(val: any, def?: boolean): boolean;
/**
 * To Date
 * Converts value to date using Date.parse when string.
 *
 * @param val the value to be converted to date.
 * @param def a default date when null.
 */
export declare function toDate(val: any, def?: Date): Date;
/**
 * To Default
 * Returns a default value when provided if
 * primary value is null or undefined. If neither
 * then null is returned.
 *
 * @param val the value to return if defined.
 * @param def an optional default value to be returned.
 */
export declare function toDefault(val: any, def?: any): any;
/**
 * To Epoch
 * Converts a Date type to an epoch.
 *
 * @param val the date value to convert.
 * @param def optional default value when null.
 */
export declare function toEpoch(val: Date, def?: number): number;
/**
 * To Float
 * Converts value to a float.
 *
 * @param val the value to convert to float.
 */
export declare function toFloat(val: any, def?: number): number;
/**
 * To JSON
 * Simple wrapper to strinigy using JSON.
 *
 * @param obj the object to be stringified.
 * @param pretty an integer or true for tabs in JSON.
 * @param def optional default value on null.
 */
export declare function toJSON(obj: any, pretty?: number | boolean | string, def?: string): string;
/**
 * To Integer
 * Convert value to integer.
 *
 * @param val the value to convert to integer.
 * @param def optional default value on null or error.
 */
export declare function toInteger(val: any, def?: number): number;
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
export declare function toMap<T>(val: any, id?: string | IMap<any>, def?: IMap<any>): T;
/**
 * To Nested
 * Takes an object that was flattened by toUnnested
 * and re-nests it.
 *
 * @param val the flattened object to be nested.
 */
export declare function toNested<T>(val: IMap<any>, def?: IMap<any>): T;
/**
 * To Number
 * Converts value to number.
 *
 * @param val the value to convert to number.
 * @param def optional default value on null.
 */
export declare function toNumber(val: any, def?: number): number;
/**
 * To Regular Expression
 * Attempts to convert to a regular expression
 * from a string.
 *
 * @param val the value to convert to RegExp.
 * @param def optional express as default on null.
 */
export declare function toRegExp(val: any, def?: RegExp): any;
/**
 * To String
 * When not null or undefined calls to string method on object.
 *
 * @param val the value to convert to string.
 * @param def optional default value on null.
 */
export declare function toString(val: any, def?: string): string;
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
export declare function toUnnested<T>(obj: IMap<any>, prefix?: boolean | IMap<any>, def?: IMap<any>): IMap<T>;
/**
 * To Window
 * Adds key to window object if is browser.
 *
 * @param key the key or object to add to the window object.
 * @param val the corresponding value to add to window object.
 * @param exclude string or array of keys to exclude.
 */
export declare function toWindow(key: any, val?: any, exclude?: string | string[]): void;
