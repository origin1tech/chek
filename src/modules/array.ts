
import { IMap, IArrayResult, IComparatorPrimer, IComparatorOptions, IComparator, IComparatorField, Transform } from '../interfaces';
import { isArray, isEqual, isPlainObject, isValue, isString, isFunction, isNumber, isObject } from './is';

function defComparator(a, b) { return a < b ? -1 : a > b ? 1 : 0; }
function normComparator<T>(primer?: IComparatorPrimer, order?: string | number | boolean) {
  let comp = defComparator;
  let reverse = false;
  if (primer)
    comp = (a, b) => defComparator(primer(a), primer(b));
  if (order && /^(desc|descending|-1|true)/.test(order + ''))
    return (a, b) => {
      return -1 * comp(a, b);
    };
  return comp;
}

/**
 * Orders arrays of objects by property, falls back to .sort() if not fields are specified.
 *
 * @example
 * const arr = [{ name: 'bob', age: 30 }, { name: 'john', age: 22 }];
 * chek.orderBy(arr, 'age', 'name');
 * check.orderBy(arr, { key: 'name', order: 'desc', primer: primerFunc });
 * chek.orderBy(arr, 'age', 'name', primerFunc);
 *
 * Order property: asc, ascending, desc, descending, 1, -1, 0
 * Primer property: a method that accepts single value and is run as a preprocessor before sorting.
 *
 * @param arr the collection to be sorted.
 * @param fields an array of field names or comparator field objects.
 */
export function orderBy<T>(arr: any[], ...fields: IComparatorField[]): T[] {

  let primer = v => v;

  // Allows common primer function to be last arg in fields.
  if (isFunction(last(fields)))
    primer = (fields.pop()) as IComparatorPrimer;

  if (!fields.length) {
    const hasNumbers = isNumber(first(arr)) && isNumber(last(arr));
    return arr.sort((a, b) => {
      a = primer(a);
      b = primer(b);
      if (hasNumbers)
        return a - b;
      a += '';
      b += '';
      if (a < b)
        return -1;
      else if (a > b)
        return 1;
      else
        /* istanbul ignore next */
        return 0;
    });
  }

  fields = (fields as IComparatorOptions[]).map((f) => {
    let field = <IComparatorOptions>f;
    if (isString(field)) {
      field = <IComparatorOptions>{ key: <any>f };
      field.order = /^-/.test(f + ''); // if prefixed with - is reversed.
    }
    else if (isArray(field)) {
      field = <IComparatorOptions>{ key: f[0] };
      field.order = f[1];
    }
    field.primer = field.primer || primer;
    field.comparator = normComparator(field.primer, field.order);
    return field;
  });

  const comparator = (a, b) => {
    let result;
    for (const field of fields as IComparatorOptions[]) {
      result = field.comparator(a[field.key], b[field.key]);
      if (result !== 0) break;
    }
    return result;
  };

  return arr.sort(comparator as IComparator);

}

/**
 *
 * Contains
 * Tests if array contains value.
 *
 * @param arr the array to be inspected.
 * @param value the value to check if is contained in array.
 */
export function contains(arr: string | any[], value: any, transform?: Transform): boolean {
  arr = arr || [];
  if (isString(arr))
    arr = (arr as string).split('');
  return (arr as any[]).filter((v) => {
    if (transform)
      v = transform(v);
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
export function containsAny(arr: string | any[], compare: string | any[], transform?: Transform): boolean {
  if (isString(arr))
    arr = (arr as string).split('');
  if (isString(compare))
    compare = (compare as string).split('');
  if (!isArray(arr) || !isArray(compare))
    return false;
  return (compare as any[]).filter(c => {
    return contains(arr, c, transform);
  }).length > 0;
}

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
 * Keys
 * Takes an object then returns keys in array.
 *
 * @param obj the object to parse keys.
 */
export function keys(obj: IMap<any>): string[] {
  if (!isObject(obj))
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
export function flatten<T>(...arr: any[]): T[] {

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
export function first<T>(arr: any[]): T {
  return arr[0];
}

/**
 *
 * Includes
 * Tests if array contains value.
 *
 * @param arr the array to be inspected.
 * @param value the value to check if is contained in array.
 */
/* istanbul ignore next */
export function includes(arr: string | any[], value: any, transform?: Transform): boolean {
  return contains(arr, value, transform);
}

/**
 *
 * Includes Any
 * Tests if array contains any value.
 *
 * @param arr the array to be inspected.
 * @param compare the array to compare.
 */
/* istanbul ignore next */
export function includesAny(arr: string | any[], compare: string | any[], transform?: Transform): boolean {
  return containsAny(arr, compare, transform);
}

/**
 * Last
 * Simple method to get last element.
 *
 * @param arr the array to get last element.
 */
export function last<T>(arr: any[]): T {
  return (arr && arr[arr.length - 1]) || undefined;
}

// NOTE: the following are immutable methods.

/**
 * Pop
 * Pops/removes last element in array.
 *
 * @param arr the array to pop value from.
 */
export function pop(arr: any[]) {

  return {
    array: arr.slice(0, arr.length - 1),
    val: arr[arr.length - 1]
  };

}

/**
 * Push
 * Non mutating way to push to an array.
 *
 * @param arr the array to push items to.
 * @param args the items to be added.
 */
export function push(arr: any[], ...args: any[]) {
  arr = arr.concat(flatten(...args));
  return {
    array: arr,
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
export function shift(arr: any[]) {
  const shifted = splice(arr, 0, 1);
  return {
    array: shifted.array,
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
export function splice(arr: any[], start?: number, remove?: number, ...items: any[]) {

  start = start || 0;

  let head = arr.slice(0, start);
  let tail = arr.slice(start);
  let removed = [];

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
    array: arr,
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
    array: arr,
    val: arr.length
  };

}