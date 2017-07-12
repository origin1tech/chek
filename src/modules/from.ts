import { isNumber, isValue } from './is';
import { tryWrap } from './function';
import { toDefault } from './to';
import { split } from './string';
import { set } from './object';

/**
 * From Epoch
 * Converts to a Date from an epoch.
 *
 * @param val the epoch value to convert to date.
 */
export function fromEpoch(val: number, def?: Date): Date {
  if (!isValue(val) || !isNumber(val))
    return toDefault(null, def);
  return new Date(val);
}

/**
 * From JSON
 * Simple wrapper to parse json.
 * @alias tryParseJSON
 *
 * @param val the string to be parsed.
 * @param def a default fallback value on failed parse.
 */
export function fromJSON<T>(val: string, def?: T): T {
  return tryWrap(JSON.parse, val)(def);
}
