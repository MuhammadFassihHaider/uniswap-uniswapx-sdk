import { SignatureLike } from "@ethersproject/bytes";
import { PermitTransferFromData } from "@uniswap/permit2-sdk";
import { BigNumber } from "ethers";
import { ResolvedOrder } from "../utils/OrderQuoter";
import { Order, OrderInfo, OrderResolutionOptions } from "./types";
export declare function id(text: string): string;
export type DutchOutput = {
    readonly token: string;
    readonly startAmount: BigNumber;
    readonly endAmount: BigNumber;
    readonly recipient: string;
};
export type DutchOutputJSON = Omit<DutchOutput, "startAmount" | "endAmount"> & {
    startAmount: string;
    endAmount: string;
};
export type DutchInput = {
    readonly token: string;
    readonly startAmount: BigNumber;
    readonly endAmount: BigNumber;
};
export type DutchInputJSON = Omit<DutchInput, "startAmount" | "endAmount"> & {
    startAmount: string;
    endAmount: string;
};
export type DutchOrderInfo = OrderInfo & {
    decayStartTime: number;
    decayEndTime: number;
    exclusiveFiller: string;
    exclusivityOverrideBps: BigNumber;
    input: DutchInput;
    outputs: DutchOutput[];
};
export type DutchOrderInfoJSON = Omit<DutchOrderInfo, "nonce" | "input" | "outputs" | "exclusivityOverrideBps"> & {
    nonce: string;
    exclusivityOverrideBps: string;
    input: DutchInputJSON;
    outputs: DutchOutputJSON[];
};
export declare class DutchOrder extends Order {
    readonly info: DutchOrderInfo;
    readonly chainId: number;
    readonly _permit2Address?: string | undefined;
    permit2Address: string;
    constructor(info: DutchOrderInfo, chainId: number, _permit2Address?: string | undefined);
    static fromJSON(json: DutchOrderInfoJSON, chainId: number, _permit2Address?: string): DutchOrder;
    static parse(encoded: string, chainId: number, permit2?: string): DutchOrder;
    /**
     * @inheritdoc order
     */
    toJSON(): DutchOrderInfoJSON & {
        permit2Address: string;
        chainId: number;
    };
    /**
     * @inheritdoc order
     */
    serialize(): string;
    /**
     * @inheritdoc Order
     */
    getSigner(signature: SignatureLike): string;
    /**
     * @inheritdoc Order
     */
    permitData(): PermitTransferFromData;
    /**
     * @inheritdoc Order
     */
    hash(): string;
    /**
     * @inheritdoc Order
     */
    resolve(options: OrderResolutionOptions): ResolvedOrder;
    private toPermit;
    private witnessInfo;
    private witness;
}
