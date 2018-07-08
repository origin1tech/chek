"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _clone = require("lodash.clone");
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
    var prefix = prop.match(/[^\[]+/i);
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
        var prop = props.shift(), match = void 0;
        match = matchIndex(prop);
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
function _put(obj, key, val) {
    if (!is_1.isObject(obj) || (!is_1.isArray(key) && !is_1.isString(key)))
        return null;
    // Get current and ensure an array.
    var cur = to_1.toArray(get(obj, key), []);
    if (!is_1.isArray(val))
        val = [val];
    return _set(obj, key, cur.concat(val));
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
        return Object.assign.apply(Object, [obj].concat(args));
    return objAssign.apply(void 0, [obj].concat(args));
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
        var prop = props.shift(), match = matchIndex(prop);
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
        return set(a, c, get(obj, c, undefined));
    }, {});
}
exports.pick = pick;
//# sourceMappingURL=object.js.map