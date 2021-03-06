(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
__exportStar(require("./modules/array"), exports);
__exportStar(require("./modules/constant"), exports);
__exportStar(require("./modules/from"), exports);
__exportStar(require("./modules/function"), exports);
__exportStar(require("./modules/is"), exports);
__exportStar(require("./modules/object"), exports);
__exportStar(require("./modules/string"), exports);
__exportStar(require("./modules/to"), exports);
__exportStar(require("./modules/type"), exports);

},{"./modules/array":3,"./modules/constant":4,"./modules/from":5,"./modules/function":6,"./modules/is":7,"./modules/object":8,"./modules/string":9,"./modules/to":10,"./modules/type":11}],2:[function(require,module,exports){
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
/* Import all methods in case need to add to window */
var chek = require("./chek");
/* istanbul ignore if */
chek.toWindow('chek', chek, ['tryRequire', 'isNode']);
__exportStar(require("./types"), exports);
__exportStar(require("./modules/array"), exports);
__exportStar(require("./modules/constant"), exports);
__exportStar(require("./modules/from"), exports);
__exportStar(require("./modules/function"), exports);
__exportStar(require("./modules/is"), exports);
__exportStar(require("./modules/object"), exports);
__exportStar(require("./modules/string"), exports);
__exportStar(require("./modules/to"), exports);
__exportStar(require("./modules/type"), exports);
exports.default = chek;

},{"./chek":1,"./modules/array":3,"./modules/constant":4,"./modules/from":5,"./modules/function":6,"./modules/is":7,"./modules/object":8,"./modules/string":9,"./modules/to":10,"./modules/type":11,"./types":12}],3:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.unshift = exports.splice = exports.shift = exports.push = exports.pop = exports.last = exports.includesAny = exports.includes = exports.first = exports.flatten = exports.keys = exports.duplicates = exports.containsAny = exports.contains = exports.orderBy = void 0;
var is_1 = require("./is");
function defComparator(a, b) { return a < b ? -1 : a > b ? 1 : 0; }
function normComparator(primer, order) {
    var comp = defComparator;
    var reverse = false;
    if (primer)
        comp = function (a, b) { return defComparator(primer(a), primer(b)); };
    if (order && /^(desc|descending|-1|true)/.test(order + ''))
        return function (a, b) {
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
function orderBy(arr) {
    var fields = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        fields[_i - 1] = arguments[_i];
    }
    var primer = function (v) { return v; };
    // Allows common primer function to be last arg in fields.
    if (is_1.isFunction(last(fields)))
        primer = (fields.pop());
    if (!fields.length) {
        var hasNumbers_1 = is_1.isNumber(first(arr)) && is_1.isNumber(last(arr));
        return arr.sort(function (a, b) {
            a = primer(a);
            b = primer(b);
            if (hasNumbers_1)
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
    fields = fields.map(function (f) {
        var field = f;
        if (is_1.isString(field)) {
            field = { key: f };
            field.order = /^-/.test(f + ''); // if prefixed with - is reversed.
        }
        else if (is_1.isArray(field)) {
            field = { key: f[0] };
            field.order = f[1];
        }
        field.primer = field.primer || primer;
        field.comparator = normComparator(field.primer, field.order);
        return field;
    });
    var comparator = function (a, b) {
        var result;
        for (var _i = 0, _a = fields; _i < _a.length; _i++) {
            var field = _a[_i];
            result = field.comparator(a[field.key], b[field.key]);
            if (result !== 0)
                break;
        }
        return result;
    };
    return arr.sort(comparator);
}
exports.orderBy = orderBy;
/**
 *
 * Contains
 * Tests if array contains value.
 *
 * @param arr the array to be inspected.
 * @param value the value to check if is contained in array.
 */
function contains(arr, value, transform) {
    arr = arr || [];
    if (is_1.isString(arr))
        arr = arr.split('');
    return arr.filter(function (v) {
        if (transform)
            v = transform(v);
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
function containsAny(arr, compare, transform) {
    if (is_1.isString(arr))
        arr = arr.split('');
    if (is_1.isString(compare))
        compare = compare.split('');
    if (!is_1.isArray(arr) || !is_1.isArray(compare))
        return false;
    return compare.filter(function (c) {
        return contains(arr, c, transform);
    }).length > 0;
}
exports.containsAny = containsAny;
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
 * Keys
 * Takes an object then returns keys in array.
 *
 * @param obj the object to parse keys.
 */
function keys(obj) {
    if (!is_1.isObject(obj))
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
 *
 * Includes
 * Tests if array contains value.
 *
 * @param arr the array to be inspected.
 * @param value the value to check if is contained in array.
 */
/* istanbul ignore next */
function includes(arr, value, transform) {
    return contains(arr, value, transform);
}
exports.includes = includes;
/**
 *
 * Includes Any
 * Tests if array contains any value.
 *
 * @param arr the array to be inspected.
 * @param compare the array to compare.
 */
/* istanbul ignore next */
function includesAny(arr, compare, transform) {
    return containsAny(arr, compare, transform);
}
exports.includesAny = includesAny;
/**
 * Last
 * Simple method to get last element.
 *
 * @param arr the array to get last element.
 */
function last(arr) {
    return (arr && arr[arr.length - 1]) || undefined;
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
    return {
        array: arr.slice(0, arr.length - 1),
        val: arr[arr.length - 1]
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
        array: arr,
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
        array: shifted.array,
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
        array: arr,
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
        array: arr,
        val: arr.length
    };
}
exports.unshift = unshift;

},{"./is":7}],4:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toStr = void 0;
exports.toStr = Object.prototype.toString;

},{}],5:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fromJSON = exports.fromEpoch = void 0;
var is_1 = require("./is");
var function_1 = require("./function");
var to_1 = require("./to");
/**
 * From Epoch
 * Converts to a Date from an epoch.
 *
 * @param val the epoch value to convert to date.
 */
function fromEpoch(val, def) {
    if (!is_1.isValue(val) || !is_1.isNumber(val))
        return to_1.toDefault(null, def);
    return new Date(val);
}
exports.fromEpoch = fromEpoch;
/**
 * From JSON
 * Simple wrapper to parse json.
 * @alias tryParseJSON
 *
 * @param val the string to be parsed.
 * @param def a default fallback value on failed parse.
 */
function fromJSON(val, def) {
    return function_1.tryWrap(JSON.parse, val)(def);
}
exports.fromJSON = fromJSON;

},{"./function":6,"./is":7,"./to":10}],6:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tryRootRequire = exports.tryRequire = exports.tryWrap = exports.noopIf = exports.noop = void 0;
var is_1 = require("./is");
var to_1 = require("./to");
/* istanbul ignore next */
/**
 * Noop
 */
function noop() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
}
exports.noop = noop;
/**
 * Noop If
 * If function provided return no operation funciton.
 *
 * @param fn optional function.
 */
function noopIf(fn) {
    return fn || noop;
}
exports.noopIf = noopIf;
/**
 * Try Wrap
 * Generic helper for calling try catch on a method.
 * If a default method is provided it will return in on error
 * otherwise it will return null.
 *
 * @example
 * function func(val: any) { return isString(val); }
 * const result = tryWrap(func)();
 *
 * With params
 * tryWrap(JSON.stringify, { name: 'Adele', age: 30 }, null, 2)()
 *
 * With default
 * tryWrap(Number, '30')(35);
 * Where '35' is the default value on error.
 *
 * @param fn the parse method to be called in try/parse block.
 * @param args arguments to pass to above method.
 */
function tryWrap(fn) {
    var args = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        args[_i - 1] = arguments[_i];
    }
    return function (def) {
        try {
            return fn.apply(void 0, args);
        }
        catch (ex) {
            if (is_1.isFunction(def))
                return def(ex);
            return to_1.toDefault(def);
        }
    };
}
exports.tryWrap = tryWrap;
/**
 * Try Require
 * Tries to require a module returns null
 * if cannot require or empty object.
 *
 * @param name the name of module to try and require.
 * @param def optional default value on null.
 * @param isRoot used internally by tryRootRequire to require root modules.
 */
function tryRequire(name, def, isRoot) {
    function _require() {
        if (!is_1.isNode())
            /* istanbul ignore next */
            return to_1.toDefault(null, def);
        if (isRoot)
            return require.main.require(name);
        return require(name);
    }
    return tryWrap(_require)(def);
}
exports.tryRequire = tryRequire;
/**
 * Try Root Require
 * Tries to require module relative from root module.
 *
 * @param name the name of the module to try and require.
 * @param def the default value if null.
 */
function tryRootRequire(name, def) {
    return tryRequire(name, def);
}
exports.tryRootRequire = tryRootRequire;

},{"./is":7,"./to":10}],7:[function(require,module,exports){
(function (process,Buffer){(function (){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isWindows = exports.isValue = exports.isUnique = exports.isUndefinedOrNull = exports.isUndefined = exports.isType = exports.isTruthy = exports.isSymbol = exports.isString = exports.isRoot = exports.isRegExp = exports.isPromise = exports.isPlainObject = exports.isObject = exports.isMoment = exports.isNumber = exports.isNull = exports.isNode = exports.isInteger = exports.isInspect = exports.isInfinite = exports.isFunction = exports.isFloat = exports.isDocker = exports.isDirectory = exports.isFile = exports.isError = exports.isEqual = exports.isEmpty = exports.isDebug = exports.isDate = exports.isBuffer = exports.isBrowser = exports.isBoolean = exports.isArray = void 0;
var constant_1 = require("./constant");
var to_1 = require("./to");
var function_1 = require("./function");
var array_1 = require("./array");
var existsSync, statSync, readFileSync;
if (isNode()) {
    var fs = require('fs');
    existsSync = fs.existsSync.bind(fs);
    statSync = fs.statSync.bind(fs);
    readFileSync = fs.readFileSync.bind(fs);
}
/**
 * Is Array
 * Check if value is an array.
 *
 * @param val the value to test if is array.
 */
function isArray(val) {
    /* istanbul ignore if */
    if (!Array.isArray)
        return constant_1.toStr.call(val) === '[object Array]';
    return Array.isArray(val);
}
exports.isArray = isArray;
/**
 * Is Boolean
 *
 * @param val
 */
function isBoolean(val) {
    return isValue(val) && typeof val === 'boolean';
}
exports.isBoolean = isBoolean;
/**
 * Is Browser
 * Checks if script is running in browser.
 *
 * @param override an optional key to inspect on process.env.
 */
function isBrowser(override) {
    // Enables checking a process.env key while
    // in Node.
    if (override)
        return typeof process !== 'undefined' &&
            function_1.tryWrap(to_1.toBoolean, process.env &&
                process.env[override])(false) === true;
    // Otherwise just return NOT Node.
    return !isNode();
}
exports.isBrowser = isBrowser;
/**
 * Is Buffer
 * Checks if value is an instanceof Buffer.
 *
 * @param val the value to inspect as Buffer.
 */
function isBuffer(val) {
    return isValue(val) && (val instanceof Buffer);
}
exports.isBuffer = isBuffer;
/**
 * Is Date
 * Inspects if is Date, parses date string when
 * parse flag is set to true.
 *
 * @param val the value to inspect/test if is Date.
 * @param parse when true the value is parsed to see if is date.
 */
function isDate(val) {
    return (isValue(val) &&
        val.constructor &&
        val.constructor === Date);
}
exports.isDate = isDate;
/**
 * Indicates if app is in debug mode.
 * @param debugging a manual flag to denote debugging.
 */
function isDebug(debugging) {
    // If manually passed just return.
    if (isValue(debugging))
        return debugging;
    var eargv = process && process.execArgv;
    function chkDebug() {
        return (eargv.filter(function (v) { return /^(--debug|--inspect)/.test(v); }).length ||
            isValue(v8debug));
    }
    return function_1.tryWrap(chkDebug)(false);
}
exports.isDebug = isDebug;
/**
 * Is Empty
 * Test if value provided is empty.
 * Note 0 would be empty.
 *
 * @param val value to be inspected.
 */
function isEmpty(val) {
    return (isUndefined(val) ||
        isNull(val) ||
        (isString(val) && val.length === 0) ||
        (isNumber(val) && isNaN(val)) ||
        (isPlainObject(val) && !array_1.keys(val).length) ||
        (isArray(val) && !val.length));
}
exports.isEmpty = isEmpty;
/**
 * Is Equal
 * Tests if two values are equal.
 * Does not support "deep equal".
 *
 * @param val the value to be compared.
 * @param comp the comparer value.
 * @param loose when true == is used instead of ===.
 */
function isEqual(val, comp, loose) {
    if (isDate(val) && isDate(comp))
        return to_1.toEpoch(val) === to_1.toEpoch(comp);
    if (loose)
        return val == comp;
    return val === comp;
}
exports.isEqual = isEqual;
/**
 * Is Error
 * Checks if value is an error. Allows custom error property
 * which can be useful in certain scenarios to flag an object
 * as an error.
 *
 * @param val the value/object to be inspected.
 * @param prop a custom property to check if exists indicating is error.
 */
function isError(val, prop) {
    if (!isValue(val) || !isObject(val))
        return false;
    var type = constant_1.toStr.call(val).toLowerCase();
    return type === '[object error]' || type === '[object domexception]' || !isEmpty(val[prop]);
}
exports.isError = isError;
/**
 * Is File
 * Checks if value is path to file in filesytem.
 * NODE ONLY!
 *
 * @param val the value to inspect as file.
 */
function isFile(val) {
    return (isNode() &&
        existsSync(val) &&
        statSync(val).isFile());
}
exports.isFile = isFile;
/**
 * Is Directory
 * Checks if value is path to directory in filesytem.
 * NODE ONLY!
 *
 * @param val the value to inspect as file.
 */
function isDirectory(val) {
    return (isNode() &&
        existsSync(val) &&
        statSync(val).isDirectory());
}
exports.isDirectory = isDirectory;
/**
 * Is Docker
 * Checks if running inside Docker container.
 */
function isDocker() {
    if (!isNode())
        return false;
    var hasEnv = function_1.tryWrap(function () {
        statSync('/.dockerenv');
        return true;
    })(false);
    var hasGroup = function_1.tryWrap(function () {
        return ~readFileSync('/proc/self/cgroup', 'utf8').indexOf('docker');
    })(false);
    return hasEnv || hasGroup;
}
exports.isDocker = isDocker;
/**
 * Is Float
 * Checks if number is float.
 *
 * @param val the value to inspect.
 */
function isFloat(val) {
    return (isNumber(val) &&
        Number(val) === val && val % 1 !== 0);
}
exports.isFloat = isFloat;
/**
 * Is Function
 * Check if object provided is function.
 *
 * @param val - test object provided is function.
 */
function isFunction(val) {
    return isValue(val) && typeof val === 'function';
}
exports.isFunction = isFunction;
/**
 * Is Infinite
 * Checks if value is Infinity.
 *
 * @param val the value to test if infinite.
 */
function isInfinite(val) {
    return val === Infinity;
}
exports.isInfinite = isInfinite;
/**
 * Indicates if app is started with --inspect flag.
 *
 * @param inspecting a manual flag to denote inspecting.
 */
function isInspect(inspecting) {
    // If manually passed just return.
    if (isValue(inspecting))
        return inspecting;
    var eargv = process && process.execArgv;
    function chkInspect() {
        return (eargv.indexOf('--inspect') !== -1 ||
            eargv.indexOf('--inspect-brk') !== -1);
    }
    return function_1.tryWrap(chkInspect)(false);
}
exports.isInspect = isInspect;
/**
 * Is Integer
 * Checks if numbers is an integer.
 *
 * @param val the value to inspect.
 */
function isInteger(val) {
    return (isNumber(val) &&
        (val % 1 === 0));
}
exports.isInteger = isInteger;
/**
 * Is Node
 * Tests if is NodeJS.
 */
function isNode() {
    return typeof module !== 'undefined' &&
        module.exports &&
        typeof window === 'undefined';
}
exports.isNode = isNode;
/**
 * Is Null
 * Checks if value is null.
 *
 * @param val the object to inspect for null.
 */
function isNull(val) {
    return val === null;
}
exports.isNull = isNull;
/**
 * Check if value provided is number.
 * @param val the value to be tested.
 */
function isNumber(val) {
    return !isObject(val) && !isNaN(parseFloat(val)) && isFinite(val);
}
exports.isNumber = isNumber;
/**
 * Is Moment
 * Inspects object to detect if is moment.
 *
 * @param val the object to be inspected.
 */
function isMoment(val) {
    return isObject(val) && val._isAMomentObject;
}
exports.isMoment = isMoment;
/**
 * Is Object
 * Checks if value is an object.
 *
 * @param val the value to inspect.
 */
function isObject(val) {
    return (!isUndefined(val) &&
        !isNull(val) &&
        ((val && val.constructor === Object) || typeof val === 'function' || typeof val === 'object'));
}
exports.isObject = isObject;
/**
 * Is Plain Object
 * Inspects value checking if is object literal.
 *
 * @param val the value to inspect
 */
function isPlainObject(val) {
    return val && val.constructor && val.constructor === {}.constructor;
}
exports.isPlainObject = isPlainObject;
/**
 * Is Promise
 * Checks if value is a Promise.
 *
 * @param val the value to inspect.
 * @param name optional constructor name for promise defaults to Promise.
 */
function isPromise(val, name) {
    name = name || 'Promise';
    return (!isEmpty(val) &&
        val.constructor &&
        val.constructor.name === name);
}
exports.isPromise = isPromise;
/**
 * Is Reg Expression
 * Tests if object is regular expression.
 *
 * @param val the value to inspect as RegExp.
 */
function isRegExp(val) {
    return val && val.constructor && val.constructor === RegExp;
}
exports.isRegExp = isRegExp;
/**
 * Is Root
 * If Node checks if is running under sudo.
 */
function isRoot() {
    if (!isNode())
        return false;
    return process.getuid() === 0;
}
exports.isRoot = isRoot;
/**
 * Is String
 * Inspect value provided testing if is string.
 * @param val the value to be tested.
 */
function isString(val) {
    return isValue(val) && (typeof val === 'string' || val instanceof String);
}
exports.isString = isString;
/**
 * Is Symbol
 * Checks if value is of type Symbol.
 *
 * @param val the value to inspect.
 */
function isSymbol(val) {
    return isValue(val) && typeof val === 'symbol';
}
exports.isSymbol = isSymbol;
/**
 * Is Truthy
 * Checks if value is truthy e.g. not false, 0,
 * null, undefined, empty.
 *
 * Strings such as 'false', '0',  '-' or 'no'
 * will return true. If NOT desired call toBoolean
 * on the value then pass to isTruthy.
 *
 * @param val the value to inspect.
 */
function isTruthy(val) {
    if (!isValue(val))
        return false;
    if (typeof val === 'number')
        return val > 0;
    if (isString(val) && !val.length)
        return false;
    return (val !== false &&
        val !== isNaN(val));
}
exports.isTruthy = isTruthy;
/**
 * Is Type
 * Tests if object is instanceof provided Type.
 *
 * @param val the value to inspect.
 * @param Type the instance type to match.
 */
function isType(val, Type) {
    return val instanceof Type;
}
exports.isType = isType;
/**
 * Is Undefined
 * Tests if value is undefined.
 *
 * @param val the value to inspect
 */
function isUndefined(val) {
    return typeof val === 'undefined' || typeof val === undefined;
}
exports.isUndefined = isUndefined;
/**
 * Checks if is undefined or null value.
 * @param val the value to inspect.
 */
function isUndefinedOrNull(val) {
    return isUndefined(val) || isNull(val);
}
exports.isUndefinedOrNull = isUndefinedOrNull;
/**
 * Is Unique
 * Tests if the value is unique in the collection.
 *
 * @param arr the array to be inspected.
 * @param value the value to be matched.
 */
function isUnique(arr, value) {
    return array_1.duplicates(arr, value) === 1;
}
exports.isUnique = isUnique;
/**
 * Is Value
 * Ensures is of some value, e.g. not null
 * not undefined not isNaN & not Infinite.
 *
 * @param val the value to inspect.
 */
function isValue(val) {
    return (!isUndefined(val)
        && !isNull(val) && !(isNumber(val) && isNaN(val))
        && !isInfinite(val));
}
exports.isValue = isValue;
/**
 * Is Windows
 * Returns boolean if node is running in Windows.
 */
function isWindows() {
    if (!isNode() || !(process && process.platform))
        /* istanbul ignore next */
        return false;
    return process.platform.indexOf('win') === 0;
}
exports.isWindows = isWindows;

}).call(this)}).call(this,require('_process'),require("buffer").Buffer)
},{"./array":3,"./constant":4,"./function":6,"./to":10,"_process":19,"buffer":15,"fs":14}],8:[function(require,module,exports){
"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.pick = exports.omit = exports.create = exports.set = exports.reverse = exports.put = exports.extend = exports.clone = exports.has = exports.get = exports.del = exports.assign = void 0;
var _clone = require("clone");
var array_1 = require("./array");
var is_1 = require("./is");
var string_1 = require("./string");
var to_1 = require("./to");
var objAssign = require("object-assign");
/**
 * Match Index
 * @private
 *
 * @param prop the property to match.
 */
function matchIndex(prop) {
    if (!prop || !/\[\d+\]/.test(prop))
        return false;
    var prefix = prop.match(/[^[]+/i);
    var idx;
    var indices = prop.match(/\d+/g);
    if (!indices)
        return false;
    return {
        name: prefix[0],
        index: indices[0],
        indices: indices.slice(1)
    };
}
/**
 * Del
 * @private
 */
function _del(obj, key) {
    if (arguments.length !== 2 || !is_1.isObject(obj) || (!is_1.isArray(key) && !is_1.isString(key)))
        return null;
    var props = string_1.split(key);
    var prop = props.shift();
    var match = matchIndex(prop);
    var next = obj[prop];
    if (match)
        next = obj[match.name][match.index];
    if (props.length > 0) {
        _del(next, props);
    }
    else {
        if (match) {
            obj[match.name].splice(match.index, 1);
        }
        else {
            delete obj[prop];
        }
    }
    return obj;
}
/**
 * Get
 * @private
 */
function _get(obj, key) {
    if (!is_1.isObject(obj) || (!is_1.isArray(key) && !is_1.isString(key)))
        return null;
    var props = is_1.isArray(key) ? key : string_1.split(key);
    while (props.length && obj) {
        var prop = props.shift();
        var match = matchIndex(prop);
        if (match) {
            /* istanbul ignore next  */
            if (!is_1.isUndefined(obj[match.name])) {
                obj = obj[match.name][match.index];
                // iterate each indices and set obj to that index.
                match.indices.forEach(function (i) { return obj = obj[i]; });
            }
        }
        else {
            obj = obj[prop];
        }
    }
    return obj;
}
/**
 * Set
 * @private
 */
function _set(obj, key, val) {
    if (arguments.length !== 3 || !is_1.isObject(obj) || (!is_1.isArray(key) && !is_1.isString(key)))
        return null;
    var props = string_1.split(key);
    /* istanbul ignore if */
    // if (!isValue(val))
    //   val = {};
    var prop = props.shift();
    var match = matchIndex(prop);
    var next = obj[prop];
    if (!is_1.isValue(next) && !match)
        next = obj[prop] = {};
    if (match) {
        if (!obj[match.name])
            obj[match.name] = [];
        next = obj[match.name][match.index];
    }
    if (props.length > 0) {
        _set(next, props, val);
    }
    else {
        if (match)
            obj[match.name][match.index] = val;
        else
            obj[prop] = val;
    }
    return obj;
}
function _put(obj, key, val) {
    if (!is_1.isObject(obj) || (!is_1.isArray(key) && !is_1.isString(key)))
        return null;
    // Get current and ensure an array.
    var cur = to_1.toArray(get(obj, key), []);
    if (!is_1.isArray(val))
        val = [val];
    return _set(obj, key, __spreadArray(__spreadArray([], cur), val));
}
/**
 * Uses Object.assign if available or falls back to polyfill.
 *
 * @param obj object to assign.
 * @param args additional source object.
 */
function assign(obj) {
    var args = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        args[_i - 1] = arguments[_i];
    }
    if (Object.assign)
        return Object.assign.apply(Object, __spreadArray([obj], args));
    return objAssign.apply(void 0, __spreadArray([obj], args));
}
exports.assign = assign;
/**
 * Del
 * Removes a property within the supplied object.
 *
 * @param obj the object to inspect.
 * @param key the dot notated key or array of keys.
 * @param immutable when true original object NOT mutated.
 */
function del(obj, key, immutable) {
    if (immutable)
        return _del(assign({}, obj), key);
    return _del(obj, key);
}
exports.del = del;
/**
 * Get
 * Gets a property within the supplied object.
 *
 * @param obj the object to inspect.
 * @param key the dot notated key or array of keys.
 * @param def a default value to set if not exists.
 */
function get(obj, key, def) {
    var result = _get(assign({}, obj), key);
    if (!is_1.isValue(result) && def) {
        _set(obj, key, def);
        result = def;
    }
    return result;
}
exports.get = get;
/**
 * Has
 * Checks if property exists in object.
 *
 * @param obj the object to be inpsected.
 * @param key the key to be found.
 */
function has(obj, key) {
    if (!is_1.isObject(obj) || (!is_1.isArray(key) && !is_1.isString(key)))
        return false;
    obj = assign({}, obj);
    var props = is_1.isArray(key) ? key : string_1.split(key);
    while (props.length && obj) {
        var prop = props.shift();
        var match = matchIndex(prop);
        if (!props.length) { // no more props chek path.
            var _keys = array_1.keys(obj);
            if (match) {
                return array_1.contains(_keys, match.name) && is_1.isValue(obj[match.name][match.index]);
            }
            else {
                return array_1.contains(_keys, prop);
            }
        }
        if (match) {
            /* istanbul ignore next  */
            if (!is_1.isUndefined(obj[match.name])) {
                obj = obj[match.name][match.index];
                // iterate each indices and set obj to that index.
                match.indices.forEach(function (i) { return obj = obj[i]; });
            }
        }
        else {
            obj = obj[prop];
        }
    }
}
exports.has = has;
/**
 * Clone
 * Performs deep cloning of objects.
 *
 * @param obj object to be cloned.
 * @param json performs quick shallow clone using JSON.
 */
function clone(obj, json) {
    if (json)
        return JSON.parse(JSON.stringify(obj));
    return _clone(obj);
}
exports.clone = clone;
function extend(obj) {
    var args = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        args[_i - 1] = arguments[_i];
    }
    var shallow = false;
    var dest = obj;
    // Determine if is shallow.
    if (is_1.isBoolean(dest)) {
        shallow = dest;
        if (!args.length)
            return {};
        // get first arg as destination.
        dest = args[0];
        args = args.slice(1);
    }
    // If not an object return.
    if (!is_1.isObject(dest))
        return dest;
    var i = 0;
    while (i < args.length) {
        var src = args[i];
        if (!is_1.isObject(src))
            src = {};
        var _loop_1 = function (p) {
            if (src.hasOwnProperty(p)) {
                // Copy only top level props.
                if (shallow) {
                    if (!is_1.isUndefined(src[p]))
                        dest[p] = src[p];
                }
                else {
                    if (is_1.isArray(src[p]) && is_1.isArray(dest[p])) {
                        // Iterate the array.
                        src[p].forEach(function (v, idx) {
                            dest[p][idx] = v;
                        });
                    }
                    else if (is_1.isArray(src[p])) {
                        dest[p] = src[p];
                    }
                    else if (is_1.isPlainObject(src[p])) {
                        dest[p] = extend(dest[p] || {}, src[p]);
                    }
                    else {
                        if (!is_1.isUndefined(src[p]))
                            dest[p] = src[p];
                    }
                }
            }
        };
        for (var p in src) {
            _loop_1(p);
        }
        i++;
    }
    return dest;
}
exports.extend = extend;
/**
 * Put a value to key. If the value is not currently an array it converts.
 *
 * @param obj the object to push value to.
 * @param key the key or array of keys to be joined as dot notation.
 * @param val the value to be pushed.
 * @param immutable when true update in immutable mode.
 */
function put(obj, key, val, immutable) {
    if (immutable)
        return _put(assign({}, obj), key, val);
    return _put(obj, key, val);
}
exports.put = put;
/**
 * Reverse
 * Reverses arrays, strings or objects.
 * Only numbers, strings or booleans are supported
 * when reverse mapping objects.
 *
 * @param obj the object to reverse.
 */
function reverse(obj) {
    if (!is_1.isValue(obj))
        return null;
    // Reverse an array.
    if (is_1.isArray(obj))
        return obj.reverse();
    // Reverse a string.
    if (is_1.isString(obj)) {
        var i = obj.toString().length;
        var tmpStr = '';
        while (i--)
            tmpStr += obj[i];
        return tmpStr;
    }
    // Reverse an object.
    var result = {};
    for (var p in obj) {
        if (is_1.isObject(obj[p]))
            continue;
        result[obj[p]] = p;
    }
    return result;
}
exports.reverse = reverse;
/**
 * Set
 * Sets a value on an object using dot notation or url path.
 *
 * @todo need to refactor this method.
 *
 * @param obj the object to set the value on.
 * @param key the property used for setting the value.
 * @param value the value used for updating the property.
 * @param immutable when true the original object is NOT mutated.
 *
 */
function set(obj, key, val, immutable) {
    if (immutable)
        return _set(assign({}, obj), key, val);
    return _set(obj, key, val);
}
exports.set = set;
/**
 * Create is a convenience method that simply calls Object.create().
 * If no object is passed creates using null.
 *
 * @param obj optional object to use with Object.create.
 */
function create(obj) {
    return Object.create(obj || null);
}
exports.create = create;
function omit(obj, props, immutable) {
    props = to_1.toArray(props, []);
    if (!is_1.isValue(obj) || (!is_1.isArray(obj) && !is_1.isObject(obj) && !is_1.isString(obj)) || !props || !props.length)
        return obj;
    props = to_1.toArray(props);
    // Note replaces double spaces only after
    // removing props from string. Also removes
    // space if trailed by any of the following
    // punctuation: .!?;,:
    if (is_1.isString(obj)) {
        return props.reduce(function (a, c) {
            if ((c instanceof RegExp))
                return a.replace(c, '');
            a = (a.slice(0, a.indexOf(c)) + a.slice(a.indexOf(c) + c.length)).replace(/\s{2}/, ' ');
            a = a.replace(/\s[.!?;,:]/, a.slice(a.length - 1));
            return a;
        }, obj);
    }
    if (is_1.isArray(obj))
        return obj.filter(function (v) { return !~props.indexOf(v); });
    if (!immutable)
        return props.reduce(function (a, c) { return del(a, c); }, obj);
    return props.reduce(function (a, c) { return del(a, c, true); }, obj);
}
exports.omit = omit;
/**
 * Picks values from object by property name.
 *
 * @param obj the object to pick from.
 * @param props the properties to be picked.
 */
function pick(obj, props) {
    props = to_1.toArray(props, []);
    if (!is_1.isValue(obj) || !is_1.isObject(obj) || !props || !props.length)
        return obj;
    return props.reduce(function (a, c) {
        var val = get(obj, c, undefined);
        if (is_1.isUndefined(val))
            return a;
        return set(a, c, val);
    }, {});
}
exports.pick = pick;

},{"./array":3,"./is":7,"./string":9,"./to":10,"clone":16,"object-assign":18}],9:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.uuid = exports.uppercase = exports.titlecase = exports.slugify = exports.split = exports.padValues = exports.padRight = exports.padLeft = exports.lowercase = exports.capitalize = exports.decamelcase = exports.camelcase = void 0;
var is_1 = require("./is");
var to_1 = require("./to");
/**
 * Camelcase
 * Converts string to camelcase.
 *
 * @param val the value to be transformed.
 */
function camelcase(val) {
    if (!is_1.isValue(val))
        return null;
    var result = val.replace(/[^A-Za-z0-9]/g, ' ').replace(/^\w|[A-Z]|\b\w|\s+/g, function (m, i) {
        if (+m === 0 || /(\.|-|_)/.test(m))
            return '';
        return i === 0 ? m.toLowerCase() : m.toUpperCase();
    });
    return result.charAt(0).toLowerCase() + result.slice(1);
}
exports.camelcase = camelcase;
/**
 * Decamelcase converts a camelcase string to --some-flag.
 *
 * @param val the value to de-camelize.
 * @param separator the separator char once decamelized.
 */
function decamelcase(val, separator) {
    if (separator === void 0) { separator = '-'; }
    if (!is_1.isValue(val))
        return null;
    return val
        .replace(/([a-z\d])([A-Z])/g, '$1' + separator + '$2')
        .replace(/([A-Z]+)([A-Z][a-z\d]+)/g, '$1' + separator + '$2')
        .toLowerCase();
}
exports.decamelcase = decamelcase;
/**
 * Capitalize
 * Converts string to capitalize.
 *
 * @param val the value to be transformed.
 */
function capitalize(val) {
    if (!is_1.isValue(val))
        return null;
    val = val.toLowerCase();
    return "" + val.charAt(0).toUpperCase() + val.slice(1);
}
exports.capitalize = capitalize;
/**
 * Lowercase
 * Converts string to lowercase.
 *
 * @param val the value to be transformed.
 */
function lowercase(val) {
    if (!is_1.isValue(val))
        return null;
    return val.toLowerCase();
}
exports.lowercase = lowercase;
/**
 * Pad Left
 * Pads a string on the left.
 *
 * @param val the string to be padded.
 * @param len the length to pad.
 * @param offset an offset number or string to be counted.
 * @param char the character to pad with.
 */
function padLeft(val, len, offset, char) {
    /* istanbul ignore if */
    if (!is_1.isValue(val) || !is_1.isString(val))
        return null;
    // If offset is a string
    // count its length.
    if (is_1.isString(offset))
        offset = offset.length;
    char = char || ' ';
    var pad = '';
    while (len--) {
        pad += char;
    }
    if (offset)
        return padLeft('', offset, null, char) + pad + val;
    return pad + val;
}
exports.padLeft = padLeft;
/**
 * Pad Right
 * Pads a string to the right.
 *
 * @param val the string to be padded.
 * @param len the length to pad.
 * @param offset an offset value to add.
 * @param char the character to pad with.
 */
function padRight(val, len, offset, char) {
    /* istanbul ignore if */
    if (!is_1.isValue(val) || !is_1.isString(val))
        return null;
    // If offset is a string
    // count its length.
    if (is_1.isString(offset))
        offset = offset.length;
    char = char || ' ';
    while (len--) {
        val += char;
    }
    if (offset)
        val += padRight('', offset, null, char);
    return val;
}
exports.padRight = padRight;
/**
 * Pad Values
 *
 * @param values the values to be padded.
 * @param dir the direction to pad.
 * @param offset an offset value to add.
 * @param char the character to pad with.
 */
function padValues(arr, strategy, offset, char) {
    /* istanbul ignore if */
    if (!is_1.isValue(arr) || !is_1.isArray(arr))
        return null;
    // If offset is a string
    // count its length.
    if (is_1.isString(offset))
        offset = offset.length;
    // do nothing.
    if (strategy === 'none')
        return arr;
    var len = 0;
    strategy = strategy || 'right';
    char = char || ' ';
    var func = strategy === 'right' ? padRight : padLeft;
    arr.forEach(function (item) {
        if (item.length > len)
            len = item.length;
    });
    if (offset)
        len += offset;
    arr.forEach(function (item, i) {
        if (item.length < len)
            arr[i] = func(item, len - item.length, null, char);
    });
    return arr;
}
exports.padValues = padValues;
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
function split(val, chars) {
    if (is_1.isArray(val))
        return val;
    if (!is_1.isValue(val) || !is_1.isString(val))
        return null;
    // default characters.
    var defChars = ['/', '.', ',', ';', '|'];
    var char;
    chars = chars ? to_1.toArray(chars) : defChars;
    // if no char iterate defaults.
    var i = 0;
    while (i < chars.length && !char) {
        if (val.indexOf(chars[i]) !== -1) {
            char = chars[i];
        }
        i++;
    }
    if (!is_1.isValue(char))
        return [val];
    var arr = val.split(char).map(function (v) { return v.trim(); });
    // If empty remove first element.
    // this happens when splitting on
    // char and is first char in string.
    if (is_1.isEmpty(arr[0]))
        arr.shift();
    return arr;
}
exports.split = split;
/**
 * Slugify
 * Slugifies string.
 *
 * @param val the value to be transformed.
 * @param def optional default value on null.
 */
function slugify(val) {
    if (!is_1.isValue(val))
        return null;
    val = val.replace(/^\s+|\s+$/g, '').toLowerCase();
    // replace accents etc.
    var from = 'ãàáäâẽèéëêìíïîõòóöôùúüûñç·/_,:;';
    var to = 'aaaaaeeeeeiiiiooooouuuunc------';
    for (var i = 0, l = from.length; i < l; i++) {
        val = val.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
    }
    val = val.replace(/[^a-z0-9 -]/g, '') // replace invalid chars.
        .replace(/\s+/g, '-') // replace whitespace with -
        .replace(/-+/g, '-'); // replace multiple dashes with single.
    return val;
}
exports.slugify = slugify;
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
function titlecase(val, conjunctions) {
    if (!is_1.isValue(val))
        return null;
    // conjunctions
    var conj = /^(a|an|and|as|at|but|by|en|for|if|in|nor|of|on|or|per|the|to|vs?\.?|via)$/i;
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
exports.titlecase = titlecase;
/**
 * Uppercase
 * Converts string to uppercase.
 *
 * @param val the value to be transformed.
 */
function uppercase(val) {
    if (!is_1.isValue(val))
        return null;
    return val.toUpperCase();
}
exports.uppercase = uppercase;
/**
 * UUID
 * Generates a UUID.
 */
function uuid() {
    var d = Date.now();
    // Use high perf timer if avail.
    /* istanbul ignore next */
    if (typeof performance !== 'undefined' && is_1.isFunction(performance.now))
        d += performance.now();
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);
        return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
}
exports.uuid = uuid;

},{"./is":7,"./to":10}],10:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toWindow = exports.toUnnested = exports.toString = exports.toRegExp = exports.toNumber = exports.toNested = exports.toMap = exports.toInteger = exports.toJSON = exports.toFloat = exports.toEpoch = exports.toDefault = exports.toDate = exports.toBoolean = exports.toArray = void 0;
var array_1 = require("./array");
var from_1 = require("./from");
var is_1 = require("./is");
var object_1 = require("./object");
var function_1 = require("./function");
var string_1 = require("./string");
function toArray(val, id, def) {
    if (is_1.isArray(id)) {
        def = id;
        id = undefined;
    }
    if (!is_1.isValue(val))
        return toDefault(null, def || []);
    if (is_1.isArray(val))
        return val;
    var ARRAY_LIKE_EXP = /^(.+(,|\||\s).+){1,}$/;
    // id = id || '$id';
    if (is_1.isPlainObject(val) && id) {
        var arr = [];
        for (var p in val) {
            if (val.hasOwnProperty(p)) {
                var cur = val[p];
                if (is_1.isPlainObject(cur)) {
                    var tmp = {};
                    tmp[id] = p;
                    var obj = Object.assign({}, cur, tmp);
                    arr = array_1.push(arr, obj).array;
                }
                else {
                    arr = array_1.push(arr, val).array;
                }
            }
        }
        return arr;
    }
    if (is_1.isString(val) && ARRAY_LIKE_EXP.test(val)) {
        var arr = string_1.split(val);
        return arr;
    }
    return [val];
}
exports.toArray = toArray;
/**
 * To Boolean
 * Converts value if not boolean to boolean.
 * Will convert 'true', '1', 'yes' or '+' to true.
 *
 * @param val the value to inspect.
 * @param def optional default value on null.
 */
function toBoolean(val, def) {
    if (is_1.isBoolean(val))
        return val;
    if (!is_1.isValue(val))
        return toDefault(null, def);
    val = val.toString();
    return (parseFloat(val) > 0 ||
        is_1.isInfinite(val) ||
        val === 'true' ||
        val === 'yes' ||
        val === '1' ||
        val === '+');
}
exports.toBoolean = toBoolean;
/**
 * To Date
 * Converts value to date using Date.parse when string.
 * Optionally you can pass a format object containing
 * Intl.DateFormatOptions and locales. You may also pass
 * the timezone ONLY as a string. In this case locale en-US
 * is assumed.
 *
 * @param val the value to be converted to date.
 * @param format date locale format options.
 * @param def a default date when null.
 */
function toDate(val, format, def) {
    if (is_1.isDate(format)) {
        def = format;
        format = undefined;
    }
    var opts = format;
    // Date format options a simple timezine
    // ex: 'America/Los_Angeles'.
    if (is_1.isString(opts)) {
        opts = {
            timeZone: format
        };
    }
    // This just checks loosely if string is
    // date like string, below parse should
    // catch majority of scenarios.
    function canParse() {
        return !/^[0-9]+$/.test(val) &&
            (is_1.isString(val) && /[0-9]/g.test(val) &&
                /(\.|\/|-|:)/g.test(val));
    }
    function parseDate() {
        var epoch = Date.parse(val);
        if (!isNaN(epoch)) {
            var date = from_1.fromEpoch(epoch);
            if (opts) {
                opts.locales = opts.locales || 'en-US';
                date = new Date(date.toLocaleString(opts.locales, opts));
            }
            return date;
        }
        return toDefault(null, def);
    }
    if (is_1.isDate(val))
        return val;
    if (!canParse())
        return toDefault(null, def);
    return function_1.tryWrap(parseDate)(def);
}
exports.toDate = toDate;
/**
 * To Default
 * Returns a default value when provided if
 * primary value is null or undefined. If neither
 * then null is returned.
 *
 * @param val the value to return if defined.
 * @param def an optional default value to be returned.
 */
function toDefault(val, def) {
    if (is_1.isValue(val) && !(is_1.isEmpty(val) && !is_1.isEmpty(def)))
        return val;
    return is_1.isValue(def) ? def : null;
}
exports.toDefault = toDefault;
/**
 * To Epoch
 * Converts a Date type to an epoch.
 *
 * @param val the date value to convert.
 * @param def optional default value when null.
 */
function toEpoch(val, def) {
    return toDefault((is_1.isDate(val) && val.getTime()), def);
}
exports.toEpoch = toEpoch;
/**
 * To Float
 * Converts value to a float.
 *
 * @param val the value to convert to float.
 */
function toFloat(val, def) {
    if (is_1.isFloat(val))
        return val;
    if (!is_1.isValue(val))
        return toDefault(null, def);
    var parsed = function_1.tryWrap(parseFloat, val)(def);
    if (is_1.isFloat(parsed) || is_1.isNumber(parsed))
        return parsed;
    if (toBoolean(val))
        return 1;
    return 0;
}
exports.toFloat = toFloat;
/**
 * To JSON
 * Simple wrapper to strinigy using JSON.
 *
 * @param obj the object to be stringified.
 * @param pretty an integer or true for tabs in JSON.
 * @param def optional default value on null.
 */
function toJSON(obj, pretty, def) {
    if (is_1.isString(pretty)) {
        def = pretty;
        pretty = undefined;
    }
    var tabs = 0;
    pretty = is_1.isBoolean(pretty) ? 2 : pretty;
    tabs = pretty ? pretty : tabs;
    if (!is_1.isObject(obj))
        return toDefault(null, def);
    return function_1.tryWrap(JSON.stringify, obj, null, tabs)(def);
}
exports.toJSON = toJSON;
/**
 * To Integer
 * Convert value to integer.
 *
 * @param val the value to convert to integer.
 * @param def optional default value on null or error.
 */
function toInteger(val, def) {
    if (!is_1.isValue(val))
        return toDefault(null, def);
    var parsed = function_1.tryWrap(parseInt, val)(def);
    if (is_1.isInteger(parsed))
        return parsed;
    if (toBoolean(val))
        return 1;
    return 0;
}
exports.toInteger = toInteger;
/**
 * To Map
 * Converts arrays, strings, to an object literal.
 *
 * @example
 * Array: ['one', 'two', 'three'] Maps To: { 0: 'one', 1: 'two', 2: 'three' }
 * String: 'Star Wars' Maps To: { 0: 'Star Wars' }
 * String: 'Star Wars, Star Trek' Maps To { 0: 'Star Wars', 1: 'Star Trek' }
 * Array: [{ id: '123', name: 'Joe' }] Maps To: { 123: { name: 'Joe' }}
 * Array: [{ name: 'Joe' }, { name: 'Amy' }]
 * Maps To: { 0: { name: 'Joe' }, 2: { name: 'Amy' }}
 *
 * NOTE: mixed content arrays not supported.
 *
 * @param val the value to be mapped.
 * @param id optional id key when iterating array of objects.
 * @param def optional default value on null or error.
 */
function toMap(val, id, def) {
    if (is_1.isValue(id) && !is_1.isString(id)) {
        def = id;
        id = undefined;
    }
    if (is_1.isPlainObject(val))
        return val;
    if (!is_1.isValue(val) || (!is_1.isString(val) && !is_1.isArray(val)))
        return toDefault(null, def);
    // Default id key.
    id = id || '$id';
    var exp = /(\/|\.|,|;|\|)/g;
    var i = 0;
    var obj = {};
    if (is_1.isString(val)) {
        // simple string.
        if (!exp.test(val))
            return { 0: val };
        // split string into array, iterate.
        val = string_1.split(val);
        val.forEach(function (v, i) { return obj[i] = v; });
        return obj;
    }
    while (i < val.length) {
        if (is_1.isString(val[i])) {
            obj[i] = val[i];
        }
        else if (is_1.isPlainObject(val[i])) {
            var itm = Object.assign({}, val[i]);
            var key = itm[id] ? itm[id] : i;
            obj[key] = itm[id] ? object_1.del(itm, id) : itm;
        }
        i++;
    }
    return obj;
}
exports.toMap = toMap;
/**
 * To Nested
 * Takes an object that was flattened by toUnnested
 * and re-nests it.
 *
 * @param val the flattened object to be nested.
 */
function toNested(val, def) {
    function nest(src) {
        var dest = {};
        for (var p in src) {
            if (src.hasOwnProperty(p))
                if (/\./g.test(p))
                    object_1.set(dest, p, src[p]);
                else
                    dest[p] = src[p];
        }
        return dest;
    }
    return function_1.tryWrap(nest, val)(def);
}
exports.toNested = toNested;
/**
 * To Number
 * Converts value to number.
 *
 * @param val the value to convert to number.
 * @param def optional default value on null.
 */
function toNumber(val, def) {
    return toFloat(val);
}
exports.toNumber = toNumber;
/**
 * To Regular Expression
 * Attempts to convert to a regular expression
 * from a string.
 *
 * @param val the value to convert to RegExp.
 * @param def optional express as default on null.
 */
function toRegExp(val, def) {
    var exp = /^\/.+\/(g|i|m)?([m,i,u,y]{1,4})?/;
    var optsExp = /(g|i|m)?([m,i,u,y]{1,4})?$/;
    if (is_1.isRegExp(val))
        return val;
    if (!is_1.isValue(val) || !is_1.isString(val))
        return toDefault(null, def);
    function regExpFromStr() {
        var opts;
        if (exp.test(val)) {
            opts = optsExp.exec(val)[0];
            val = val.replace(/^\//, '').replace(optsExp, '').replace(/\/$/, '');
        }
        return new RegExp(val, opts);
    }
    return function_1.tryWrap(regExpFromStr)(def);
}
exports.toRegExp = toRegExp;
/**
 * To String
 * When not null or undefined calls to string method on object.
 *
 * @param val the value to convert to string.
 * @param def optional default value on null.
 */
function toString(val, def) {
    if (is_1.isString(val))
        return val;
    if (!is_1.isValue(val))
        return toDefault(null, def);
    function _toString() {
        return val.toString();
    }
    return function_1.tryWrap(_toString)(def);
}
exports.toString = toString;
/**
 * To Unnested
 * Takes a nested object and flattens it
 * to a single level safely. To disable key
 * prefixing set prefix to false.
 *
 * @param val the object to be unnested.
 * @param prefix when NOT false parent key is prefixed to children.
 * @param def optional default value on null.
 */
function toUnnested(obj, prefix, def) {
    if (is_1.isValue(prefix) && !is_1.isBoolean(prefix)) {
        def = prefix;
        prefix = undefined;
    }
    var dupes = 0;
    function unnest(src, dest, pre) {
        dest = dest || {};
        for (var p in src) {
            if (dupes > 0)
                return;
            if (src.hasOwnProperty(p)) {
                if (is_1.isPlainObject(src[p])) {
                    var parent = prefix !== false &&
                        (pre && pre.length) ?
                        pre + '.' + p : p;
                    unnest(src[p], dest, parent);
                }
                else {
                    var name = prefix !== false &&
                        pre && pre.length ?
                        pre + '.' + p : p;
                    if (dest[name])
                        dupes += 1;
                    else
                        dest[name] = src[p];
                }
            }
        }
        if (dupes > 0)
            return null;
        return dest;
    }
    return function_1.tryWrap(unnest, object_1.clone(obj))(def);
}
exports.toUnnested = toUnnested;
/**
 * To Window
 * Adds key to window object if is browser.
 *
 * @param key the key or object to add to the window object.
 * @param val the corresponding value to add to window object.
 * @param exclude string or array of keys to exclude.
 */
function toWindow(key, val, exclude) {
    /* istanbul ignore if */
    if (!is_1.isBrowser())
        return;
    exclude = toArray(exclude);
    var _keys, i;
    // key/val was passed.
    if (is_1.isString(key)) {
        if (!is_1.isPlainObject(val)) {
            window[key] = val;
        }
        else {
            var obj = {};
            _keys = array_1.keys(val);
            i = _keys.length;
            while (i--) {
                if (!array_1.contains(exclude, _keys[i]))
                    obj[_keys[i]] = val[_keys[i]];
            }
            window[key] = obj;
        }
    }
    // object passed to key.
    else if (is_1.isPlainObject(key)) {
        _keys = array_1.keys(key);
        i = _keys.length;
        while (i--) {
            if (!array_1.contains(exclude, _keys[i]))
                window[_keys[i]] = key[_keys[i]];
        }
    }
}
exports.toWindow = toWindow;

},{"./array":3,"./from":5,"./function":6,"./is":7,"./object":8,"./string":9}],11:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getType = exports.castType = void 0;
var is_1 = require("./is");
var to_1 = require("./to");
var function_1 = require("./function");
var toMap = {
    'boolean': to_1.toBoolean,
    'date': to_1.toDate,
    'float': to_1.toFloat,
    'integer': to_1.toInteger,
    'number': to_1.toNumber,
    'regexp': to_1.toRegExp,
    'string': to_1.toString,
    'epoch': to_1.toEpoch,
    'any': function (v) { return v; }
};
/**
 * Cast Type
 * Attempts to cast to specified type.
 *
 * @param val the value to be cast.
 * @param type the type to cast to.
 * @param def optional default value to return on null.
 */
function castType(val, type, def) {
    function cast() {
        if (!is_1.isValue(val))
            return to_1.toDefault(null, def);
        // If no type specified try to get automatically.
        type = type || getType(val);
        if (is_1.isArray(type)) {
            return to_1.toArray(val)
                .map(function (v, i) { return castType(v, type[i] || type[i - 1] || type[0]); });
        }
        else if (is_1.isFunction(type)) {
            val = to_1.toArray(val);
            return type.apply(void 0, val);
        }
        else if (is_1.isString(type)) {
            type = type.toLowerCase();
            var func = toMap[type];
            if (func)
                return func(val);
            return to_1.toDefault(null, def);
        }
        else {
            return val;
        }
    }
    return function_1.tryWrap(cast)(def);
}
exports.castType = castType;
/**
 * Get Type
 * Gets the type of the provided value.
 *
 * Value                Type                  Strict
 * -------------------------------------------------
 * {}                   literal               object
 * true                 boolean               boolean
 * 'true'               boolean               string
 * 25                   integer               number
 * 25.5                 float                 number
 * new Date()           date                  date
 * '01/01/2017'         date                  string
 * RegExp               regexp                regexp
 * '/^test/g'           regexp                string
 * null                 null                  null
 * function() {}        function              function
 * []                   array                 array
 * 'some string'        string                string
 *
 * @param val the object to get type from.
 * @param strict when true returns the strict type see examples.
 * @param def the optional string name for unknown types.
 */
function getType(val, strict, def) {
    if (is_1.isString(strict)) {
        def = strict;
        strict = undefined;
    }
    var type = typeof val;
    var parse = !is_1.isValue(strict) ? true : false;
    function isKnown() {
        return (type === 'undefined' ||
            (type !== 'object' &&
                type !== 'number' &&
                type !== 'string'));
    }
    // If not 'object', 'number' or 'string' just
    // return the type, numbers, objects and strings
    // should fall through for more specific type.
    if (isKnown())
        return type;
    if (is_1.isNull(val)) {
        return 'null';
    }
    else if (is_1.isDate(val)) {
        return 'date';
    }
    else if (is_1.isNumber(val)) {
        if (strict)
            return 'number';
        if (is_1.isFloat(val))
            return 'float';
        if (is_1.isInteger(val))
            return 'integer';
        /* istanbul ignore next */
        return 'number';
    }
    else if (is_1.isPlainObject(val)) {
        if (strict)
            return type;
        return 'literal';
    }
    else if (is_1.isError(val)) {
        return 'error';
    }
    else if (is_1.isRegExp(val)) {
        return 'regexp';
    }
    else if (is_1.isArray(val)) {
        return 'array';
    }
    else if (is_1.isString(val)) {
        return 'string';
    }
    else if (val.constructor && val.constructor.name) {
        if (strict)
            return type;
        return val.constructor.name;
    }
    /* istanbul ignore next */
    return def || 'any';
}
exports.getType = getType;

},{"./function":6,"./is":7,"./to":10}],12:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

},{}],13:[function(require,module,exports){
'use strict'

exports.byteLength = byteLength
exports.toByteArray = toByteArray
exports.fromByteArray = fromByteArray

var lookup = []
var revLookup = []
var Arr = typeof Uint8Array !== 'undefined' ? Uint8Array : Array

var code = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'
for (var i = 0, len = code.length; i < len; ++i) {
  lookup[i] = code[i]
  revLookup[code.charCodeAt(i)] = i
}

// Support decoding URL-safe base64 strings, as Node.js does.
// See: https://en.wikipedia.org/wiki/Base64#URL_applications
revLookup['-'.charCodeAt(0)] = 62
revLookup['_'.charCodeAt(0)] = 63

function getLens (b64) {
  var len = b64.length

  if (len % 4 > 0) {
    throw new Error('Invalid string. Length must be a multiple of 4')
  }

  // Trim off extra bytes after placeholder bytes are found
  // See: https://github.com/beatgammit/base64-js/issues/42
  var validLen = b64.indexOf('=')
  if (validLen === -1) validLen = len

  var placeHoldersLen = validLen === len
    ? 0
    : 4 - (validLen % 4)

  return [validLen, placeHoldersLen]
}

// base64 is 4/3 + up to two characters of the original data
function byteLength (b64) {
  var lens = getLens(b64)
  var validLen = lens[0]
  var placeHoldersLen = lens[1]
  return ((validLen + placeHoldersLen) * 3 / 4) - placeHoldersLen
}

function _byteLength (b64, validLen, placeHoldersLen) {
  return ((validLen + placeHoldersLen) * 3 / 4) - placeHoldersLen
}

function toByteArray (b64) {
  var tmp
  var lens = getLens(b64)
  var validLen = lens[0]
  var placeHoldersLen = lens[1]

  var arr = new Arr(_byteLength(b64, validLen, placeHoldersLen))

  var curByte = 0

  // if there are placeholders, only get up to the last complete 4 chars
  var len = placeHoldersLen > 0
    ? validLen - 4
    : validLen

  var i
  for (i = 0; i < len; i += 4) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 18) |
      (revLookup[b64.charCodeAt(i + 1)] << 12) |
      (revLookup[b64.charCodeAt(i + 2)] << 6) |
      revLookup[b64.charCodeAt(i + 3)]
    arr[curByte++] = (tmp >> 16) & 0xFF
    arr[curByte++] = (tmp >> 8) & 0xFF
    arr[curByte++] = tmp & 0xFF
  }

  if (placeHoldersLen === 2) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 2) |
      (revLookup[b64.charCodeAt(i + 1)] >> 4)
    arr[curByte++] = tmp & 0xFF
  }

  if (placeHoldersLen === 1) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 10) |
      (revLookup[b64.charCodeAt(i + 1)] << 4) |
      (revLookup[b64.charCodeAt(i + 2)] >> 2)
    arr[curByte++] = (tmp >> 8) & 0xFF
    arr[curByte++] = tmp & 0xFF
  }

  return arr
}

function tripletToBase64 (num) {
  return lookup[num >> 18 & 0x3F] +
    lookup[num >> 12 & 0x3F] +
    lookup[num >> 6 & 0x3F] +
    lookup[num & 0x3F]
}

function encodeChunk (uint8, start, end) {
  var tmp
  var output = []
  for (var i = start; i < end; i += 3) {
    tmp =
      ((uint8[i] << 16) & 0xFF0000) +
      ((uint8[i + 1] << 8) & 0xFF00) +
      (uint8[i + 2] & 0xFF)
    output.push(tripletToBase64(tmp))
  }
  return output.join('')
}

function fromByteArray (uint8) {
  var tmp
  var len = uint8.length
  var extraBytes = len % 3 // if we have 1 byte left, pad 2 bytes
  var parts = []
  var maxChunkLength = 16383 // must be multiple of 3

  // go through the array every three bytes, we'll deal with trailing stuff later
  for (var i = 0, len2 = len - extraBytes; i < len2; i += maxChunkLength) {
    parts.push(encodeChunk(
      uint8, i, (i + maxChunkLength) > len2 ? len2 : (i + maxChunkLength)
    ))
  }

  // pad the end with zeros, but make sure to not forget the extra bytes
  if (extraBytes === 1) {
    tmp = uint8[len - 1]
    parts.push(
      lookup[tmp >> 2] +
      lookup[(tmp << 4) & 0x3F] +
      '=='
    )
  } else if (extraBytes === 2) {
    tmp = (uint8[len - 2] << 8) + uint8[len - 1]
    parts.push(
      lookup[tmp >> 10] +
      lookup[(tmp >> 4) & 0x3F] +
      lookup[(tmp << 2) & 0x3F] +
      '='
    )
  }

  return parts.join('')
}

},{}],14:[function(require,module,exports){

},{}],15:[function(require,module,exports){
(function (Buffer){(function (){
/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <https://feross.org>
 * @license  MIT
 */
/* eslint-disable no-proto */

'use strict'

var base64 = require('base64-js')
var ieee754 = require('ieee754')

exports.Buffer = Buffer
exports.SlowBuffer = SlowBuffer
exports.INSPECT_MAX_BYTES = 50

var K_MAX_LENGTH = 0x7fffffff
exports.kMaxLength = K_MAX_LENGTH

/**
 * If `Buffer.TYPED_ARRAY_SUPPORT`:
 *   === true    Use Uint8Array implementation (fastest)
 *   === false   Print warning and recommend using `buffer` v4.x which has an Object
 *               implementation (most compatible, even IE6)
 *
 * Browsers that support typed arrays are IE 10+, Firefox 4+, Chrome 7+, Safari 5.1+,
 * Opera 11.6+, iOS 4.2+.
 *
 * We report that the browser does not support typed arrays if the are not subclassable
 * using __proto__. Firefox 4-29 lacks support for adding new properties to `Uint8Array`
 * (See: https://bugzilla.mozilla.org/show_bug.cgi?id=695438). IE 10 lacks support
 * for __proto__ and has a buggy typed array implementation.
 */
Buffer.TYPED_ARRAY_SUPPORT = typedArraySupport()

if (!Buffer.TYPED_ARRAY_SUPPORT && typeof console !== 'undefined' &&
    typeof console.error === 'function') {
  console.error(
    'This browser lacks typed array (Uint8Array) support which is required by ' +
    '`buffer` v5.x. Use `buffer` v4.x if you require old browser support.'
  )
}

function typedArraySupport () {
  // Can typed array instances can be augmented?
  try {
    var arr = new Uint8Array(1)
    arr.__proto__ = { __proto__: Uint8Array.prototype, foo: function () { return 42 } }
    return arr.foo() === 42
  } catch (e) {
    return false
  }
}

Object.defineProperty(Buffer.prototype, 'parent', {
  enumerable: true,
  get: function () {
    if (!Buffer.isBuffer(this)) return undefined
    return this.buffer
  }
})

Object.defineProperty(Buffer.prototype, 'offset', {
  enumerable: true,
  get: function () {
    if (!Buffer.isBuffer(this)) return undefined
    return this.byteOffset
  }
})

function createBuffer (length) {
  if (length > K_MAX_LENGTH) {
    throw new RangeError('The value "' + length + '" is invalid for option "size"')
  }
  // Return an augmented `Uint8Array` instance
  var buf = new Uint8Array(length)
  buf.__proto__ = Buffer.prototype
  return buf
}

/**
 * The Buffer constructor returns instances of `Uint8Array` that have their
 * prototype changed to `Buffer.prototype`. Furthermore, `Buffer` is a subclass of
 * `Uint8Array`, so the returned instances will have all the node `Buffer` methods
 * and the `Uint8Array` methods. Square bracket notation works as expected -- it
 * returns a single octet.
 *
 * The `Uint8Array` prototype remains unmodified.
 */

function Buffer (arg, encodingOrOffset, length) {
  // Common case.
  if (typeof arg === 'number') {
    if (typeof encodingOrOffset === 'string') {
      throw new TypeError(
        'The "string" argument must be of type string. Received type number'
      )
    }
    return allocUnsafe(arg)
  }
  return from(arg, encodingOrOffset, length)
}

// Fix subarray() in ES2016. See: https://github.com/feross/buffer/pull/97
if (typeof Symbol !== 'undefined' && Symbol.species != null &&
    Buffer[Symbol.species] === Buffer) {
  Object.defineProperty(Buffer, Symbol.species, {
    value: null,
    configurable: true,
    enumerable: false,
    writable: false
  })
}

Buffer.poolSize = 8192 // not used by this implementation

function from (value, encodingOrOffset, length) {
  if (typeof value === 'string') {
    return fromString(value, encodingOrOffset)
  }

  if (ArrayBuffer.isView(value)) {
    return fromArrayLike(value)
  }

  if (value == null) {
    throw TypeError(
      'The first argument must be one of type string, Buffer, ArrayBuffer, Array, ' +
      'or Array-like Object. Received type ' + (typeof value)
    )
  }

  if (isInstance(value, ArrayBuffer) ||
      (value && isInstance(value.buffer, ArrayBuffer))) {
    return fromArrayBuffer(value, encodingOrOffset, length)
  }

  if (typeof value === 'number') {
    throw new TypeError(
      'The "value" argument must not be of type number. Received type number'
    )
  }

  var valueOf = value.valueOf && value.valueOf()
  if (valueOf != null && valueOf !== value) {
    return Buffer.from(valueOf, encodingOrOffset, length)
  }

  var b = fromObject(value)
  if (b) return b

  if (typeof Symbol !== 'undefined' && Symbol.toPrimitive != null &&
      typeof value[Symbol.toPrimitive] === 'function') {
    return Buffer.from(
      value[Symbol.toPrimitive]('string'), encodingOrOffset, length
    )
  }

  throw new TypeError(
    'The first argument must be one of type string, Buffer, ArrayBuffer, Array, ' +
    'or Array-like Object. Received type ' + (typeof value)
  )
}

/**
 * Functionally equivalent to Buffer(arg, encoding) but throws a TypeError
 * if value is a number.
 * Buffer.from(str[, encoding])
 * Buffer.from(array)
 * Buffer.from(buffer)
 * Buffer.from(arrayBuffer[, byteOffset[, length]])
 **/
Buffer.from = function (value, encodingOrOffset, length) {
  return from(value, encodingOrOffset, length)
}

// Note: Change prototype *after* Buffer.from is defined to workaround Chrome bug:
// https://github.com/feross/buffer/pull/148
Buffer.prototype.__proto__ = Uint8Array.prototype
Buffer.__proto__ = Uint8Array

function assertSize (size) {
  if (typeof size !== 'number') {
    throw new TypeError('"size" argument must be of type number')
  } else if (size < 0) {
    throw new RangeError('The value "' + size + '" is invalid for option "size"')
  }
}

function alloc (size, fill, encoding) {
  assertSize(size)
  if (size <= 0) {
    return createBuffer(size)
  }
  if (fill !== undefined) {
    // Only pay attention to encoding if it's a string. This
    // prevents accidentally sending in a number that would
    // be interpretted as a start offset.
    return typeof encoding === 'string'
      ? createBuffer(size).fill(fill, encoding)
      : createBuffer(size).fill(fill)
  }
  return createBuffer(size)
}

/**
 * Creates a new filled Buffer instance.
 * alloc(size[, fill[, encoding]])
 **/
Buffer.alloc = function (size, fill, encoding) {
  return alloc(size, fill, encoding)
}

function allocUnsafe (size) {
  assertSize(size)
  return createBuffer(size < 0 ? 0 : checked(size) | 0)
}

/**
 * Equivalent to Buffer(num), by default creates a non-zero-filled Buffer instance.
 * */
Buffer.allocUnsafe = function (size) {
  return allocUnsafe(size)
}
/**
 * Equivalent to SlowBuffer(num), by default creates a non-zero-filled Buffer instance.
 */
Buffer.allocUnsafeSlow = function (size) {
  return allocUnsafe(size)
}

function fromString (string, encoding) {
  if (typeof encoding !== 'string' || encoding === '') {
    encoding = 'utf8'
  }

  if (!Buffer.isEncoding(encoding)) {
    throw new TypeError('Unknown encoding: ' + encoding)
  }

  var length = byteLength(string, encoding) | 0
  var buf = createBuffer(length)

  var actual = buf.write(string, encoding)

  if (actual !== length) {
    // Writing a hex string, for example, that contains invalid characters will
    // cause everything after the first invalid character to be ignored. (e.g.
    // 'abxxcd' will be treated as 'ab')
    buf = buf.slice(0, actual)
  }

  return buf
}

function fromArrayLike (array) {
  var length = array.length < 0 ? 0 : checked(array.length) | 0
  var buf = createBuffer(length)
  for (var i = 0; i < length; i += 1) {
    buf[i] = array[i] & 255
  }
  return buf
}

function fromArrayBuffer (array, byteOffset, length) {
  if (byteOffset < 0 || array.byteLength < byteOffset) {
    throw new RangeError('"offset" is outside of buffer bounds')
  }

  if (array.byteLength < byteOffset + (length || 0)) {
    throw new RangeError('"length" is outside of buffer bounds')
  }

  var buf
  if (byteOffset === undefined && length === undefined) {
    buf = new Uint8Array(array)
  } else if (length === undefined) {
    buf = new Uint8Array(array, byteOffset)
  } else {
    buf = new Uint8Array(array, byteOffset, length)
  }

  // Return an augmented `Uint8Array` instance
  buf.__proto__ = Buffer.prototype
  return buf
}

function fromObject (obj) {
  if (Buffer.isBuffer(obj)) {
    var len = checked(obj.length) | 0
    var buf = createBuffer(len)

    if (buf.length === 0) {
      return buf
    }

    obj.copy(buf, 0, 0, len)
    return buf
  }

  if (obj.length !== undefined) {
    if (typeof obj.length !== 'number' || numberIsNaN(obj.length)) {
      return createBuffer(0)
    }
    return fromArrayLike(obj)
  }

  if (obj.type === 'Buffer' && Array.isArray(obj.data)) {
    return fromArrayLike(obj.data)
  }
}

function checked (length) {
  // Note: cannot use `length < K_MAX_LENGTH` here because that fails when
  // length is NaN (which is otherwise coerced to zero.)
  if (length >= K_MAX_LENGTH) {
    throw new RangeError('Attempt to allocate Buffer larger than maximum ' +
                         'size: 0x' + K_MAX_LENGTH.toString(16) + ' bytes')
  }
  return length | 0
}

function SlowBuffer (length) {
  if (+length != length) { // eslint-disable-line eqeqeq
    length = 0
  }
  return Buffer.alloc(+length)
}

Buffer.isBuffer = function isBuffer (b) {
  return b != null && b._isBuffer === true &&
    b !== Buffer.prototype // so Buffer.isBuffer(Buffer.prototype) will be false
}

Buffer.compare = function compare (a, b) {
  if (isInstance(a, Uint8Array)) a = Buffer.from(a, a.offset, a.byteLength)
  if (isInstance(b, Uint8Array)) b = Buffer.from(b, b.offset, b.byteLength)
  if (!Buffer.isBuffer(a) || !Buffer.isBuffer(b)) {
    throw new TypeError(
      'The "buf1", "buf2" arguments must be one of type Buffer or Uint8Array'
    )
  }

  if (a === b) return 0

  var x = a.length
  var y = b.length

  for (var i = 0, len = Math.min(x, y); i < len; ++i) {
    if (a[i] !== b[i]) {
      x = a[i]
      y = b[i]
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
}

Buffer.isEncoding = function isEncoding (encoding) {
  switch (String(encoding).toLowerCase()) {
    case 'hex':
    case 'utf8':
    case 'utf-8':
    case 'ascii':
    case 'latin1':
    case 'binary':
    case 'base64':
    case 'ucs2':
    case 'ucs-2':
    case 'utf16le':
    case 'utf-16le':
      return true
    default:
      return false
  }
}

Buffer.concat = function concat (list, length) {
  if (!Array.isArray(list)) {
    throw new TypeError('"list" argument must be an Array of Buffers')
  }

  if (list.length === 0) {
    return Buffer.alloc(0)
  }

  var i
  if (length === undefined) {
    length = 0
    for (i = 0; i < list.length; ++i) {
      length += list[i].length
    }
  }

  var buffer = Buffer.allocUnsafe(length)
  var pos = 0
  for (i = 0; i < list.length; ++i) {
    var buf = list[i]
    if (isInstance(buf, Uint8Array)) {
      buf = Buffer.from(buf)
    }
    if (!Buffer.isBuffer(buf)) {
      throw new TypeError('"list" argument must be an Array of Buffers')
    }
    buf.copy(buffer, pos)
    pos += buf.length
  }
  return buffer
}

function byteLength (string, encoding) {
  if (Buffer.isBuffer(string)) {
    return string.length
  }
  if (ArrayBuffer.isView(string) || isInstance(string, ArrayBuffer)) {
    return string.byteLength
  }
  if (typeof string !== 'string') {
    throw new TypeError(
      'The "string" argument must be one of type string, Buffer, or ArrayBuffer. ' +
      'Received type ' + typeof string
    )
  }

  var len = string.length
  var mustMatch = (arguments.length > 2 && arguments[2] === true)
  if (!mustMatch && len === 0) return 0

  // Use a for loop to avoid recursion
  var loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'ascii':
      case 'latin1':
      case 'binary':
        return len
      case 'utf8':
      case 'utf-8':
        return utf8ToBytes(string).length
      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return len * 2
      case 'hex':
        return len >>> 1
      case 'base64':
        return base64ToBytes(string).length
      default:
        if (loweredCase) {
          return mustMatch ? -1 : utf8ToBytes(string).length // assume utf8
        }
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}
Buffer.byteLength = byteLength

function slowToString (encoding, start, end) {
  var loweredCase = false

  // No need to verify that "this.length <= MAX_UINT32" since it's a read-only
  // property of a typed array.

  // This behaves neither like String nor Uint8Array in that we set start/end
  // to their upper/lower bounds if the value passed is out of range.
  // undefined is handled specially as per ECMA-262 6th Edition,
  // Section 13.3.3.7 Runtime Semantics: KeyedBindingInitialization.
  if (start === undefined || start < 0) {
    start = 0
  }
  // Return early if start > this.length. Done here to prevent potential uint32
  // coercion fail below.
  if (start > this.length) {
    return ''
  }

  if (end === undefined || end > this.length) {
    end = this.length
  }

  if (end <= 0) {
    return ''
  }

  // Force coersion to uint32. This will also coerce falsey/NaN values to 0.
  end >>>= 0
  start >>>= 0

  if (end <= start) {
    return ''
  }

  if (!encoding) encoding = 'utf8'

  while (true) {
    switch (encoding) {
      case 'hex':
        return hexSlice(this, start, end)

      case 'utf8':
      case 'utf-8':
        return utf8Slice(this, start, end)

      case 'ascii':
        return asciiSlice(this, start, end)

      case 'latin1':
      case 'binary':
        return latin1Slice(this, start, end)

      case 'base64':
        return base64Slice(this, start, end)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return utf16leSlice(this, start, end)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = (encoding + '').toLowerCase()
        loweredCase = true
    }
  }
}

// This property is used by `Buffer.isBuffer` (and the `is-buffer` npm package)
// to detect a Buffer instance. It's not possible to use `instanceof Buffer`
// reliably in a browserify context because there could be multiple different
// copies of the 'buffer' package in use. This method works even for Buffer
// instances that were created from another copy of the `buffer` package.
// See: https://github.com/feross/buffer/issues/154
Buffer.prototype._isBuffer = true

function swap (b, n, m) {
  var i = b[n]
  b[n] = b[m]
  b[m] = i
}

Buffer.prototype.swap16 = function swap16 () {
  var len = this.length
  if (len % 2 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 16-bits')
  }
  for (var i = 0; i < len; i += 2) {
    swap(this, i, i + 1)
  }
  return this
}

Buffer.prototype.swap32 = function swap32 () {
  var len = this.length
  if (len % 4 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 32-bits')
  }
  for (var i = 0; i < len; i += 4) {
    swap(this, i, i + 3)
    swap(this, i + 1, i + 2)
  }
  return this
}

Buffer.prototype.swap64 = function swap64 () {
  var len = this.length
  if (len % 8 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 64-bits')
  }
  for (var i = 0; i < len; i += 8) {
    swap(this, i, i + 7)
    swap(this, i + 1, i + 6)
    swap(this, i + 2, i + 5)
    swap(this, i + 3, i + 4)
  }
  return this
}

Buffer.prototype.toString = function toString () {
  var length = this.length
  if (length === 0) return ''
  if (arguments.length === 0) return utf8Slice(this, 0, length)
  return slowToString.apply(this, arguments)
}

Buffer.prototype.toLocaleString = Buffer.prototype.toString

Buffer.prototype.equals = function equals (b) {
  if (!Buffer.isBuffer(b)) throw new TypeError('Argument must be a Buffer')
  if (this === b) return true
  return Buffer.compare(this, b) === 0
}

Buffer.prototype.inspect = function inspect () {
  var str = ''
  var max = exports.INSPECT_MAX_BYTES
  str = this.toString('hex', 0, max).replace(/(.{2})/g, '$1 ').trim()
  if (this.length > max) str += ' ... '
  return '<Buffer ' + str + '>'
}

Buffer.prototype.compare = function compare (target, start, end, thisStart, thisEnd) {
  if (isInstance(target, Uint8Array)) {
    target = Buffer.from(target, target.offset, target.byteLength)
  }
  if (!Buffer.isBuffer(target)) {
    throw new TypeError(
      'The "target" argument must be one of type Buffer or Uint8Array. ' +
      'Received type ' + (typeof target)
    )
  }

  if (start === undefined) {
    start = 0
  }
  if (end === undefined) {
    end = target ? target.length : 0
  }
  if (thisStart === undefined) {
    thisStart = 0
  }
  if (thisEnd === undefined) {
    thisEnd = this.length
  }

  if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) {
    throw new RangeError('out of range index')
  }

  if (thisStart >= thisEnd && start >= end) {
    return 0
  }
  if (thisStart >= thisEnd) {
    return -1
  }
  if (start >= end) {
    return 1
  }

  start >>>= 0
  end >>>= 0
  thisStart >>>= 0
  thisEnd >>>= 0

  if (this === target) return 0

  var x = thisEnd - thisStart
  var y = end - start
  var len = Math.min(x, y)

  var thisCopy = this.slice(thisStart, thisEnd)
  var targetCopy = target.slice(start, end)

  for (var i = 0; i < len; ++i) {
    if (thisCopy[i] !== targetCopy[i]) {
      x = thisCopy[i]
      y = targetCopy[i]
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
}

// Finds either the first index of `val` in `buffer` at offset >= `byteOffset`,
// OR the last index of `val` in `buffer` at offset <= `byteOffset`.
//
// Arguments:
// - buffer - a Buffer to search
// - val - a string, Buffer, or number
// - byteOffset - an index into `buffer`; will be clamped to an int32
// - encoding - an optional encoding, relevant is val is a string
// - dir - true for indexOf, false for lastIndexOf
function bidirectionalIndexOf (buffer, val, byteOffset, encoding, dir) {
  // Empty buffer means no match
  if (buffer.length === 0) return -1

  // Normalize byteOffset
  if (typeof byteOffset === 'string') {
    encoding = byteOffset
    byteOffset = 0
  } else if (byteOffset > 0x7fffffff) {
    byteOffset = 0x7fffffff
  } else if (byteOffset < -0x80000000) {
    byteOffset = -0x80000000
  }
  byteOffset = +byteOffset // Coerce to Number.
  if (numberIsNaN(byteOffset)) {
    // byteOffset: it it's undefined, null, NaN, "foo", etc, search whole buffer
    byteOffset = dir ? 0 : (buffer.length - 1)
  }

  // Normalize byteOffset: negative offsets start from the end of the buffer
  if (byteOffset < 0) byteOffset = buffer.length + byteOffset
  if (byteOffset >= buffer.length) {
    if (dir) return -1
    else byteOffset = buffer.length - 1
  } else if (byteOffset < 0) {
    if (dir) byteOffset = 0
    else return -1
  }

  // Normalize val
  if (typeof val === 'string') {
    val = Buffer.from(val, encoding)
  }

  // Finally, search either indexOf (if dir is true) or lastIndexOf
  if (Buffer.isBuffer(val)) {
    // Special case: looking for empty string/buffer always fails
    if (val.length === 0) {
      return -1
    }
    return arrayIndexOf(buffer, val, byteOffset, encoding, dir)
  } else if (typeof val === 'number') {
    val = val & 0xFF // Search for a byte value [0-255]
    if (typeof Uint8Array.prototype.indexOf === 'function') {
      if (dir) {
        return Uint8Array.prototype.indexOf.call(buffer, val, byteOffset)
      } else {
        return Uint8Array.prototype.lastIndexOf.call(buffer, val, byteOffset)
      }
    }
    return arrayIndexOf(buffer, [ val ], byteOffset, encoding, dir)
  }

  throw new TypeError('val must be string, number or Buffer')
}

function arrayIndexOf (arr, val, byteOffset, encoding, dir) {
  var indexSize = 1
  var arrLength = arr.length
  var valLength = val.length

  if (encoding !== undefined) {
    encoding = String(encoding).toLowerCase()
    if (encoding === 'ucs2' || encoding === 'ucs-2' ||
        encoding === 'utf16le' || encoding === 'utf-16le') {
      if (arr.length < 2 || val.length < 2) {
        return -1
      }
      indexSize = 2
      arrLength /= 2
      valLength /= 2
      byteOffset /= 2
    }
  }

  function read (buf, i) {
    if (indexSize === 1) {
      return buf[i]
    } else {
      return buf.readUInt16BE(i * indexSize)
    }
  }

  var i
  if (dir) {
    var foundIndex = -1
    for (i = byteOffset; i < arrLength; i++) {
      if (read(arr, i) === read(val, foundIndex === -1 ? 0 : i - foundIndex)) {
        if (foundIndex === -1) foundIndex = i
        if (i - foundIndex + 1 === valLength) return foundIndex * indexSize
      } else {
        if (foundIndex !== -1) i -= i - foundIndex
        foundIndex = -1
      }
    }
  } else {
    if (byteOffset + valLength > arrLength) byteOffset = arrLength - valLength
    for (i = byteOffset; i >= 0; i--) {
      var found = true
      for (var j = 0; j < valLength; j++) {
        if (read(arr, i + j) !== read(val, j)) {
          found = false
          break
        }
      }
      if (found) return i
    }
  }

  return -1
}

Buffer.prototype.includes = function includes (val, byteOffset, encoding) {
  return this.indexOf(val, byteOffset, encoding) !== -1
}

Buffer.prototype.indexOf = function indexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, true)
}

Buffer.prototype.lastIndexOf = function lastIndexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, false)
}

function hexWrite (buf, string, offset, length) {
  offset = Number(offset) || 0
  var remaining = buf.length - offset
  if (!length) {
    length = remaining
  } else {
    length = Number(length)
    if (length > remaining) {
      length = remaining
    }
  }

  var strLen = string.length

  if (length > strLen / 2) {
    length = strLen / 2
  }
  for (var i = 0; i < length; ++i) {
    var parsed = parseInt(string.substr(i * 2, 2), 16)
    if (numberIsNaN(parsed)) return i
    buf[offset + i] = parsed
  }
  return i
}

function utf8Write (buf, string, offset, length) {
  return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length)
}

function asciiWrite (buf, string, offset, length) {
  return blitBuffer(asciiToBytes(string), buf, offset, length)
}

function latin1Write (buf, string, offset, length) {
  return asciiWrite(buf, string, offset, length)
}

function base64Write (buf, string, offset, length) {
  return blitBuffer(base64ToBytes(string), buf, offset, length)
}

function ucs2Write (buf, string, offset, length) {
  return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length)
}

Buffer.prototype.write = function write (string, offset, length, encoding) {
  // Buffer#write(string)
  if (offset === undefined) {
    encoding = 'utf8'
    length = this.length
    offset = 0
  // Buffer#write(string, encoding)
  } else if (length === undefined && typeof offset === 'string') {
    encoding = offset
    length = this.length
    offset = 0
  // Buffer#write(string, offset[, length][, encoding])
  } else if (isFinite(offset)) {
    offset = offset >>> 0
    if (isFinite(length)) {
      length = length >>> 0
      if (encoding === undefined) encoding = 'utf8'
    } else {
      encoding = length
      length = undefined
    }
  } else {
    throw new Error(
      'Buffer.write(string, encoding, offset[, length]) is no longer supported'
    )
  }

  var remaining = this.length - offset
  if (length === undefined || length > remaining) length = remaining

  if ((string.length > 0 && (length < 0 || offset < 0)) || offset > this.length) {
    throw new RangeError('Attempt to write outside buffer bounds')
  }

  if (!encoding) encoding = 'utf8'

  var loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'hex':
        return hexWrite(this, string, offset, length)

      case 'utf8':
      case 'utf-8':
        return utf8Write(this, string, offset, length)

      case 'ascii':
        return asciiWrite(this, string, offset, length)

      case 'latin1':
      case 'binary':
        return latin1Write(this, string, offset, length)

      case 'base64':
        // Warning: maxLength not taken into account in base64Write
        return base64Write(this, string, offset, length)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return ucs2Write(this, string, offset, length)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}

Buffer.prototype.toJSON = function toJSON () {
  return {
    type: 'Buffer',
    data: Array.prototype.slice.call(this._arr || this, 0)
  }
}

function base64Slice (buf, start, end) {
  if (start === 0 && end === buf.length) {
    return base64.fromByteArray(buf)
  } else {
    return base64.fromByteArray(buf.slice(start, end))
  }
}

function utf8Slice (buf, start, end) {
  end = Math.min(buf.length, end)
  var res = []

  var i = start
  while (i < end) {
    var firstByte = buf[i]
    var codePoint = null
    var bytesPerSequence = (firstByte > 0xEF) ? 4
      : (firstByte > 0xDF) ? 3
        : (firstByte > 0xBF) ? 2
          : 1

    if (i + bytesPerSequence <= end) {
      var secondByte, thirdByte, fourthByte, tempCodePoint

      switch (bytesPerSequence) {
        case 1:
          if (firstByte < 0x80) {
            codePoint = firstByte
          }
          break
        case 2:
          secondByte = buf[i + 1]
          if ((secondByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0x1F) << 0x6 | (secondByte & 0x3F)
            if (tempCodePoint > 0x7F) {
              codePoint = tempCodePoint
            }
          }
          break
        case 3:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0xC | (secondByte & 0x3F) << 0x6 | (thirdByte & 0x3F)
            if (tempCodePoint > 0x7FF && (tempCodePoint < 0xD800 || tempCodePoint > 0xDFFF)) {
              codePoint = tempCodePoint
            }
          }
          break
        case 4:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          fourthByte = buf[i + 3]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80 && (fourthByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0x12 | (secondByte & 0x3F) << 0xC | (thirdByte & 0x3F) << 0x6 | (fourthByte & 0x3F)
            if (tempCodePoint > 0xFFFF && tempCodePoint < 0x110000) {
              codePoint = tempCodePoint
            }
          }
      }
    }

    if (codePoint === null) {
      // we did not generate a valid codePoint so insert a
      // replacement char (U+FFFD) and advance only 1 byte
      codePoint = 0xFFFD
      bytesPerSequence = 1
    } else if (codePoint > 0xFFFF) {
      // encode to utf16 (surrogate pair dance)
      codePoint -= 0x10000
      res.push(codePoint >>> 10 & 0x3FF | 0xD800)
      codePoint = 0xDC00 | codePoint & 0x3FF
    }

    res.push(codePoint)
    i += bytesPerSequence
  }

  return decodeCodePointsArray(res)
}

// Based on http://stackoverflow.com/a/22747272/680742, the browser with
// the lowest limit is Chrome, with 0x10000 args.
// We go 1 magnitude less, for safety
var MAX_ARGUMENTS_LENGTH = 0x1000

function decodeCodePointsArray (codePoints) {
  var len = codePoints.length
  if (len <= MAX_ARGUMENTS_LENGTH) {
    return String.fromCharCode.apply(String, codePoints) // avoid extra slice()
  }

  // Decode in chunks to avoid "call stack size exceeded".
  var res = ''
  var i = 0
  while (i < len) {
    res += String.fromCharCode.apply(
      String,
      codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH)
    )
  }
  return res
}

function asciiSlice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i] & 0x7F)
  }
  return ret
}

function latin1Slice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i])
  }
  return ret
}

function hexSlice (buf, start, end) {
  var len = buf.length

  if (!start || start < 0) start = 0
  if (!end || end < 0 || end > len) end = len

  var out = ''
  for (var i = start; i < end; ++i) {
    out += toHex(buf[i])
  }
  return out
}

function utf16leSlice (buf, start, end) {
  var bytes = buf.slice(start, end)
  var res = ''
  for (var i = 0; i < bytes.length; i += 2) {
    res += String.fromCharCode(bytes[i] + (bytes[i + 1] * 256))
  }
  return res
}

Buffer.prototype.slice = function slice (start, end) {
  var len = this.length
  start = ~~start
  end = end === undefined ? len : ~~end

  if (start < 0) {
    start += len
    if (start < 0) start = 0
  } else if (start > len) {
    start = len
  }

  if (end < 0) {
    end += len
    if (end < 0) end = 0
  } else if (end > len) {
    end = len
  }

  if (end < start) end = start

  var newBuf = this.subarray(start, end)
  // Return an augmented `Uint8Array` instance
  newBuf.__proto__ = Buffer.prototype
  return newBuf
}

/*
 * Need to make sure that buffer isn't trying to write out of bounds.
 */
function checkOffset (offset, ext, length) {
  if ((offset % 1) !== 0 || offset < 0) throw new RangeError('offset is not uint')
  if (offset + ext > length) throw new RangeError('Trying to access beyond buffer length')
}

Buffer.prototype.readUIntLE = function readUIntLE (offset, byteLength, noAssert) {
  offset = offset >>> 0
  byteLength = byteLength >>> 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var val = this[offset]
  var mul = 1
  var i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }

  return val
}

Buffer.prototype.readUIntBE = function readUIntBE (offset, byteLength, noAssert) {
  offset = offset >>> 0
  byteLength = byteLength >>> 0
  if (!noAssert) {
    checkOffset(offset, byteLength, this.length)
  }

  var val = this[offset + --byteLength]
  var mul = 1
  while (byteLength > 0 && (mul *= 0x100)) {
    val += this[offset + --byteLength] * mul
  }

  return val
}

Buffer.prototype.readUInt8 = function readUInt8 (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 1, this.length)
  return this[offset]
}

Buffer.prototype.readUInt16LE = function readUInt16LE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 2, this.length)
  return this[offset] | (this[offset + 1] << 8)
}

Buffer.prototype.readUInt16BE = function readUInt16BE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 2, this.length)
  return (this[offset] << 8) | this[offset + 1]
}

Buffer.prototype.readUInt32LE = function readUInt32LE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 4, this.length)

  return ((this[offset]) |
      (this[offset + 1] << 8) |
      (this[offset + 2] << 16)) +
      (this[offset + 3] * 0x1000000)
}

Buffer.prototype.readUInt32BE = function readUInt32BE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] * 0x1000000) +
    ((this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    this[offset + 3])
}

Buffer.prototype.readIntLE = function readIntLE (offset, byteLength, noAssert) {
  offset = offset >>> 0
  byteLength = byteLength >>> 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var val = this[offset]
  var mul = 1
  var i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readIntBE = function readIntBE (offset, byteLength, noAssert) {
  offset = offset >>> 0
  byteLength = byteLength >>> 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var i = byteLength
  var mul = 1
  var val = this[offset + --i]
  while (i > 0 && (mul *= 0x100)) {
    val += this[offset + --i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readInt8 = function readInt8 (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 1, this.length)
  if (!(this[offset] & 0x80)) return (this[offset])
  return ((0xff - this[offset] + 1) * -1)
}

Buffer.prototype.readInt16LE = function readInt16LE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 2, this.length)
  var val = this[offset] | (this[offset + 1] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt16BE = function readInt16BE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 2, this.length)
  var val = this[offset + 1] | (this[offset] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt32LE = function readInt32LE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset]) |
    (this[offset + 1] << 8) |
    (this[offset + 2] << 16) |
    (this[offset + 3] << 24)
}

Buffer.prototype.readInt32BE = function readInt32BE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] << 24) |
    (this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    (this[offset + 3])
}

Buffer.prototype.readFloatLE = function readFloatLE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, true, 23, 4)
}

Buffer.prototype.readFloatBE = function readFloatBE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, false, 23, 4)
}

Buffer.prototype.readDoubleLE = function readDoubleLE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, true, 52, 8)
}

Buffer.prototype.readDoubleBE = function readDoubleBE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, false, 52, 8)
}

function checkInt (buf, value, offset, ext, max, min) {
  if (!Buffer.isBuffer(buf)) throw new TypeError('"buffer" argument must be a Buffer instance')
  if (value > max || value < min) throw new RangeError('"value" argument is out of bounds')
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
}

Buffer.prototype.writeUIntLE = function writeUIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset >>> 0
  byteLength = byteLength >>> 0
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1
    checkInt(this, value, offset, byteLength, maxBytes, 0)
  }

  var mul = 1
  var i = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUIntBE = function writeUIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset >>> 0
  byteLength = byteLength >>> 0
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1
    checkInt(this, value, offset, byteLength, maxBytes, 0)
  }

  var i = byteLength - 1
  var mul = 1
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUInt8 = function writeUInt8 (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 1, 0xff, 0)
  this[offset] = (value & 0xff)
  return offset + 1
}

Buffer.prototype.writeUInt16LE = function writeUInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  this[offset] = (value & 0xff)
  this[offset + 1] = (value >>> 8)
  return offset + 2
}

Buffer.prototype.writeUInt16BE = function writeUInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  this[offset] = (value >>> 8)
  this[offset + 1] = (value & 0xff)
  return offset + 2
}

Buffer.prototype.writeUInt32LE = function writeUInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  this[offset + 3] = (value >>> 24)
  this[offset + 2] = (value >>> 16)
  this[offset + 1] = (value >>> 8)
  this[offset] = (value & 0xff)
  return offset + 4
}

Buffer.prototype.writeUInt32BE = function writeUInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  this[offset] = (value >>> 24)
  this[offset + 1] = (value >>> 16)
  this[offset + 2] = (value >>> 8)
  this[offset + 3] = (value & 0xff)
  return offset + 4
}

Buffer.prototype.writeIntLE = function writeIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) {
    var limit = Math.pow(2, (8 * byteLength) - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  var i = 0
  var mul = 1
  var sub = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i - 1] !== 0) {
      sub = 1
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeIntBE = function writeIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) {
    var limit = Math.pow(2, (8 * byteLength) - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  var i = byteLength - 1
  var mul = 1
  var sub = 0
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i + 1] !== 0) {
      sub = 1
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeInt8 = function writeInt8 (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 1, 0x7f, -0x80)
  if (value < 0) value = 0xff + value + 1
  this[offset] = (value & 0xff)
  return offset + 1
}

Buffer.prototype.writeInt16LE = function writeInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  this[offset] = (value & 0xff)
  this[offset + 1] = (value >>> 8)
  return offset + 2
}

Buffer.prototype.writeInt16BE = function writeInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  this[offset] = (value >>> 8)
  this[offset + 1] = (value & 0xff)
  return offset + 2
}

Buffer.prototype.writeInt32LE = function writeInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  this[offset] = (value & 0xff)
  this[offset + 1] = (value >>> 8)
  this[offset + 2] = (value >>> 16)
  this[offset + 3] = (value >>> 24)
  return offset + 4
}

Buffer.prototype.writeInt32BE = function writeInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  if (value < 0) value = 0xffffffff + value + 1
  this[offset] = (value >>> 24)
  this[offset + 1] = (value >>> 16)
  this[offset + 2] = (value >>> 8)
  this[offset + 3] = (value & 0xff)
  return offset + 4
}

function checkIEEE754 (buf, value, offset, ext, max, min) {
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
  if (offset < 0) throw new RangeError('Index out of range')
}

function writeFloat (buf, value, offset, littleEndian, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 4, 3.4028234663852886e+38, -3.4028234663852886e+38)
  }
  ieee754.write(buf, value, offset, littleEndian, 23, 4)
  return offset + 4
}

Buffer.prototype.writeFloatLE = function writeFloatLE (value, offset, noAssert) {
  return writeFloat(this, value, offset, true, noAssert)
}

Buffer.prototype.writeFloatBE = function writeFloatBE (value, offset, noAssert) {
  return writeFloat(this, value, offset, false, noAssert)
}

function writeDouble (buf, value, offset, littleEndian, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 8, 1.7976931348623157E+308, -1.7976931348623157E+308)
  }
  ieee754.write(buf, value, offset, littleEndian, 52, 8)
  return offset + 8
}

Buffer.prototype.writeDoubleLE = function writeDoubleLE (value, offset, noAssert) {
  return writeDouble(this, value, offset, true, noAssert)
}

Buffer.prototype.writeDoubleBE = function writeDoubleBE (value, offset, noAssert) {
  return writeDouble(this, value, offset, false, noAssert)
}

// copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)
Buffer.prototype.copy = function copy (target, targetStart, start, end) {
  if (!Buffer.isBuffer(target)) throw new TypeError('argument should be a Buffer')
  if (!start) start = 0
  if (!end && end !== 0) end = this.length
  if (targetStart >= target.length) targetStart = target.length
  if (!targetStart) targetStart = 0
  if (end > 0 && end < start) end = start

  // Copy 0 bytes; we're done
  if (end === start) return 0
  if (target.length === 0 || this.length === 0) return 0

  // Fatal error conditions
  if (targetStart < 0) {
    throw new RangeError('targetStart out of bounds')
  }
  if (start < 0 || start >= this.length) throw new RangeError('Index out of range')
  if (end < 0) throw new RangeError('sourceEnd out of bounds')

  // Are we oob?
  if (end > this.length) end = this.length
  if (target.length - targetStart < end - start) {
    end = target.length - targetStart + start
  }

  var len = end - start

  if (this === target && typeof Uint8Array.prototype.copyWithin === 'function') {
    // Use built-in when available, missing from IE11
    this.copyWithin(targetStart, start, end)
  } else if (this === target && start < targetStart && targetStart < end) {
    // descending copy from end
    for (var i = len - 1; i >= 0; --i) {
      target[i + targetStart] = this[i + start]
    }
  } else {
    Uint8Array.prototype.set.call(
      target,
      this.subarray(start, end),
      targetStart
    )
  }

  return len
}

// Usage:
//    buffer.fill(number[, offset[, end]])
//    buffer.fill(buffer[, offset[, end]])
//    buffer.fill(string[, offset[, end]][, encoding])
Buffer.prototype.fill = function fill (val, start, end, encoding) {
  // Handle string cases:
  if (typeof val === 'string') {
    if (typeof start === 'string') {
      encoding = start
      start = 0
      end = this.length
    } else if (typeof end === 'string') {
      encoding = end
      end = this.length
    }
    if (encoding !== undefined && typeof encoding !== 'string') {
      throw new TypeError('encoding must be a string')
    }
    if (typeof encoding === 'string' && !Buffer.isEncoding(encoding)) {
      throw new TypeError('Unknown encoding: ' + encoding)
    }
    if (val.length === 1) {
      var code = val.charCodeAt(0)
      if ((encoding === 'utf8' && code < 128) ||
          encoding === 'latin1') {
        // Fast path: If `val` fits into a single byte, use that numeric value.
        val = code
      }
    }
  } else if (typeof val === 'number') {
    val = val & 255
  }

  // Invalid ranges are not set to a default, so can range check early.
  if (start < 0 || this.length < start || this.length < end) {
    throw new RangeError('Out of range index')
  }

  if (end <= start) {
    return this
  }

  start = start >>> 0
  end = end === undefined ? this.length : end >>> 0

  if (!val) val = 0

  var i
  if (typeof val === 'number') {
    for (i = start; i < end; ++i) {
      this[i] = val
    }
  } else {
    var bytes = Buffer.isBuffer(val)
      ? val
      : Buffer.from(val, encoding)
    var len = bytes.length
    if (len === 0) {
      throw new TypeError('The value "' + val +
        '" is invalid for argument "value"')
    }
    for (i = 0; i < end - start; ++i) {
      this[i + start] = bytes[i % len]
    }
  }

  return this
}

// HELPER FUNCTIONS
// ================

var INVALID_BASE64_RE = /[^+/0-9A-Za-z-_]/g

function base64clean (str) {
  // Node takes equal signs as end of the Base64 encoding
  str = str.split('=')[0]
  // Node strips out invalid characters like \n and \t from the string, base64-js does not
  str = str.trim().replace(INVALID_BASE64_RE, '')
  // Node converts strings with length < 2 to ''
  if (str.length < 2) return ''
  // Node allows for non-padded base64 strings (missing trailing ===), base64-js does not
  while (str.length % 4 !== 0) {
    str = str + '='
  }
  return str
}

function toHex (n) {
  if (n < 16) return '0' + n.toString(16)
  return n.toString(16)
}

function utf8ToBytes (string, units) {
  units = units || Infinity
  var codePoint
  var length = string.length
  var leadSurrogate = null
  var bytes = []

  for (var i = 0; i < length; ++i) {
    codePoint = string.charCodeAt(i)

    // is surrogate component
    if (codePoint > 0xD7FF && codePoint < 0xE000) {
      // last char was a lead
      if (!leadSurrogate) {
        // no lead yet
        if (codePoint > 0xDBFF) {
          // unexpected trail
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        } else if (i + 1 === length) {
          // unpaired lead
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        }

        // valid lead
        leadSurrogate = codePoint

        continue
      }

      // 2 leads in a row
      if (codePoint < 0xDC00) {
        if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
        leadSurrogate = codePoint
        continue
      }

      // valid surrogate pair
      codePoint = (leadSurrogate - 0xD800 << 10 | codePoint - 0xDC00) + 0x10000
    } else if (leadSurrogate) {
      // valid bmp char, but last char was a lead
      if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
    }

    leadSurrogate = null

    // encode utf8
    if (codePoint < 0x80) {
      if ((units -= 1) < 0) break
      bytes.push(codePoint)
    } else if (codePoint < 0x800) {
      if ((units -= 2) < 0) break
      bytes.push(
        codePoint >> 0x6 | 0xC0,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x10000) {
      if ((units -= 3) < 0) break
      bytes.push(
        codePoint >> 0xC | 0xE0,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x110000) {
      if ((units -= 4) < 0) break
      bytes.push(
        codePoint >> 0x12 | 0xF0,
        codePoint >> 0xC & 0x3F | 0x80,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else {
      throw new Error('Invalid code point')
    }
  }

  return bytes
}

function asciiToBytes (str) {
  var byteArray = []
  for (var i = 0; i < str.length; ++i) {
    // Node's code seems to be doing this and not & 0x7F..
    byteArray.push(str.charCodeAt(i) & 0xFF)
  }
  return byteArray
}

function utf16leToBytes (str, units) {
  var c, hi, lo
  var byteArray = []
  for (var i = 0; i < str.length; ++i) {
    if ((units -= 2) < 0) break

    c = str.charCodeAt(i)
    hi = c >> 8
    lo = c % 256
    byteArray.push(lo)
    byteArray.push(hi)
  }

  return byteArray
}

function base64ToBytes (str) {
  return base64.toByteArray(base64clean(str))
}

function blitBuffer (src, dst, offset, length) {
  for (var i = 0; i < length; ++i) {
    if ((i + offset >= dst.length) || (i >= src.length)) break
    dst[i + offset] = src[i]
  }
  return i
}

// ArrayBuffer or Uint8Array objects from other contexts (i.e. iframes) do not pass
// the `instanceof` check but they should be treated as of that type.
// See: https://github.com/feross/buffer/issues/166
function isInstance (obj, type) {
  return obj instanceof type ||
    (obj != null && obj.constructor != null && obj.constructor.name != null &&
      obj.constructor.name === type.name)
}
function numberIsNaN (obj) {
  // For IE11 support
  return obj !== obj // eslint-disable-line no-self-compare
}

}).call(this)}).call(this,require("buffer").Buffer)
},{"base64-js":13,"buffer":15,"ieee754":17}],16:[function(require,module,exports){
(function (Buffer){(function (){
var clone = (function() {
'use strict';

function _instanceof(obj, type) {
  return type != null && obj instanceof type;
}

var nativeMap;
try {
  nativeMap = Map;
} catch(_) {
  // maybe a reference error because no `Map`. Give it a dummy value that no
  // value will ever be an instanceof.
  nativeMap = function() {};
}

var nativeSet;
try {
  nativeSet = Set;
} catch(_) {
  nativeSet = function() {};
}

var nativePromise;
try {
  nativePromise = Promise;
} catch(_) {
  nativePromise = function() {};
}

/**
 * Clones (copies) an Object using deep copying.
 *
 * This function supports circular references by default, but if you are certain
 * there are no circular references in your object, you can save some CPU time
 * by calling clone(obj, false).
 *
 * Caution: if `circular` is false and `parent` contains circular references,
 * your program may enter an infinite loop and crash.
 *
 * @param `parent` - the object to be cloned
 * @param `circular` - set to true if the object to be cloned may contain
 *    circular references. (optional - true by default)
 * @param `depth` - set to a number if the object is only to be cloned to
 *    a particular depth. (optional - defaults to Infinity)
 * @param `prototype` - sets the prototype to be used when cloning an object.
 *    (optional - defaults to parent prototype).
 * @param `includeNonEnumerable` - set to true if the non-enumerable properties
 *    should be cloned as well. Non-enumerable properties on the prototype
 *    chain will be ignored. (optional - false by default)
*/
function clone(parent, circular, depth, prototype, includeNonEnumerable) {
  if (typeof circular === 'object') {
    depth = circular.depth;
    prototype = circular.prototype;
    includeNonEnumerable = circular.includeNonEnumerable;
    circular = circular.circular;
  }
  // maintain two arrays for circular references, where corresponding parents
  // and children have the same index
  var allParents = [];
  var allChildren = [];

  var useBuffer = typeof Buffer != 'undefined';

  if (typeof circular == 'undefined')
    circular = true;

  if (typeof depth == 'undefined')
    depth = Infinity;

  // recurse this function so we don't reset allParents and allChildren
  function _clone(parent, depth) {
    // cloning null always returns null
    if (parent === null)
      return null;

    if (depth === 0)
      return parent;

    var child;
    var proto;
    if (typeof parent != 'object') {
      return parent;
    }

    if (_instanceof(parent, nativeMap)) {
      child = new nativeMap();
    } else if (_instanceof(parent, nativeSet)) {
      child = new nativeSet();
    } else if (_instanceof(parent, nativePromise)) {
      child = new nativePromise(function (resolve, reject) {
        parent.then(function(value) {
          resolve(_clone(value, depth - 1));
        }, function(err) {
          reject(_clone(err, depth - 1));
        });
      });
    } else if (clone.__isArray(parent)) {
      child = [];
    } else if (clone.__isRegExp(parent)) {
      child = new RegExp(parent.source, __getRegExpFlags(parent));
      if (parent.lastIndex) child.lastIndex = parent.lastIndex;
    } else if (clone.__isDate(parent)) {
      child = new Date(parent.getTime());
    } else if (useBuffer && Buffer.isBuffer(parent)) {
      if (Buffer.allocUnsafe) {
        // Node.js >= 4.5.0
        child = Buffer.allocUnsafe(parent.length);
      } else {
        // Older Node.js versions
        child = new Buffer(parent.length);
      }
      parent.copy(child);
      return child;
    } else if (_instanceof(parent, Error)) {
      child = Object.create(parent);
    } else {
      if (typeof prototype == 'undefined') {
        proto = Object.getPrototypeOf(parent);
        child = Object.create(proto);
      }
      else {
        child = Object.create(prototype);
        proto = prototype;
      }
    }

    if (circular) {
      var index = allParents.indexOf(parent);

      if (index != -1) {
        return allChildren[index];
      }
      allParents.push(parent);
      allChildren.push(child);
    }

    if (_instanceof(parent, nativeMap)) {
      parent.forEach(function(value, key) {
        var keyChild = _clone(key, depth - 1);
        var valueChild = _clone(value, depth - 1);
        child.set(keyChild, valueChild);
      });
    }
    if (_instanceof(parent, nativeSet)) {
      parent.forEach(function(value) {
        var entryChild = _clone(value, depth - 1);
        child.add(entryChild);
      });
    }

    for (var i in parent) {
      var attrs;
      if (proto) {
        attrs = Object.getOwnPropertyDescriptor(proto, i);
      }

      if (attrs && attrs.set == null) {
        continue;
      }
      child[i] = _clone(parent[i], depth - 1);
    }

    if (Object.getOwnPropertySymbols) {
      var symbols = Object.getOwnPropertySymbols(parent);
      for (var i = 0; i < symbols.length; i++) {
        // Don't need to worry about cloning a symbol because it is a primitive,
        // like a number or string.
        var symbol = symbols[i];
        var descriptor = Object.getOwnPropertyDescriptor(parent, symbol);
        if (descriptor && !descriptor.enumerable && !includeNonEnumerable) {
          continue;
        }
        child[symbol] = _clone(parent[symbol], depth - 1);
        if (!descriptor.enumerable) {
          Object.defineProperty(child, symbol, {
            enumerable: false
          });
        }
      }
    }

    if (includeNonEnumerable) {
      var allPropertyNames = Object.getOwnPropertyNames(parent);
      for (var i = 0; i < allPropertyNames.length; i++) {
        var propertyName = allPropertyNames[i];
        var descriptor = Object.getOwnPropertyDescriptor(parent, propertyName);
        if (descriptor && descriptor.enumerable) {
          continue;
        }
        child[propertyName] = _clone(parent[propertyName], depth - 1);
        Object.defineProperty(child, propertyName, {
          enumerable: false
        });
      }
    }

    return child;
  }

  return _clone(parent, depth);
}

/**
 * Simple flat clone using prototype, accepts only objects, usefull for property
 * override on FLAT configuration object (no nested props).
 *
 * USE WITH CAUTION! This may not behave as you wish if you do not know how this
 * works.
 */
clone.clonePrototype = function clonePrototype(parent) {
  if (parent === null)
    return null;

  var c = function () {};
  c.prototype = parent;
  return new c();
};

// private utility functions

function __objToStr(o) {
  return Object.prototype.toString.call(o);
}
clone.__objToStr = __objToStr;

function __isDate(o) {
  return typeof o === 'object' && __objToStr(o) === '[object Date]';
}
clone.__isDate = __isDate;

function __isArray(o) {
  return typeof o === 'object' && __objToStr(o) === '[object Array]';
}
clone.__isArray = __isArray;

function __isRegExp(o) {
  return typeof o === 'object' && __objToStr(o) === '[object RegExp]';
}
clone.__isRegExp = __isRegExp;

function __getRegExpFlags(re) {
  var flags = '';
  if (re.global) flags += 'g';
  if (re.ignoreCase) flags += 'i';
  if (re.multiline) flags += 'm';
  return flags;
}
clone.__getRegExpFlags = __getRegExpFlags;

return clone;
})();

if (typeof module === 'object' && module.exports) {
  module.exports = clone;
}

}).call(this)}).call(this,require("buffer").Buffer)
},{"buffer":15}],17:[function(require,module,exports){
exports.read = function (buffer, offset, isLE, mLen, nBytes) {
  var e, m
  var eLen = (nBytes * 8) - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var nBits = -7
  var i = isLE ? (nBytes - 1) : 0
  var d = isLE ? -1 : 1
  var s = buffer[offset + i]

  i += d

  e = s & ((1 << (-nBits)) - 1)
  s >>= (-nBits)
  nBits += eLen
  for (; nBits > 0; e = (e * 256) + buffer[offset + i], i += d, nBits -= 8) {}

  m = e & ((1 << (-nBits)) - 1)
  e >>= (-nBits)
  nBits += mLen
  for (; nBits > 0; m = (m * 256) + buffer[offset + i], i += d, nBits -= 8) {}

  if (e === 0) {
    e = 1 - eBias
  } else if (e === eMax) {
    return m ? NaN : ((s ? -1 : 1) * Infinity)
  } else {
    m = m + Math.pow(2, mLen)
    e = e - eBias
  }
  return (s ? -1 : 1) * m * Math.pow(2, e - mLen)
}

exports.write = function (buffer, value, offset, isLE, mLen, nBytes) {
  var e, m, c
  var eLen = (nBytes * 8) - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var rt = (mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0)
  var i = isLE ? 0 : (nBytes - 1)
  var d = isLE ? 1 : -1
  var s = value < 0 || (value === 0 && 1 / value < 0) ? 1 : 0

  value = Math.abs(value)

  if (isNaN(value) || value === Infinity) {
    m = isNaN(value) ? 1 : 0
    e = eMax
  } else {
    e = Math.floor(Math.log(value) / Math.LN2)
    if (value * (c = Math.pow(2, -e)) < 1) {
      e--
      c *= 2
    }
    if (e + eBias >= 1) {
      value += rt / c
    } else {
      value += rt * Math.pow(2, 1 - eBias)
    }
    if (value * c >= 2) {
      e++
      c /= 2
    }

    if (e + eBias >= eMax) {
      m = 0
      e = eMax
    } else if (e + eBias >= 1) {
      m = ((value * c) - 1) * Math.pow(2, mLen)
      e = e + eBias
    } else {
      m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen)
      e = 0
    }
  }

  for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8) {}

  e = (e << mLen) | m
  eLen += mLen
  for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8) {}

  buffer[offset + i - d] |= s * 128
}

},{}],18:[function(require,module,exports){
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/

'use strict';
/* eslint-disable no-unused-vars */
var getOwnPropertySymbols = Object.getOwnPropertySymbols;
var hasOwnProperty = Object.prototype.hasOwnProperty;
var propIsEnumerable = Object.prototype.propertyIsEnumerable;

function toObject(val) {
	if (val === null || val === undefined) {
		throw new TypeError('Object.assign cannot be called with null or undefined');
	}

	return Object(val);
}

function shouldUseNative() {
	try {
		if (!Object.assign) {
			return false;
		}

		// Detect buggy property enumeration order in older V8 versions.

		// https://bugs.chromium.org/p/v8/issues/detail?id=4118
		var test1 = new String('abc');  // eslint-disable-line no-new-wrappers
		test1[5] = 'de';
		if (Object.getOwnPropertyNames(test1)[0] === '5') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test2 = {};
		for (var i = 0; i < 10; i++) {
			test2['_' + String.fromCharCode(i)] = i;
		}
		var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
			return test2[n];
		});
		if (order2.join('') !== '0123456789') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test3 = {};
		'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
			test3[letter] = letter;
		});
		if (Object.keys(Object.assign({}, test3)).join('') !==
				'abcdefghijklmnopqrst') {
			return false;
		}

		return true;
	} catch (err) {
		// We don't expect any of the above to throw, but better to be safe.
		return false;
	}
}

module.exports = shouldUseNative() ? Object.assign : function (target, source) {
	var from;
	var to = toObject(target);
	var symbols;

	for (var s = 1; s < arguments.length; s++) {
		from = Object(arguments[s]);

		for (var key in from) {
			if (hasOwnProperty.call(from, key)) {
				to[key] = from[key];
			}
		}

		if (getOwnPropertySymbols) {
			symbols = getOwnPropertySymbols(from);
			for (var i = 0; i < symbols.length; i++) {
				if (propIsEnumerable.call(from, symbols[i])) {
					to[symbols[i]] = from[symbols[i]];
				}
			}
		}
	}

	return to;
};

},{}],19:[function(require,module,exports){
// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };

},{}]},{},[2]);
