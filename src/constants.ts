export const PERMIT2_MAPPING: { readonly [key: number]: string } = {
  1: "0x000000000022d473030f116ddee9f6b43ac78ba3",
  5: "0x000000000022d473030f116ddee9f6b43ac78ba3",
  137: "0x000000000022d473030f116ddee9f6b43ac78ba3",
  12341234: "0x000000000022d473030f116ddee9f6b43ac78ba3"
};

export const ORDER_QUOTER_MAPPING: { readonly [key: number]: string } = {
  1: "0xbea0901A41177811b099F787D753436b2c47690E",
  5: "0x3946398638B21cE394841537EC1c1F557491971a",
  137: "0xbea0901A41177811b099F787D753436b2c47690E",
  12341234: "0xbea0901A41177811b099F787D753436b2c47690E"
};

export const EXCLUSIVE_FILLER_VALIDATION_MAPPING: {
  readonly [key: number]: string;
} = {
  1: "0x8A66A74e15544db9688B68B06E116f5d19e5dF90",
  5: "0x0000000000000000000000000000000000000000",
  12341234: "0x8A66A74e15544db9688B68B06E116f5d19e5dF90"
};

export enum KNOWN_EVENT_SIGNATURES {
  ERC20_TRANSFER = "0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef"
}

export enum OrderType {
  DutchLimit = "DutchLimit"
}

type Reactors = {
  [key in OrderType]: string;
};

type ReactorMapping = { readonly [key: number]: Reactors };
type ReverseReactorMapping = {
  [key: string]: { chainId: number; orderType: OrderType };
};

export const REACTOR_ADDRESS_MAPPING: ReactorMapping = {
  1: {
    [OrderType.DutchLimit]: "0xbD7F9D0239f81C94b728d827a87b9864972661eC"
  },
  5: {
    [OrderType.DutchLimit]: "0xE5D50eB6e669C32D797379aF3907478FE491036D"
  },
  137: {
    [OrderType.DutchLimit]: "0xbD7F9D0239f81C94b728d827a87b9864972661eC"
  },
  12341234: {
    [OrderType.DutchLimit]: "0xFF086b7696Dc4116B336Dd0e42ecd2164FC2712B"
  }
};

export const getMulticall2Address = (chainId: number): string => {
  switch (chainId) {
    case 1:
      return "0x5ba1e12693dc8f9c48aad8770482f4739beed696";
    case 137:
      return "0x77D34120FC8520E22b81cfE827DcA01C746B7031";
    case 12341234:
      return "0x5ba1e12693dc8f9c48aad8770482f4739beed696";
    default:
      return "0x5ba1e12693dc8f9c48aad8770482f4739beed696";
  }
};

export const REVERSE_REACTOR_MAPPING: ReverseReactorMapping = Object.entries(
  REACTOR_ADDRESS_MAPPING
).reduce((acc: ReverseReactorMapping, [chainId, orderTypes]) => {
  for (const [orderType, reactorAddress] of Object.entries(orderTypes)) {
    // lowercase for consistency when parsing orders
    acc[reactorAddress.toLowerCase()] = {
      chainId: parseInt(chainId),
      orderType: OrderType[orderType as keyof typeof OrderType]
    };
  }

  return acc;
}, {});
