"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
    var arr;
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
    arr = val.split(char).map(function (v) { return v.trim(); });
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
//# sourceMappingURL=string.js.map