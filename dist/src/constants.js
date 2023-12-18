"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BPS = exports.REVERSE_REACTOR_MAPPING = exports.MULTICALL_ADDRESS = exports.REACTOR_ADDRESS_MAPPING = exports.OrderType = exports.KNOWN_EVENT_SIGNATURES = exports.EXCLUSIVE_FILLER_VALIDATION_MAPPING = exports.ORDER_QUOTER_MAPPING = exports.PERMIT2_MAPPING = void 0;
exports.PERMIT2_MAPPING = {
    1: "0x000000000022d473030f116ddee9f6b43ac78ba3",
    5: "0x000000000022d473030f116ddee9f6b43ac78ba3",
    137: "0x000000000022d473030f116ddee9f6b43ac78ba3",
    12341234: "0x000000000022d473030f116ddee9f6b43ac78ba3",
};
exports.ORDER_QUOTER_MAPPING = {
    1: "0x54539967a06Fc0E3C3ED0ee320Eb67362D13C5fF",
    5: "0x54539967a06Fc0E3C3ED0ee320Eb67362D13C5fF",
    137: "0x54539967a06Fc0E3C3ED0ee320Eb67362D13C5fF",
    12341234: "0xbea0901A41177811b099F787D753436b2c47690E",
};
exports.EXCLUSIVE_FILLER_VALIDATION_MAPPING = {
    1: "0x8A66A74e15544db9688B68B06E116f5d19e5dF90",
    5: "0x0000000000000000000000000000000000000000",
    12341234: "0x8A66A74e15544db9688B68B06E116f5d19e5dF90",
};
var KNOWN_EVENT_SIGNATURES;
(function (KNOWN_EVENT_SIGNATURES) {
    KNOWN_EVENT_SIGNATURES["ERC20_TRANSFER"] = "0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef";
})(KNOWN_EVENT_SIGNATURES = exports.KNOWN_EVENT_SIGNATURES || (exports.KNOWN_EVENT_SIGNATURES = {}));
var OrderType;
(function (OrderType) {
    OrderType["Dutch"] = "Dutch";
})(OrderType = exports.OrderType || (exports.OrderType = {}));
exports.REACTOR_ADDRESS_MAPPING = {
    1: {
        [OrderType.Dutch]: "0x6000da47483062A0D734Ba3dc7576Ce6A0B645C4",
    },
    5: {
        [OrderType.Dutch]: "0x6000da47483062A0D734Ba3dc7576Ce6A0B645C4",
    },
    137: {
        [OrderType.Dutch]: "0x6000da47483062A0D734Ba3dc7576Ce6A0B645C4",
    },
    12341234: {
        [OrderType.Dutch]: "0xbD7F9D0239f81C94b728d827a87b9864972661eC",
    },
};
// https://github.com/mds1/multicall
exports.MULTICALL_ADDRESS = "0xcA11bde05977b3631167028862bE2a173976CA11";
exports.REVERSE_REACTOR_MAPPING = Object.entries(exports.REACTOR_ADDRESS_MAPPING).reduce((acc, [chainId, orderTypes]) => {
    for (const [orderType, reactorAddress] of Object.entries(orderTypes)) {
        // lowercase for consistency when parsing orders
        acc[reactorAddress.toLowerCase()] = {
            chainId: parseInt(chainId),
            orderType: OrderType[orderType],
        };
    }
    return acc;
}, {});
exports.BPS = 10000;
//# sourceMappingURL=constants.js.map