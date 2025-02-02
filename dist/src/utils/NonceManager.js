"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCancelSingleParams = exports.setBit = exports.getFirstUnsetBit = exports.buildNonce = exports.splitNonce = exports.NonceManager = void 0;
const tslib_1 = require("tslib");
const ethers_1 = require("ethers");
const constants_1 = require("../constants");
const contracts_1 = require("../contracts");
const errors_1 = require("../errors");
/**
 * Helper to track Permit2 nonces for addresses
 */
class NonceManager {
    constructor(provider, chainId, permit2Address) {
        this.provider = provider;
        if (permit2Address) {
            this.permit2 = contracts_1.Permit2__factory.connect(permit2Address, provider);
        }
        else if (constants_1.PERMIT2_MAPPING[chainId]) {
            this.permit2 = contracts_1.Permit2__factory.connect(constants_1.PERMIT2_MAPPING[chainId], this.provider);
        }
        else {
            throw new errors_1.MissingConfiguration("orderQuoter", chainId.toString());
        }
        this.currentWord = new Map();
        this.currentBitmap = new Map();
    }
    /**
     * Finds the next unused nonce and returns it
     * Marks the nonce as used so it won't be returned again from this instance
     * NOTE: if any nonce usages are in-flight and created outside of this instance,
     * this function will not know about them and will return duplicates
     */
    useNonce(address) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const { word, bitmap } = yield this.getNextOpenWord(address);
            const bitPos = getFirstUnsetBit(bitmap);
            this.currentWord.set(address, word);
            this.currentBitmap.set(address, setBit(bitmap, bitPos));
            return buildNonce(word, bitPos);
        });
    }
    isUsed(address, nonce) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const { word, bitPos } = splitNonce(nonce);
            const bitmap = yield this.permit2.nonceBitmap(address, word);
            return bitmap.div(ethers_1.BigNumber.from(2).pow(bitPos)).mod(2).eq(1);
        });
    }
    // Returns the first word that contains empty bits
    getNextOpenWord(address) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            let currentWord = this.currentWord.get(address) || ethers_1.BigNumber.from(0);
            let bitmap = this.currentBitmap.get(address) ||
                (yield this.permit2.nonceBitmap(address, currentWord));
            while (bitmap.eq(ethers_1.ethers.constants.MaxUint256)) {
                currentWord = currentWord.add(1);
                bitmap = yield this.permit2.nonceBitmap(address, currentWord);
            }
            return {
                word: currentWord,
                bitmap: bitmap,
            };
        });
    }
}
exports.NonceManager = NonceManager;
// Splits a permit2 nonce into the word and bitPos
function splitNonce(nonce) {
    const word = nonce.div(256);
    const bitPos = nonce.mod(256);
    return { word, bitPos };
}
exports.splitNonce = splitNonce;
// Builds a permit2 nonce from the given word and bitPos
function buildNonce(word, bitPos) {
    // word << 8
    const shiftedWord = word.mul(256);
    return shiftedWord.add(bitPos);
}
exports.buildNonce = buildNonce;
// Returns the position of the first unset bit
// Returns -1 if all bits are set
function getFirstUnsetBit(bitmap) {
    // Optimization if switch to library w/ bitwise operators:
    // return ~bitmap + (bitmap + 1)
    // instead we have to do a loop
    for (let i = 0; i < 256; i++) {
        if (bitmap.div(ethers_1.BigNumber.from(2).pow(i)).mod(2).eq(0)) {
            return i;
        }
    }
    return -1;
}
exports.getFirstUnsetBit = getFirstUnsetBit;
// Returns the given bignumber with the given bit set
// Does nothing if the given bit is already set
function setBit(bitmap, bitPos) {
    // Optimization if switch to library w/ bitwise operators:
    // return bitmap & (1 << bitPos)
    const mask = ethers_1.BigNumber.from(2).pow(bitPos);
    if (bitmap.div(mask).mod(2).eq(1)) {
        return bitmap;
    }
    return bitmap.add(mask);
}
exports.setBit = setBit;
// Get parameters to cancel a nonce
function getCancelSingleParams(nonceToCancel) {
    const { word, bitPos } = splitNonce(nonceToCancel);
    const mask = ethers_1.BigNumber.from(2).pow(bitPos);
    return { word, mask };
}
exports.getCancelSingleParams = getCancelSingleParams;
//# sourceMappingURL=NonceManager.js.map