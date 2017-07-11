/**
 * From Epoch
 * Converts to a Date from an epoch.
 *
 * @param val the epoch value to convert to date.
 */
export declare function fromEpoch(val: number): Date;
/**
 * From JSON
 * Simple wrapper to parse json.
 * @alias tryParseJSON
 *
 * @param str the string to be parsed.
 * @param def a default fallback value on failed parse.
 */
export declare function fromJSON(str: string, def?: any): any;
