"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* istanbul ignore next */
/**
 * Noop
 */
function noop() { }
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
//# sourceMappingURL=function.js.map