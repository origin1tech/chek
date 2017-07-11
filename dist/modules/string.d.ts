/**
 * Split
 * Splits a string at character.
 * Default possible chars to match: ['/', '.', ',', ';', '|']
 *
 * @param val the string to be split.
 * @param char the character to split at.
 */
export declare function split(val: string | string[], char?: string): string[];
/**
 * UUID
 * Generates a UUID.
 */
export declare function uuid(): string;
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
