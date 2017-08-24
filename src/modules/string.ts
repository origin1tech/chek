import { isArray, isEmpty, isFunction, isString, isValue, isBoolean } from './is';
import { toDefault, toArray } from './to';

declare var performance;

/**
 * Camelcase
 * Converts string to camelcase.
 *
 * @param val the value to be transformed.
 */
export function camelcase(val: string): string {
  if (!isValue(val))
    return null;
  return val.replace(/[^A-Za-z0-9]/g, ' ').replace(/^\w|[A-Z]|\b\w|\s+/g, (m, i) => {
    if (+m === 0 || /(\.|-|_)/.test(m))
      return '';
    return i === 0 ? m.toLowerCase() : m.toUpperCase();
  });
}

/**
 * Capitalize
 * Converts string to capitalize.
 *
 * @param val the value to be transformed.
 */
export function capitalize(val: string): string {
  if (!isValue(val))
    return null;
  val = val.toLowerCase();
  return `${val.charAt(0).toUpperCase()}${val.slice(1)}`;
}

/**
 * Lowercase
 * Converts string to lowercase.
 *
 * @param val the value to be transformed.
 */
export function lowercase(val: string): string {
  if (!isValue(val))
    return null;
  return val.toLowerCase();
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
export function split(val: string | string[], chars?: string | string[] | boolean): string[] {

  if (isArray(val))
    return <string[]>val;

  if (!isValue(val) || !isString(val))
    return null;

  // default characters.
  let defChars = ['/', '.', ',', ';', '|'];
  let char;
  let arr;
  chars = chars ? toArray<string>(chars) : defChars;

  // if no char iterate defaults.
  let i = 0;
  while (i < chars.length && !char) {
    if (val.indexOf(chars[i]) !== -1) {
      char = chars[i];
    }
    i++;
  }

  if (!isValue(char))
    return [<string>val];

  arr = (val as string).split(<string>char).map(v => v.trim());

  // If empty remove first element.
  // this happens when splitting on
  // char and is first char in string.
  if (isEmpty(arr[0]))
    arr.shift();

  return arr;

}

/**
 * Slugify
 * Slugifies string.
 *
 * @param val the value to be transformed.
 * @param def optional default value on null.
 */
export function slugify(val: string): string {

  if (!isValue(val))
    return null;

  val = val.replace(/^\s+|\s+$/g, '').toLowerCase();

  // replace accents etc.
  const from = 'ãàáäâẽèéëêìíïîõòóöôùúüûñç·/_,:;';
  const to = 'aaaaaeeeeeiiiiooooouuuunc------';
  for (let i = 0, l = from.length; i < l; i++) {
    val = val.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
  }

  val = val.replace(/[^a-z0-9 -]/g, '') // replace invalid chars.
    .replace(/\s+/g, '-') // replace whitespace with -
    .replace(/-+/g, '-'); // replace multiple dashes with single.

  return val;

}

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
export function titlecase(val: string, conjunctions?: boolean): string {

  if (!isValue(val))
    return null;

  // conjunctions
  const conj = /^(a|an|and|as|at|but|by|en|for|if|in|nor|of|on|or|per|the|to|vs?\.?|via)$/i;

  return val.replace(/[A-Za-z0-9\u00C0-\u00FF]+[^\s-]*/g, function (m, i, t) {

    if (i > 0 && i + m.length !== t.length &&
      m.search(conj) > -1 && t.charAt(i - 2) !== ';' &&
      (t.charAt(i + m.length) !== '-' || t.charAt(i - 1) === '-') &&
      t.charAt(i - 1).search(/[^\s-]/) < 0) {
      if (conjunctions === false)
        return capitalize(m);
      return m.toLowerCase();
    }

    if (m.substr(1).search(/[A-Z]|\../) > -1)
      /* istanbul ignore next */
      return m;

    return m.charAt(0).toUpperCase() + m.substr(1);

  });

}

/**
 * Uppercase
 * Converts string to uppercase.
 *
 * @param val the value to be transformed.
 */
export function uppercase(val: string): string {
  if (!isValue(val))
    return null;
  return val.toUpperCase();
}

/**
 * UUID
 * Generates a UUID.
 */
export function uuid(): string {

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





