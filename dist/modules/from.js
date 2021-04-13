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
//# sourceMappingURL=from.js.map