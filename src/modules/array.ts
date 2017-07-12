
import { IMap, IArrayResult } from '../interfaces';
import { isArray, isEqual, isPlainObject, isValue } from './is';
import { tryWrap } from './function';

/**
 * Duplicates
 * Counts the number of duplicates in an array.
 *
 * @param arr the array to check for duplicates.
 * @param value the value to match.
 * @param breakable when true allows breaking at first duplicate.
 */
export function duplicates(arr: any[], value: any, breakable?: boolean): number {

  let i = arr.length;
  let dupes = 0;

  while (i--) {
    if (breakable && dupes > 0)
      break;
    if (isEqual(arr[i], value))
      dupes += 1;
  }

  return dupes;

}

/**
 *
 * Contains
 * Tests if array contains value.
 *
 * @param arr the array to be inspected.
 * @param value the value to check if is contained in array.
 */
export function contains(arr: any[], value: any): boolean {
  arr = arr || [];
  return arr.filter((v) => {
    return isEqual(v, value);
  }).length > 0;
}

/**
 * Contains Any
 * Tests array check if contains value.
 *
 * @param arr the array to be inspected.
 * @param compare - array of values to compare.
 */
export function containsAny(arr: any[], compare: any[]): boolean {
  if (!isArray(arr) || !isArray(compare))
    return false;
  return compare.filter(c => {
    return contains(arr, c);
  }).length > 0;
}

/**
 * Keys
 * Takes an object then returns keys in array.
 *
 * @param obj the object to parse keys.
 */
export function keys<T>(obj: IMap<T>): string[] {
  if (!isPlainObject(obj))
    return [];
  return Object.keys(obj);
}

/**
 * Flatten
 * Takes multiple arrays and flattens to single array.
 * NOTE: this will NOT work for empty nested arrays
 * but will work for 90 plus % of cases.
 *
 * @param args rest param containing multiple arrays to flatten.
 */
export function flatten(...arr: any[]): any[] {

  let i = 0;
  let result = [];

  while (i < arr.length) {
    const itm = arr[i];
    if (isArray(itm))
      result = result.concat(flatten(...itm));
    else
      result = result.concat([itm]);
    i++;
  }

  return result;

}

/**
 * First
 * Simple method to get first element just
 * a little less typing.
 *
 * @param arr the array to get first element from.
 */
export function first(arr: any[]): any {
  return arr[0];
}

/**
 * Last
 * Simple method to get last element.
 *
 * @param arr the array to get last element.
 */
export function last(arr: any[]): any {
  return arr[arr.length - 1];
}

// NOTE: the following are immutable methods.

/**
 * Pop
 * Pops/removes last element in array.
 *
 * @param arr the array to pop value from.
 */
export function pop(arr: any[]): IArrayResult {

  const value = arr[arr.length - 1];
  const popped = splice(arr, 0, arr.length - 1);

  return {
    result: popped.val,
    val: last(arr)
  };

}

/**
 * Push
 * Non mutating way to push to an array.
 *
 * @param arr the array to push items to.
 * @param args the items to be added.
 */
export function push(arr: any[], ...args: any[]): IArrayResult {
  arr = arr.concat(flatten(...args));
  return {
    result: arr,
    val: arr.length
  };
}

/**
 * Shift
 * Shifts/removes first element in array.
 * As this is a non-mutating method returns
 * an object with new array and shifted value.
 *
 * @param arr the array to shift value from.
 */
export function shift(arr: any[]): IArrayResult {
  const shifted = splice(arr, 0, 1);
  return {
    result: shifted.result,
    val: arr[0]
  };
}

/**
 * Splice
 * Non mutating way of splicing an array.
 *
 *
 * @param arr the array to be spliced.
 * @param start the starting index (default: 0)
 * @param remove the count to be spliced (default: 1)
 * @param items additional items to be concatenated.
 */
export function splice(arr: any[], start?: number, remove?: number, ...items: any[]): IArrayResult {

  start = start || 0;

  let head = arr.slice(0, start);
  let tail = arr.slice(start);
  let removed = [];
  let result;

  if (remove) {
    removed = tail.slice(0, remove);
    tail = tail.slice(remove);
  }

  if (!isValue(remove)) {
    arr = head.concat(items);
    removed = tail;
  }
  else {
    arr = head.concat(items).concat(tail);
  }

  return {
    result: arr,
    val: removed
  };

}

/**
 * Unshift
 * Unshifts a value to an array in a non mutable way.
 *
 * @param arr the array to be unshifted.
 * @param value the value to be unshifted
 */
export function unshift(arr: any[], ...items: any[]): IArrayResult {

  arr = arr.concat(flatten(items));

  return {
    result: arr,
    val: arr.length
  };

}
