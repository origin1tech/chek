/**
 * Camelcase
 * Converts string to camelcase.
 *
 * @param val the value to be transformed.
 */
export declare function camelcase(val: string): string;
/**
 * Capitalize
 * Converts string to capitalize.
 *
 * @param val the value to be transformed.
 */
export declare function capitalize(val: string): string;
/**
 * Lowercase
 * Converts string to lowercase.
 *
 * @param val the value to be transformed.
 */
export declare function lowercase(val: string): string;
/**
 * Pad Left
 * Pads a string on the left.
 *
 * @param val the string to be padded.
 * @param len the length to pad.
 * @param offset an offset number or string to be counted.
 * @param char the character to pad with.
 */
export declare function padLeft(val: string, len: number, offset?: number | string, char?: string): string;
/**
 * Pad Right
 * Pads a string to the right.
 *
 * @param val the string to be padded.
 * @param len the length to pad.
 * @param offset an offset value to add.
 * @param char the character to pad with.
 */
export declare function padRight(val: string, len: number, offset?: number | string, char?: string): string;
/**
 * Pad Values
 *
 * @param values the values to be padded.
 * @param dir the direction to pad.
 * @param offset an offset value to add.
 * @param char the character to pad with.
 */
export declare function padValues(arr: string[], strategy?: string, offset?: number | string, char?: string): string[];
/**
 * Split
 * Splits a string at character.
 * Default possible chars to match: ['/', '.', ',', ';', '|']
 * Note accepts string[] to simplify external methods that call split
 * In this case will simply return the array.
 *
 * @param val the string to be split.
 * @param char the character to split at.
 */
export declare function split(val: string | string[], chars?: string | string[] | boolean, trim?: boolean): string[];
/**
 * Slugify
 * Slugifies string.
 *
 * @param val the value to be transformed.
 * @param def optional default value on null.
 */
export declare function slugify(val: string): string;
/**
 * Titlecase
 * Converts string to titlecase.
 *
 * This fine script refactored from:
 * @see https://github.com/gouch/to-title-case
 *
 * @param val the value to be transformed.
 * @param conjunctions when true words like and, a, but, for are also titlecased.
 */
export declare function titlecase(val: string, conjunctions?: boolean): string;
/**
 * Uppercase
 * Converts string to uppercase.
 *
 * @param val the value to be transformed.
 */
export declare function uppercase(val: string): string;
/**
 * UUID
 * Generates a UUID.
 */
export declare function uuid(): string;
