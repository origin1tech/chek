"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var is_1 = require("./is");
/**
 * Split
 * Splits a string at character.
 * Default possible chars to match: ['/', '.', ',', ';', '|']
 *
 * @param val the string to be split.
 * @param char the character to split at.
 */
function split(val, char) {
    if (is_1.isArray(val))
        return val;
    if (!is_1.isValue(val) || !is_1.isString(val))
        return null;
    // default characters.
    var defChars = ['/', '.', ',', ';', '|'];
    var arr;
    // if no char iterate defaults.
    var i = defChars.length;
    while (i-- && !char) {
        var tmpChar = defChars[i];
        if (val.indexOf(tmpChar) !== -1)
            char = tmpChar;
    }
    char = char || '.';
    arr = val.split(char);
    // If empty remove first element.
    // this happens when splitting on
    // char and is first char in string.
    if (is_1.isEmpty(arr[0]))
        arr.shift();
    return arr;
}
exports.split = split;
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
//# sourceMappingURL=string.js.map