export declare const PERMIT2_MAPPING: {
    readonly [key: number]: string;
};
export declare const ORDER_QUOTER_MAPPING: {
    readonly [key: number]: string;
};
export declare const EXCLUSIVE_FILLER_VALIDATION_MAPPING: {
    readonly [key: number]: string;
};
export declare enum KNOWN_EVENT_SIGNATURES {
    ERC20_TRANSFER = "0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef"
}
export declare enum OrderType {
    Dutch = "Dutch"
}
type Reactors = {
    [key in OrderType]: string;
};
type ReactorMapping = {
    readonly [key: number]: Reactors;
};
type ReverseReactorMapping = {
    [key: string]: {
        chainId: number;
        orderType: OrderType;
    };
};
export declare const REACTOR_ADDRESS_MAPPING: ReactorMapping;
export declare const MULTICALL_ADDRESS = "0xcA11bde05977b3631167028862bE2a173976CA11";
export declare const REVERSE_REACTOR_MAPPING: ReverseReactorMapping;
export declare const BPS = 10000;
export {};
