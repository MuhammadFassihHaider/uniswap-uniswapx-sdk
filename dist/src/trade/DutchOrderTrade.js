"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DutchOrderTrade = void 0;
const sdk_core_1 = require("@uniswap/sdk-core");
const order_1 = require("../order");
const utils_1 = require("./utils");
class DutchOrderTrade {
    constructor({ currencyIn, currenciesOut, orderInfo, tradeType, }) {
        this._currencyIn = currencyIn;
        this._currenciesOut = currenciesOut;
        this.tradeType = tradeType;
        // assume single-chain for now
        this.order = new order_1.DutchOrder(orderInfo, currencyIn.chainId);
    }
    get inputAmount() {
        if (this._inputAmount)
            return this._inputAmount;
        const amount = sdk_core_1.CurrencyAmount.fromRawAmount(this._currencyIn, this.order.info.input.startAmount.toString());
        this._inputAmount = amount;
        return amount;
    }
    get outputAmounts() {
        if (this._outputAmounts)
            return this._outputAmounts;
        const amounts = this.order.info.outputs.map((output) => {
            // assume single chain ids across all outputs for now
            const currencyOut = this._currenciesOut.find((currency) => (0, utils_1.areCurrenciesEqual)(currency, output.token, currency.chainId));
            if (!currencyOut) {
                throw new Error("currency not found in output array");
            }
            return sdk_core_1.CurrencyAmount.fromRawAmount(currencyOut, output.startAmount.toString());
        });
        this._outputAmounts = amounts;
        return amounts;
    }
    getFirstNonFeeOutputStartEndAmounts() {
        if (this._firstNonFeeOutputStartEndAmounts)
            return this._firstNonFeeOutputStartEndAmounts;
        if (this.order.info.outputs.length === 0) {
            throw new Error("there must be at least one output token");
        }
        const output = this.order.info.outputs[0];
        // assume single chain ids across all outputs for now
        const currencyOut = this._currenciesOut.find((currency) => (0, utils_1.areCurrenciesEqual)(currency, output.token, currency.chainId));
        if (!currencyOut) {
            throw new Error("currency output from order must exist in currenciesOut list");
        }
        const startEndAmounts = {
            startAmount: sdk_core_1.CurrencyAmount.fromRawAmount(currencyOut, output.startAmount.toString()),
            endAmount: sdk_core_1.CurrencyAmount.fromRawAmount(currencyOut, output.endAmount.toString()),
        };
        this._firstNonFeeOutputStartEndAmounts = startEndAmounts;
        return startEndAmounts;
    }
    // TODO: revise when there are actually multiple output amounts. for now, assume only one non-fee output at a time
    get outputAmount() {
        return this.getFirstNonFeeOutputStartEndAmounts().startAmount;
    }
    minimumAmountOut() {
        return this.getFirstNonFeeOutputStartEndAmounts().endAmount;
    }
    maximumAmountIn() {
        return sdk_core_1.CurrencyAmount.fromRawAmount(this._currencyIn, this.order.info.input.endAmount.toString());
    }
    /**
     * The price expressed in terms of output amount/input amount.
     */
    get executionPrice() {
        var _a;
        return ((_a = this._executionPrice) !== null && _a !== void 0 ? _a : (this._executionPrice = new sdk_core_1.Price(this.inputAmount.currency, this.outputAmount.currency, this.inputAmount.quotient, this.outputAmount.quotient)));
    }
    /**
     * Return the execution price after accounting for slippage tolerance
     * @returns The execution price
     */
    worstExecutionPrice() {
        return new sdk_core_1.Price(this.inputAmount.currency, this.outputAmount.currency, this.maximumAmountIn().quotient, this.minimumAmountOut().quotient);
    }
}
exports.DutchOrderTrade = DutchOrderTrade;
//# sourceMappingURL=DutchOrderTrade.js.map