"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var is_1 = require("./is");
/**
 * Reverse
 * Reverses arrays, strings or objects.
 * Only numbers, strings or booleans are supported
 * when reverse mapping objects.
 *
 * @param val the object to reverse.
 */
function reverse(val, deep) {
    if (!is_1.isValue(val))
        return null;
    // Reverse an array.
    if (is_1.isArray(val))
        return val.reverse();
    // Reverse a string.
    if (is_1.isString(val)) {
        var i = val.toString().length;
        var tmpStr = '';
        while (i--) {
            tmpStr += val[i];
        }
        return tmpStr;
    }
    // Reverse an object.
    var result = {};
    for (var p in val) {
        if (is_1.isObject(val[p]))
            continue;
        result[val[p]] = p;
    }
    return result;
}
exports.reverse = reverse;
// export function sort<T>(val: any): T {
//   return null;
// } 
//# sourceMappingURL=collection.js.map