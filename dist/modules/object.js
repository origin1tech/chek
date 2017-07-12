"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _clone = require("clone");
var is_1 = require("./is");
var string_1 = require("./string");
/**
 * Match Index
 * @private
 *
 * @param prop the property to match.
 */
function matchIndex(prop) {
    // expression for matching arrays.
    var match = new RegExp('(.+)\\[([0-9]*)\\]', 'i').exec(prop);
    /* istanbul ignore if  */
    if (match && match.length === 3) {
        return { name: match[1], index: match[2] };
    }
    return false;
}
/**
 * Del
 * Deletes keys in an object.
 *
 * @param obj the object whose keys should be deleted.
 * @param props the property keys that should be deleted.
 */
function del(obj, key) {
    if (arguments.length !== 2 || (!is_1.isArray(key) && !is_1.isString(key)))
        return null;
    var props = string_1.split(key);
    var prop = props.shift();
    var match = matchIndex(prop);
    var next = obj[prop];
    /* istanbul ignore if  */
    if (match)
        next = obj[match.name][match.index];
    if (props.length > 0) {
        del(next, props);
    }
    else {
        if (match) {
            /* istanbul ignore next  */
            obj[match.name].splice(match.index, 1);
        }
        else {
            delete obj[prop];
        }
    }
    return obj;
}
exports.del = del;
/**
 * Get
 * Gets a property within the supplied object.
 *
 * @param obj the object to inspect.
 * @param prop
 */
function get(obj, key) {
    if (arguments.length !== 2 || (!is_1.isArray(key) && !is_1.isString(key)))
        return null;
    var _clone = clone(obj);
    var props = is_1.isArray(key) ? key : string_1.split(key);
    while (props.length && _clone) {
        var prop = props.shift(), match = void 0;
        match = matchIndex(prop);
        if (match) {
            /* istanbul ignore next  */
            if (!is_1.isUndefined(_clone[match.name]))
                _clone = _clone[match.name][match.index];
        }
        else {
            _clone = _clone[prop];
        }
    }
    return _clone;
}
exports.get = get;
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
/**
 * Extend
 * Extends objects similar to Object.assign
 * with the exception that undefined values are ignored.
 *
 * @example
 * extend({ name: 'Bob', active: true }, { active: undefined })
 * results in:
 * { name: 'Bob', active: true }
 *
 * @param obj primary object.
 * @param args unlimited number of objects to extend from.
 */
function extend(obj) {
    var args = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        args[_i - 1] = arguments[_i];
    }
    var shallow = false;
    var dest = obj;
    // Determin if is shallow.
    if (is_1.isBoolean(dest)) {
        shallow = dest;
        if (!args.length)
            return {};
        // get first arg as destination.
        dest = args.shift();
    }
    // If not an object return null.
    if (!is_1.isObject(dest))
        return null;
    // Itearate each object and extend
    // to the target object.
    for (var i = 0, src = void 0; src = args[i]; i++) {
        // Ignore if not and object.
        if (!is_1.isObject(src))
            continue;
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
    }
    return dest;
}
exports.extend = extend;
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
/**
 * Set
 * Sets a value on an object using dot notation or url path.
 *
 * @todo need to refactor this method.
 *
 * @param obj the object to set the value on.
 * @param key the property used for setting the value.
 * @param value the value used for updating the property.
 * @param dynamic when NOT false objects are dynamically created if required.
 */
function set(obj, key, val, dynamic) {
    /* istanbul ignore next  */
    if (arguments.length !== 3 || (!is_1.isArray(key) && !is_1.isString(key)))
        return null;
    var props = string_1.split(key);
    /* istanbul ignore next  */
    if (!is_1.isValue(val) && dynamic !== false)
        val = {};
    var prop = props.shift();
    var match = matchIndex(prop);
    var next = obj[prop];
    /* istanbul ignore next  */
    if (!is_1.isValue(next) && dynamic !== false)
        next = obj[prop] = {};
    /* istanbul ignore next  */
    if (match)
        next = obj[match.name][match.index];
    if (props.length > 0) {
        set(next, props, val);
    }
    else {
        /* istanbul ignore next  */
        if (match)
            obj[match.name][match.index] = val;
        else
            obj[prop] = val;
    }
    return obj;
}
exports.set = set;
//# sourceMappingURL=object.js.map