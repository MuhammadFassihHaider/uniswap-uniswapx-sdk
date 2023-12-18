"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderQuoter = exports.OrderValidation = void 0;
const tslib_1 = require("tslib");
const ethers_1 = require("ethers");
const constants_1 = require("../constants");
const contracts_1 = require("../contracts");
const errors_1 = require("../errors");
const validation_1 = require("../order/validation");
const NonceManager_1 = require("./NonceManager");
const multicall_1 = require("./multicall");
var OrderValidation;
(function (OrderValidation) {
    OrderValidation[OrderValidation["Expired"] = 0] = "Expired";
    OrderValidation[OrderValidation["NonceUsed"] = 1] = "NonceUsed";
    OrderValidation[OrderValidation["InsufficientFunds"] = 2] = "InsufficientFunds";
    OrderValidation[OrderValidation["InvalidSignature"] = 3] = "InvalidSignature";
    OrderValidation[OrderValidation["InvalidOrderFields"] = 4] = "InvalidOrderFields";
    OrderValidation[OrderValidation["UnknownError"] = 5] = "UnknownError";
    OrderValidation[OrderValidation["ValidationFailed"] = 6] = "ValidationFailed";
    OrderValidation[OrderValidation["ExclusivityPeriod"] = 7] = "ExclusivityPeriod";
    OrderValidation[OrderValidation["OK"] = 8] = "OK";
})(OrderValidation = exports.OrderValidation || (exports.OrderValidation = {}));
const BASIC_ERROR = "0x08c379a0";
const KNOWN_ERRORS = {
    "8baa579f": OrderValidation.InvalidSignature,
    "815e1d64": OrderValidation.InvalidSignature,
    "756688fe": OrderValidation.NonceUsed,
    // invalid dutch decay time
    "302e5b7c": OrderValidation.InvalidOrderFields,
    // invalid dutch decay time
    "773a6187": OrderValidation.InvalidOrderFields,
    // invalid reactor address
    "4ddf4a64": OrderValidation.InvalidOrderFields,
    // both input and output decay
    d303758b: OrderValidation.InvalidOrderFields,
    // Incorrect amounts
    "7c1f8113": OrderValidation.InvalidOrderFields,
    // invalid dutch decay time
    "43133453": OrderValidation.InvalidOrderFields,
    "48fee69c": OrderValidation.InvalidOrderFields,
    "70f65caa": OrderValidation.Expired,
    ee3b3d4b: OrderValidation.NonceUsed,
    "0a0b0d79": OrderValidation.ValidationFailed,
    b9ec1e96: OrderValidation.ExclusivityPeriod,
    "062dec56": OrderValidation.ExclusivityPeriod,
    "75c1bb14": OrderValidation.ExclusivityPeriod,
    TRANSFER_FROM_FAILED: OrderValidation.InsufficientFunds,
};
/**
 * Order quoter
 */
class OrderQuoter {
    constructor(provider, chainId, orderQuoterAddress) {
        this.provider = provider;
        this.chainId = chainId;
        if (orderQuoterAddress) {
            this.orderQuoter = contracts_1.OrderQuoter__factory.connect(orderQuoterAddress, provider);
        }
        else if (constants_1.ORDER_QUOTER_MAPPING[chainId]) {
            this.orderQuoter = contracts_1.OrderQuoter__factory.connect(constants_1.ORDER_QUOTER_MAPPING[chainId], this.provider);
        }
        else {
            throw new errors_1.MissingConfiguration("orderQuoter", chainId.toString());
        }
    }
    quote(order) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return (yield this.quoteBatch([order]))[0];
        });
    }
    quoteBatch(orders) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const calls = orders.map((order) => {
                return [order.order.serialize(), order.signature];
            });
            const results = yield (0, multicall_1.multicallSameContractManyFunctions)(this.provider, {
                address: this.orderQuoter.address,
                contractInterface: this.orderQuoter.interface,
                functionName: "quote",
                functionParams: calls,
            });
            const validations = yield this.getValidations(orders, results);
            const quotes = results.map(({ success, returnData }) => {
                if (!success) {
                    return undefined;
                }
                return this.orderQuoter.interface.decodeFunctionResult("quote", returnData).result;
            });
            return validations.map((validation, i) => {
                return {
                    validation,
                    quote: quotes[i],
                };
            });
        });
    }
    getValidations(orders, results) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const validations = results.map((result, idx) => {
                if (result.success) {
                    return OrderValidation.OK;
                }
                else {
                    let returnData = result.returnData;
                    // Parse traditional string error messages
                    if (returnData.startsWith(BASIC_ERROR)) {
                        returnData = new ethers_1.ethers.utils.AbiCoder().decode(["string"], "0x" + returnData.slice(10))[0];
                    }
                    for (const key of Object.keys(KNOWN_ERRORS)) {
                        if (returnData.includes(key)) {
                            if (key === "0a0b0d79") {
                                const fillerValidation = (0, validation_1.parseExclusiveFillerData)(orders[idx].order.info.additionalValidationData);
                                if (fillerValidation.type === validation_1.ValidationType.ExclusiveFiller &&
                                    fillerValidation.data.filler !== ethers_1.ethers.constants.AddressZero) {
                                    return OrderValidation.ExclusivityPeriod;
                                }
                                return OrderValidation.ValidationFailed;
                            }
                            return KNOWN_ERRORS[key];
                        }
                    }
                    return OrderValidation.UnknownError;
                }
            });
            return yield this.checkTerminalStates(orders, validations);
        });
    }
    // The quoter contract has a quirk that make validations inaccurate:
    // - checks expiry before anything else, so old but already filled orders will return as expired
    // so this function takes orders in expired state and double checks them
    checkTerminalStates(orders, validations) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield Promise.all(validations.map((validation, i) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                const order = orders[i];
                if (validation === OrderValidation.Expired ||
                    order.order.info.deadline < Math.floor(new Date().getTime() / 1000)) {
                    // all reactors have the same interface, we just use limitorder to implement the interface
                    const reactor = contracts_1.ExclusiveDutchOrderReactor__factory.connect(order.order.info.reactor, this.provider);
                    const nonceManager = new NonceManager_1.NonceManager(this.provider, this.chainId, yield reactor.permit2());
                    const maker = order.order.getSigner(order.signature);
                    const cancelled = yield nonceManager.isUsed(maker, order.order.info.nonce);
                    return cancelled
                        ? OrderValidation.NonceUsed
                        : OrderValidation.Expired;
                }
                else {
                    return validation;
                }
            })));
        });
    }
    get orderQuoterAddress() {
        return this.orderQuoter.address;
    }
}
exports.OrderQuoter = OrderQuoter;
//# sourceMappingURL=OrderQuoter.js.map