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
    if (match && match.length === 3) {
        return { name: match[1], index: match[2] };
    }
    return false;
}
/**
 * Del
 * @private
 */
function _del(obj, key) {
    if (arguments.length !== 2 || (!is_1.isArray(key) && !is_1.isString(key)))
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
    if (arguments.length !== 2 || (!is_1.isArray(key) && !is_1.isString(key)))
        return null;
    var props = is_1.isArray(key) ? key : string_1.split(key);
    while (props.length && obj) {
        var prop = props.shift(), match = void 0;
        match = matchIndex(prop);
        if (match) {
            /* istanbul ignore next  */
            if (!is_1.isUndefined(obj[match.name]))
                obj = obj[match.name][match.index];
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
    if (arguments.length !== 3 || (!is_1.isArray(key) && !is_1.isString(key)))
        return null;
    var props = string_1.split(key);
    /* istanbul ignore if */
    if (!is_1.isValue(val))
        val = {};
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
        return _del(clone(obj), key);
    return _del(obj, key);
}
exports.del = del;
/**
 * Get
 * Gets a property within the supplied object.
 *
 * @param obj the object to inspect.
 * @param key the dot notated key or array of keys.
 */
function get(obj, key) {
    return _get(clone(obj), key);
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
 * NOTE: use Object.assign if available!!
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
        return dest;
    // Itearate each object and extend
    // to the target object.
    var i = 0;
    // for (let i = 0, src: any; src = args[i]; i++) {
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
        while (i--) {
            tmpStr += obj[i];
        }
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
        return _set(clone(obj), key, val);
    return _set(obj, key, val);
}
exports.set = set;
//# sourceMappingURL=object.js.map