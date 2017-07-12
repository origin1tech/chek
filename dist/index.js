"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
var arr = require("./modules/array");
var frm = require("./modules/from");
var func = require("./modules/function");
var is = require("./modules/is");
var obj = require("./modules/object");
var str = require("./modules/string");
var to = require("./modules/to");
var typ = require("./modules/type");
// Add Chek to window when
// process.env.BROWSER is true.
/* istanbul ignore if */
if (is.isBrowser('BROWSER')) {
    to.toWindow(arr);
    to.toWindow(frm);
    to.toWindow(func);
    to.toWindow(is);
    to.toWindow(obj);
    to.toWindow(str);
    to.toWindow(to);
    to.toWindow('tryWrap', func.tryWrap);
    to.toWindow(typ);
}
__export(require("./modules/array"));
__export(require("./modules/constant"));
__export(require("./modules/from"));
__export(require("./modules/function"));
__export(require("./modules/is"));
__export(require("./modules/object"));
__export(require("./modules/string"));
__export(require("./modules/to"));
__export(require("./modules/type"));
//# sourceMappingURL=index.js.map