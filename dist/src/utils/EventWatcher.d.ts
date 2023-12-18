import { BaseProvider, Log } from "@ethersproject/providers";
import { BigNumber, Event } from "ethers";
import { FillEvent } from "../contracts/DutchOrderReactor";
export type TokenTransfer = {
    token: string;
    amount: BigNumber;
};
export interface FillData {
    orderHash: string;
    filler: string;
    nonce: BigNumber;
    swapper: string;
}
export interface FillInfo extends FillData {
    blockNumber: number;
    txHash: string;
    inputs: TokenTransfer[];
    outputs: TokenTransfer[];
}
/**
 * Helper for watching events
 */
export declare class EventWatcher {
    private reactor;
    constructor(provider: BaseProvider, reactorAddress: string);
    getFillLogs(fromBlock: number, toBlock?: number): Promise<FillEvent[]>;
    getFillEvents(fromBlock: number, toBlock?: number): Promise<FillData[]>;
    getFillInfo(fromBlock: number, toBlock?: number): Promise<FillInfo[]>;
    onFill(callback: (fillData: FillData, event: Event) => void): void;
    getTokenTransfers(logs: Log[], recipient: string): {
        token: string;
        amount: BigNumber;
    }[];
}
