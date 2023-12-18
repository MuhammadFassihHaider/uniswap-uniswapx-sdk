"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.stripHexPrefix = void 0;
const tslib_1 = require("tslib");
tslib_1.__exportStar(require("./OrderValidator"), exports);
tslib_1.__exportStar(require("./NonceManager"), exports);
tslib_1.__exportStar(require("./OrderQuoter"), exports);
tslib_1.__exportStar(require("./EventWatcher"), exports);
tslib_1.__exportStar(require("./multicall"), exports);
tslib_1.__exportStar(require("./dutchDecay"), exports);
function stripHexPrefix(a) {
    if (a.startsWith("0x")) {
        return a.slice(2);
    }
    else {
        return a;
    }
}
exports.stripHexPrefix = stripHexPrefix;
//# sourceMappingURL=index.js.map