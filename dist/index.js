"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
/* Import all methods in case need to add to window */
var chek = require("./chek");
/* istanbul ignore if */
chek.toWindow('chek', chek, ['tryRequire', 'isNode']);
__exportStar(require("./types"), exports);
__exportStar(require("./modules/array"), exports);
__exportStar(require("./modules/constant"), exports);
__exportStar(require("./modules/from"), exports);
__exportStar(require("./modules/function"), exports);
__exportStar(require("./modules/is"), exports);
__exportStar(require("./modules/object"), exports);
__exportStar(require("./modules/string"), exports);
__exportStar(require("./modules/to"), exports);
__exportStar(require("./modules/type"), exports);
exports.default = chek;
//# sourceMappingURL=index.js.map