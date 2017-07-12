"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var is_1 = require("./is");
/**
 * Duplicates
 * Counts the number of duplicates in an array.
 *
 * @param arr the array to check for duplicates.
 * @param value the value to match.
 * @param breakable when true allows breaking at first duplicate.
 */
function duplicates(arr, value, breakable) {
    var i = arr.length;
    var dupes = 0;
    while (i--) {
        if (breakable && dupes > 0)
            break;
        if (is_1.isEqual(arr[i], value))
            dupes += 1;
    }
    return dupes;
}
exports.duplicates = duplicates;
/**
 *
 * Contains
 * Tests if array contains value.
 *
 * @param arr the array to be inspected.
 * @param value the value to check if is contained in array.
 */
function contains(arr, value) {
    arr = arr || [];
    return arr.filter(function (v) {
        return is_1.isEqual(v, value);
    }).length > 0;
}
exports.contains = contains;
/**
 * Contains Any
 * Tests array check if contains value.
 *
 * @param arr the array to be inspected.
 * @param compare - array of values to compare.
 */
function containsAny(arr, compare) {
    if (!is_1.isArray(arr) || !is_1.isArray(compare))
        return false;
    return compare.filter(function (c) {
        return contains(arr, c);
    }).length > 0;
}
exports.containsAny = containsAny;
/**
 * Keys
 * Takes an object then returns keys in array.
 *
 * @param obj the object to parse keys.
 */
function keys(obj) {
    if (!is_1.isPlainObject(obj))
        return [];
    return Object.keys(obj);
}
exports.keys = keys;
/**
 * Flatten
 * Takes multiple arrays and flattens to single array.
 * NOTE: this will NOT work for empty nested arrays
 * but will work for 90 plus % of cases.
 *
 * @param args rest param containing multiple arrays to flatten.
 */
function flatten() {
    var arr = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        arr[_i] = arguments[_i];
    }
    var i = 0;
    var result = [];
    while (i < arr.length) {
        var itm = arr[i];
        if (is_1.isArray(itm))
            result = result.concat(flatten.apply(void 0, itm));
        else
            result = result.concat([itm]);
        i++;
    }
    return result;
}
exports.flatten = flatten;
/**
 * First
 * Simple method to get first element just
 * a little less typing.
 *
 * @param arr the array to get first element from.
 */
function first(arr) {
    return arr[0];
}
exports.first = first;
/**
 * Last
 * Simple method to get last element.
 *
 * @param arr the array to get last element.
 */
function last(arr) {
    return arr[arr.length - 1];
}
exports.last = last;
// NOTE: the following are immutable methods.
/**
 * Pop
 * Pops/removes last element in array.
 *
 * @param arr the array to pop value from.
 */
function pop(arr) {
    var value = arr[arr.length - 1];
    var popped = splice(arr, 0, arr.length - 1);
    return {
        result: popped.val,
        val: last(arr)
    };
}
exports.pop = pop;
/**
 * Push
 * Non mutating way to push to an array.
 *
 * @param arr the array to push items to.
 * @param args the items to be added.
 */
function push(arr) {
    var args = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        args[_i - 1] = arguments[_i];
    }
    arr = arr.concat(flatten.apply(void 0, args));
    return {
        result: arr,
        val: arr.length
    };
}
exports.push = push;
/**
 * Shift
 * Shifts/removes first element in array.
 * As this is a non-mutating method returns
 * an object with new array and shifted value.
 *
 * @param arr the array to shift value from.
 */
function shift(arr) {
    var shifted = splice(arr, 0, 1);
    return {
        result: shifted.result,
        val: arr[0]
    };
}
exports.shift = shift;
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
function splice(arr, start, remove) {
    var items = [];
    for (var _i = 3; _i < arguments.length; _i++) {
        items[_i - 3] = arguments[_i];
    }
    start = start || 0;
    var head = arr.slice(0, start);
    var tail = arr.slice(start);
    var removed = [];
    var result;
    if (remove) {
        removed = tail.slice(0, remove);
        tail = tail.slice(remove);
    }
    if (!is_1.isValue(remove)) {
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
exports.splice = splice;
/**
 * Unshift
 * Unshifts a value to an array in a non mutable way.
 *
 * @param arr the array to be unshifted.
 * @param value the value to be unshifted
 */
function unshift(arr) {
    var items = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        items[_i - 1] = arguments[_i];
    }
    arr = arr.concat(flatten(items));
    return {
        result: arr,
        val: arr.length
    };
}
exports.unshift = unshift;
//# sourceMappingURL=array.js.map