"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var is_1 = require("./is");
var to_1 = require("./to");
var try_1 = require("./try");
/**
 * Cast Type
 * Attempts to cast a type to another type.
 *
 * @param val the value to be cast.
 * @param type the type to cast to.
 */
function castType(val, type) {
    function cast() {
        if (!is_1.isValue(val))
            return null;
        if (is_1.isArray(type)) {
            return to_1.toArray(val)
                .map(function (v) { return castType(v, type[0]); });
        }
        else if (is_1.isFunction(type)) {
            return type(val);
        }
        else if (is_1.isString(type)) {
            type = (type || getType(val)).toLowerCase();
            var map = {
                'string': to_1.toString,
                'boolean': to_1.toBoolean,
                'integer': to_1.toInteger,
                'float': to_1.toFloat,
                'number': to_1.toNumber,
                'date': to_1.toDate,
                'any': function (v) { return val; }
            }[type];
            if (map)
                return map(val);
            else
                throw new Error("Unknown type could not be cast.");
        }
        else {
            return val;
        }
    }
    return try_1.tryWrap(cast)(val);
}
exports.castType = castType;
/**
 * Get Type
 * Gets the type of an object.
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
 * @param unknown the string name for unknown types.
 */
function getType(val, strict, unknown) {
    if (is_1.isString(strict)) {
        unknown = strict;
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
    return unknown || 'any';
}
exports.getType = getType;
//# sourceMappingURL=type.js.map