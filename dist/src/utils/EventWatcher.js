"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventWatcher = void 0;
const tslib_1 = require("tslib");
const ethers_1 = require("ethers");
const MockERC20_json_1 = tslib_1.__importDefault(require("../../abis/MockERC20.json"));
const contracts_1 = require("../contracts");
const TRANSFER = "Transfer";
/**
 * Helper for watching events
 */
class EventWatcher {
    constructor(provider, reactorAddress) {
        this.reactor = contracts_1.ExclusiveDutchOrderReactor__factory.connect(reactorAddress, provider);
    }
    getFillLogs(fromBlock, toBlock) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.reactor.queryFilter(this.reactor.filters.Fill(), fromBlock, toBlock);
        });
    }
    getFillEvents(fromBlock, toBlock) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const logs = yield this.getFillLogs(fromBlock, toBlock);
            return logs.map((log) => log.args);
        });
    }
    getFillInfo(fromBlock, toBlock) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const logs = yield this.getFillLogs(fromBlock, toBlock);
            const events = logs.map((log) => log.args);
            // TODO: deal with batch fills for orders with the same swapper and outToken
            const txs = logs.reduce((acc, log) => acc.add(this.reactor.provider.getTransactionReceipt(log.transactionHash)), new Set());
            const txReceipts = yield Promise.all(txs);
            const fills = events.map((e, i) => {
                return {
                    orderHash: e.orderHash,
                    swapper: e.swapper,
                    filler: e.filler,
                    nonce: e.nonce,
                    txLogs: txReceipts[i].logs,
                    blockNumber: txReceipts[i].blockNumber,
                    txHash: txReceipts[i].transactionHash,
                };
            });
            return fills.map((fill) => {
                const outputs = this.getTokenTransfers(fill.txLogs, fill.swapper);
                const inputs = this.getTokenTransfers(fill.txLogs, fill.filler);
                return {
                    orderHash: fill.orderHash,
                    swapper: fill.swapper,
                    filler: fill.filler,
                    nonce: fill.nonce,
                    blockNumber: fill.blockNumber,
                    txHash: fill.txHash,
                    inputs: inputs,
                    outputs: outputs,
                };
            });
        });
    }
    onFill(callback) {
        this.reactor.on(this.reactor.filters.Fill(), (orderHash, filler, swapper, nonce, event) => {
            callback({
                orderHash,
                filler,
                nonce,
                swapper,
            }, event);
        });
    }
    getTokenTransfers(logs, recipient) {
        const ERC20Interface = new ethers_1.utils.Interface(MockERC20_json_1.default.abi);
        return logs.reduce((logAcc, log) => {
            try {
                const parsedLog = ERC20Interface.parseLog(log);
                if (parsedLog.name === TRANSFER && parsedLog.args.to === recipient) {
                    logAcc.push({
                        token: log.address,
                        amount: parsedLog.args.amount,
                    });
                }
                return logAcc;
            }
            catch (e) {
                return logAcc;
            }
        }, []);
    }
}
exports.EventWatcher = EventWatcher;
//# sourceMappingURL=EventWatcher.js.map