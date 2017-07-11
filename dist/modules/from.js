"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var is_1 = require("./is");
var try_1 = require("./try");
/**
 * From Epoch
 * Converts to a Date from an epoch.
 *
 * @param val the epoch value to convert to date.
 */
function fromEpoch(val) {
    if (!is_1.isValue(val) || !is_1.isNumber(val))
        return null;
    return new Date(val);
}
exports.fromEpoch = fromEpoch;
/**
 * From JSON
 * Simple wrapper to parse json.
 * @alias tryParseJSON
 *
 * @param str the string to be parsed.
 * @param def a default fallback value on failed parse.
 */
function fromJSON(str, def) {
    return try_1.tryWrap(JSON.parse, str)(def);
}
exports.fromJSON = fromJSON;
//# sourceMappingURL=from.js.map