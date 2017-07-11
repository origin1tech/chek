import { isArray, isEmpty, isFunction, isString, isValue } from './is';

declare var performance;

/**
 * Split
 * Splits a string at character.
 * Default possible chars to match: ['/', '.', ',', ';', '|']
 *
 * @param val the string to be split.
 * @param char the character to split at.
 */
export function split(val: string | string[], char?: string): string[] {

  if (isArray(val))
    return <string[]>val;

  if (!isValue(val) || !isString(val))
    return null;

  // default characters.
  let defChars = ['/', '.', ',', ';', '|'];
  let arr;

  // if no char iterate defaults.
  let i = defChars.length;
  while (i-- && !char) {
    const tmpChar = defChars[i];
    if (val.indexOf(tmpChar) !== -1)
      char = tmpChar;
  }

  char = char || '.';
  arr = (val as string).split(char);

  // If empty remove first element.
  // this happens when splitting on
  // char and is first char in string.
  if (isEmpty(arr[0]))
    arr.shift();

  return arr;

}

/**
 * UUID
 * Generates a UUID.
 */
export function uuid() {

  let d = Date.now();

  // Use high perf timer if avail.
  /* istanbul ignore next */
  if (typeof performance !== 'undefined' && isFunction(performance.now))
    d += performance.now();

  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = (d + Math.random() * 16) % 16 | 0;
    d = Math.floor(d / 16);
    return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
  });

}

/**
 * Pad Left
 * Pads a string on the left.
 *
 * @param val the string to be padded.
 * @param len the length to pad.
 * @param offset an offset number or string to be counted.
 * @param char the character to pad with.
 */
export function padLeft(val: string, len: number, offset?: number | string, char?: string): string {

  /* istanbul ignore if */
  if (!isValue(val) || !isString(val))
    return null;

  // If offset is a string
  // count its length.
  if (isString(offset))
    offset = <number>(offset as string).length;

  char = char || ' ';
  let pad = '';
  while (len--) {
    pad += char;
  }
  if (offset)
    return padLeft('', <number>offset, null, char) + pad + val;

  return pad + val;
}

/**
 * Pad Right
 * Pads a string to the right.
 *
 * @param val the string to be padded.
 * @param len the length to pad.
 * @param offset an offset value to add.
 * @param char the character to pad with.
 */
export function padRight(val: string, len: number, offset?: number | string, char?: string): string {

  /* istanbul ignore if */
  if (!isValue(val) || !isString(val))
    return null;

  // If offset is a string
  // count its length.
  if (isString(offset))
    offset = <number>(offset as string).length;

  char = char || ' ';
  while (len--) {
    val += char;
  }
  if (offset)
    val += padRight('', <number>offset, null, char);
  return val;
}

/**
 * Pad Values
 *
 * @param values the values to be padded.
 * @param dir the direction to pad.
 * @param offset an offset value to add.
 * @param char the character to pad with.
 */
export function padValues(arr: string[], strategy?: string, offset?: number | string, char?: string): string[] {

  /* istanbul ignore if */
  if (!isValue(arr) || !isArray(arr))
    return null;

  // If offset is a string
  // count its length.
  if (isString(offset))
    offset = <number>(offset as string).length;

  // do nothing.
  if (strategy === 'none')
    return arr;

  let len = 0;
  strategy = strategy || 'right';
  char = char || ' ';

  const func = strategy === 'right' ? padRight : padLeft;

  arr.forEach((item) => {
    if (item.length > len)
      len = item.length;
  });

  if (offset) len += <number>offset;

  arr.forEach((item, i) => {
    if (item.length < len)
      arr[i] = func(item, len - item.length, null, char);
  });

  return arr;

}
