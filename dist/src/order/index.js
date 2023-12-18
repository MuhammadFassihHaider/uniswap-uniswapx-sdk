"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseOrder = void 0;
const tslib_1 = require("tslib");
const constants_1 = require("../constants");
const errors_1 = require("../errors");
const utils_1 = require("../utils");
const DutchOrder_1 = require("./DutchOrder");
tslib_1.__exportStar(require("./DutchOrder"), exports);
tslib_1.__exportStar(require("./types"), exports);
tslib_1.__exportStar(require("./validation"), exports);
const FIRST_FIELD_OFFSET = 88;
const ADDRESS_LENGTH = 40;
/**
 * Parses a given serialized order
 * @return Parsed order object
 */
function parseOrder(order) {
    // reactor address is always the first field in order
    const reactor = "0x" +
        (0, utils_1.stripHexPrefix)(order)
            .slice(FIRST_FIELD_OFFSET, FIRST_FIELD_OFFSET + ADDRESS_LENGTH)
            .toLowerCase();
    if (!constants_1.REVERSE_REACTOR_MAPPING[reactor]) {
        throw new errors_1.MissingConfiguration("reactor", reactor);
    }
    const { chainId, orderType } = constants_1.REVERSE_REACTOR_MAPPING[reactor];
    switch (orderType) {
        case constants_1.OrderType.Dutch:
            return DutchOrder_1.DutchOrder.parse(order, chainId);
        default:
            throw new errors_1.MissingConfiguration("orderType", orderType);
    }
}
exports.parseOrder = parseOrder;
//# sourceMappingURL=index.js.map