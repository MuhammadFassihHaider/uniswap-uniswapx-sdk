import { BaseProvider } from "@ethersproject/providers";
import { Order, TokenAmount } from "../order";
export declare enum OrderValidation {
    Expired = 0,
    NonceUsed = 1,
    InsufficientFunds = 2,
    InvalidSignature = 3,
    InvalidOrderFields = 4,
    UnknownError = 5,
    ValidationFailed = 6,
    ExclusivityPeriod = 7,
    OK = 8
}
export interface ResolvedOrder {
    input: TokenAmount;
    outputs: TokenAmount[];
}
export interface OrderQuote {
    validation: OrderValidation;
    quote: ResolvedOrder | undefined;
}
export interface SignedOrder {
    order: Order;
    signature: string;
}
/**
 * Order quoter
 */
export declare class OrderQuoter {
    private provider;
    private chainId;
    private orderQuoter;
    constructor(provider: BaseProvider, chainId: number, orderQuoterAddress?: string);
    quote(order: SignedOrder): Promise<OrderQuote>;
    quoteBatch(orders: SignedOrder[]): Promise<OrderQuote[]>;
    private getValidations;
    private checkTerminalStates;
    get orderQuoterAddress(): string;
}
