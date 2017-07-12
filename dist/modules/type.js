"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var is_1 = require("./is");
var to_1 = require("./to");
var function_1 = require("./function");
var array_1 = require("./array");
var toMap = {
    'boolean': to_1.toBoolean,
    'date': to_1.toDate,
    'float': to_1.toFloat,
    'integer': to_1.toInteger,
    'number': to_1.toNumber,
    'regexp': to_1.toRegExp,
    'string': to_1.toString,
    'any': function (v) { return v; }
};
/**
 * Cast Type
 * Attempts to cast to specified type.
 *
 * @param type the type to cast to.
 * @param val the value to be cast.
 * @param def optional default value to return on null.
 * @param args optional args to pass when casting function.
 */
function castType(type, val, def) {
    var args = [];
    for (var _i = 3; _i < arguments.length; _i++) {
        args[_i - 3] = arguments[_i];
    }
    function cast() {
        if (!is_1.isValue(val))
            return to_1.toDefault(null, def);
        if (is_1.isArray(type)) {
            return to_1.toArray(val)
                .map(function (v, i) { return castType(type[i] || type[0], v); });
        }
        else if (is_1.isFunction(type)) {
            args = array_1.push(args, val).result;
            return type.apply(void 0, args);
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