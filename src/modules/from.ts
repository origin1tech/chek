import { isNumber, isValue } from './is';
import { tryWrap } from './try';
import { split } from './string';
import { set } from './object';

/**
 * From Epoch
 * Converts to a Date from an epoch.
 *
 * @param val the epoch value to convert to date.
 */
export function fromEpoch(val: number): Date {
  if (!isValue(val) || !isNumber(val))
    return null;
  return new Date(val);
}

/**
 * From JSON
 * Simple wrapper to parse json.
 * @alias tryParseJSON
 *
 * @param str the string to be parsed.
 * @param def a default fallback value on failed parse.
 */
export function fromJSON(str: string, def?: any) {
  return tryWrap(JSON.parse, str)(def);
}
