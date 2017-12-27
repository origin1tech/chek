"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
/* Import all methods in case need to add to window */
var chek = require("./chek");
/* istanbul ignore if */
chek.toWindow('chek', chek, ['tryRequire', 'isNode']);
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