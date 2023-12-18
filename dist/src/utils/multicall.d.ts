import { Interface } from "@ethersproject/abi";
import { BaseProvider } from "@ethersproject/providers";
export type MulticallParams = {
    contractInterface: Interface;
    functionName: string;
};
export type MulticallSameContractParams<TFunctionParams> = MulticallParams & {
    address: string;
    functionParams: TFunctionParams[];
};
export type MulticallSameFunctionParams<TFunctionParams> = MulticallParams & {
    addresses: string[];
    functionParam: TFunctionParams;
};
export type MulticallResult = {
    success: boolean;
    returnData: string;
};
type Call = {
    target: string;
    callData: string;
};
export declare function multicallSameContractManyFunctions<TFunctionParams extends any[] | undefined>(provider: BaseProvider, params: MulticallSameContractParams<TFunctionParams>): Promise<MulticallResult[]>;
export declare function multicallSameFunctionManyContracts<TFunctionParams extends any[] | undefined>(provider: BaseProvider, params: MulticallSameFunctionParams<TFunctionParams>): Promise<MulticallResult[]>;
export declare function multicall(provider: BaseProvider, calls: Call[]): Promise<MulticallResult[]>;
export {};
