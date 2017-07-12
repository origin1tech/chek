/**
 * From Epoch
 * Converts to a Date from an epoch.
 *
 * @param val the epoch value to convert to date.
 */
export declare function fromEpoch(val: number, def?: Date): Date;
/**
 * From JSON
 * Simple wrapper to parse json.
 * @alias tryParseJSON
 *
 * @param val the string to be parsed.
 * @param def a default fallback value on failed parse.
 */
export declare function fromJSON<T>(val: string, def?: T): T;
