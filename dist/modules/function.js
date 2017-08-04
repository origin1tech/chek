"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
 * if cannot require or empty object if safe
 * flag is provided.
 *
 * @param name the name of module to try and require.
 * @param def optional default value on null.
 */
function tryRequire(name, def) {
    function _require() {
        if (!is_1.isNode())
            /* istanbul ignore next */
            return to_1.toDefault(null, def);
        return require(name);
    }
    return tryWrap(_require)(def);
}
exports.tryRequire = tryRequire;
//# sourceMappingURL=function.js.map