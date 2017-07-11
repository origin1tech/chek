import { IMap, IArrayResult } from '../interfaces';
/**
 * Duplicates
 * Counts the number of duplicates in an array.
 *
 * @param arr the array to check for duplicates.
 * @param value the value to match.
 * @param breakable when true allows breaking at first duplicate.
 */
export declare function duplicates(arr: any[], value: any, breakable?: boolean): number;
/**
 *
 * Contains
 * Tests if array contains value.
 *
 * @param arr the array to be inspected.
 * @param value the value to check if is contained in array.
 */
export declare function contains(arr: any[], value: any): boolean;
/**
 * Contains Any
 * Tests array check if contains value.
 *
 * @param arr the array to be inspected.
 * @param compare - array of values to compare.
 */
export declare function containsAny(arr: any[], compare: any[]): boolean;
/**
 * Keys
 * Takes an object then returns keys in array.
 *
 * @param obj the object to parse keys.
 */
export declare function keys<T>(obj: IMap<T>): string[];
/**
 * Flatten
 * Takes multiple arrays and flattens to single array.
 * NOTE: this will NOT work for empty nested arrays
 * but will work for 90 plus % of cases.
 *
 * @param args rest param containing multiple arrays to flatten.
 */
export declare function flatten(...arr: any[]): any[];
/**
 * First
 * Simple method to get first element just
 * a little less typing.
 *
 * @param arr the array to get first element from.
 */
export declare function first(arr: any[]): any;
/**
 * Last
 * Simple method to get last element.
 *
 * @param arr the array to get last element.
 */
export declare function last(arr: any[]): any;
/**
 * Pop
 * Pops/removes last element in array.
 *
 * @param arr the array to pop value from.
 */
export declare function pop(arr: any[]): IArrayResult;
/**
 * Push
 * Non mutating way to push to an array.
 *
 * @param arr the array to push items to.
 * @param args the items to be added.
 */
export declare function push(arr: any[], ...args: any[]): IArrayResult;
/**
 * Shift
 * Shifts/removes first element in array.
 * As this is a non-mutating method returns
 * an object with new array and shifted value.
 *
 * @param arr the array to shift value from.
 */
export declare function shift(arr: any[]): IArrayResult;
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
export declare function splice(arr: any[], start?: number, remove?: number, ...items: any[]): IArrayResult;
/**
 * Unshift
 * Unshifts a value to an array in a non mutable way.
 *
 * @param arr the array to be unshifted.
 * @param value the value to be unshifted
 */
export declare function unshift(arr: any[], ...items: any[]): IArrayResult;
