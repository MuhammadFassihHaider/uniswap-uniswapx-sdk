"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.areCurrenciesEqual = exports.NativeAssets = void 0;
const sdk_core_1 = require("@uniswap/sdk-core");
const ethers_1 = require("ethers");
var NativeAssets;
(function (NativeAssets) {
    NativeAssets["MATIC"] = "MATIC";
    NativeAssets["BNB"] = "BNB";
    NativeAssets["AVAX"] = "AVAX";
    NativeAssets["ETH"] = "ETH";
})(NativeAssets = exports.NativeAssets || (exports.NativeAssets = {}));
function nativeCurrencyAddressString(chainId) {
    switch (chainId) {
        case sdk_core_1.ChainId.POLYGON:
            return NativeAssets.MATIC;
        case sdk_core_1.ChainId.BNB:
            return NativeAssets.BNB;
        case sdk_core_1.ChainId.AVALANCHE:
            return NativeAssets.AVAX;
        default:
            return NativeAssets.ETH;
    }
}
function areCurrenciesEqual(currency, address, chainId) {
    if (currency.chainId !== chainId)
        return false;
    if (currency.isNative) {
        return (address === ethers_1.constants.AddressZero ||
            address === nativeCurrencyAddressString(chainId));
    }
    return currency.address.toLowerCase() === (address === null || address === void 0 ? void 0 : address.toLowerCase());
}
exports.areCurrenciesEqual = areCurrenciesEqual;
//# sourceMappingURL=utils.js.map