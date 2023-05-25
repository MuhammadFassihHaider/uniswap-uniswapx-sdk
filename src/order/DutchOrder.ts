import { SignatureLike } from "@ethersproject/bytes";
import { keccak256 } from "@ethersproject/keccak256";
import { toUtf8Bytes } from "@ethersproject/strings";
import {
  PermitTransferFrom,
  PermitTransferFromData,
  SignatureTransfer,
  Witness,
} from "@uniswap/permit2-sdk";
import { BigNumber, ethers } from "ethers";

import { PERMIT2_MAPPING } from "../constants";
import { MissingConfiguration } from "../errors";
import { ResolvedOrder } from "../utils/OrderQuoter";
import { getDecayedAmount } from "../utils/dutchDecay";

import { Order, OrderInfo, OrderResolutionOptions } from "./types";

export function id(text: string): string {
  return keccak256(toUtf8Bytes(text));
}

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
  startTime: number;
  endTime: number;
  exclusiveFiller: string;
  exclusivityOverrideBps: BigNumber;
  input: DutchInput;
  outputs: DutchOutput[];
};

export type DutchOrderInfoJSON = Omit<
  DutchOrderInfo,
  "nonce" | "input" | "outputs" | "exclusivityOverrideBps"
> & {
  nonce: string;
  exclusivityOverrideBps: string;
  input: DutchInputJSON;
  outputs: DutchOutputJSON[];
};

type WitnessInfo = {
  info: OrderInfo;
  startTime: number;
  endTime: number;
  exclusiveFiller: string;
  exclusivityOverrideBps: BigNumber;
  inputToken: string;
  inputStartAmount: BigNumber;
  inputEndAmount: BigNumber;
  outputs: DutchOutput[];
};

const DUTCH_ORDER_TYPES = {
  // TODO: remove "Limit"
  ExclusiveDutchLimitOrder: [
    { name: "info", type: "OrderInfo" },
    { name: "startTime", type: "uint256" },
    { name: "endTime", type: "uint256" },
    { name: "exclusiveFiller", type: "address" },
    { name: "exclusivityOverrideBps", type: "uint256" },
    { name: "inputToken", type: "address" },
    { name: "inputStartAmount", type: "uint256" },
    { name: "inputEndAmount", type: "uint256" },
    { name: "outputs", type: "DutchOutput[]" },
  ],
  OrderInfo: [
    { name: "reactor", type: "address" },
    { name: "swapper", type: "address" },
    { name: "nonce", type: "uint256" },
    { name: "deadline", type: "uint256" },
    { name: "validationContract", type: "address" },
    { name: "validationData", type: "bytes" },
  ],
  DutchOutput: [
    { name: "token", type: "address" },
    { name: "startAmount", type: "uint256" },
    { name: "endAmount", type: "uint256" },
    { name: "recipient", type: "address" },
  ],
};

const DUTCH_ORDER_ABI = [
  "tuple(" +
    [
      "tuple(address,address,uint256,uint256,address,bytes)",
      "uint256",
      "uint256",
      "address",
      "uint256",
      "tuple(address,uint256,uint256)",
      "tuple(address,uint256,uint256,address)[]",
    ].join(",") +
    ")",
];

export class DutchOrder extends Order {
  public permit2Address: string;

  constructor(
    public readonly info: DutchOrderInfo,
    public readonly chainId: number,
    readonly _permit2Address?: string
  ) {
    super();
    if (_permit2Address) {
      this.permit2Address = _permit2Address;
    } else if (PERMIT2_MAPPING[chainId]) {
      this.permit2Address = PERMIT2_MAPPING[chainId];
    } else {
      throw new MissingConfiguration("permit2", chainId.toString());
    }
  }

  static fromJSON(
    json: DutchOrderInfoJSON,
    chainId: number,
    _permit2Address?: string
  ): DutchOrder {
    return new DutchOrder(
      {
        ...json,
        exclusivityOverrideBps: BigNumber.from(json.exclusivityOverrideBps),
        nonce: BigNumber.from(json.nonce),
        input: {
          token: json.input.token,
          startAmount: BigNumber.from(json.input.startAmount),
          endAmount: BigNumber.from(json.input.endAmount),
        },
        outputs: json.outputs.map((output) => ({
          token: output.token,
          startAmount: BigNumber.from(output.startAmount),
          endAmount: BigNumber.from(output.endAmount),
          recipient: output.recipient,
        })),
      },
      chainId,
      _permit2Address
    );
  }

  static parse(encoded: string, chainId: number, permit2?: string): DutchOrder {
    const abiCoder = new ethers.utils.AbiCoder();
    const decoded = abiCoder.decode(DUTCH_ORDER_ABI, encoded);
    const [
      [
        [reactor, swapper, nonce, deadline, validationContract, validationData],
        startTime,
        endTime,
        exclusiveFiller,
        exclusivityOverrideBps,
        [inputToken, inputStartAmount, inputEndAmount],
        outputs,
      ],
    ] = decoded;
    return new DutchOrder(
      {
        reactor,
        swapper,
        nonce,
        deadline: deadline.toNumber(),
        validationContract,
        validationData,
        startTime: startTime.toNumber(),
        endTime: endTime.toNumber(),
        exclusiveFiller,
        exclusivityOverrideBps,
        input: {
          token: inputToken,
          startAmount: inputStartAmount,
          endAmount: inputEndAmount,
        },
        outputs: outputs.map(
          ([token, startAmount, endAmount, recipient]: [
            string,
            number,
            number,
            string,
            boolean
          ]) => {
            return {
              token,
              startAmount,
              endAmount,
              recipient,
            };
          }
        ),
      },
      chainId,
      permit2
    );
  }

  /**
   * @inheritdoc order
   */
  toJSON(): DutchOrderInfoJSON & {
    permit2Address: string;
    chainId: number;
  } {
    return {
      chainId: this.chainId,
      permit2Address: this.permit2Address,
      reactor: this.info.reactor,
      swapper: this.info.swapper,
      nonce: this.info.nonce.toString(),
      deadline: this.info.deadline,
      validationContract: this.info.validationContract,
      validationData: this.info.validationData,
      startTime: this.info.startTime,
      endTime: this.info.endTime,
      exclusiveFiller: this.info.exclusiveFiller,
      exclusivityOverrideBps: this.info.exclusivityOverrideBps.toString(),
      input: {
        token: this.info.input.token,
        startAmount: this.info.input.startAmount.toString(),
        endAmount: this.info.input.endAmount.toString(),
      },
      outputs: this.info.outputs.map((output) => ({
        token: output.token,
        startAmount: output.startAmount.toString(),
        endAmount: output.endAmount.toString(),
        recipient: output.recipient,
      })),
    };
  }

  /**
   * @inheritdoc order
   */
  serialize(): string {
    const abiCoder = new ethers.utils.AbiCoder();
    return abiCoder.encode(DUTCH_ORDER_ABI, [
      [
        [
          this.info.reactor,
          this.info.swapper,
          this.info.nonce,
          this.info.deadline,
          this.info.validationContract,
          this.info.validationData,
        ],
        this.info.startTime,
        this.info.endTime,
        this.info.exclusiveFiller,
        this.info.exclusivityOverrideBps,
        [
          this.info.input.token,
          this.info.input.startAmount,
          this.info.input.endAmount,
        ],
        this.info.outputs.map((output) => [
          output.token,
          output.startAmount,
          output.endAmount,
          output.recipient,
        ]),
      ],
    ]);
  }

  /**
   * @inheritdoc Order
   */
  getSigner(signature: SignatureLike): string {
    return ethers.utils.computeAddress(
      ethers.utils.recoverPublicKey(
        SignatureTransfer.hash(
          this.toPermit(),
          this.permit2Address,
          this.chainId,
          this.witness()
        ),
        signature
      )
    );
  }

  /**
   * @inheritdoc Order
   */
  permitData(): PermitTransferFromData {
    return SignatureTransfer.getPermitData(
      this.toPermit(),
      this.permit2Address,
      this.chainId,
      this.witness()
    ) as PermitTransferFromData;
  }

  /**
   * @inheritdoc Order
   */
  hash(): string {
    return ethers.utils._TypedDataEncoder
      .from(DUTCH_ORDER_TYPES)
      .hash(this.witnessInfo());
  }

  /**
   * @inheritdoc Order
   */
  resolve(options: OrderResolutionOptions): ResolvedOrder {
    return {
      input: {
        token: this.info.input.token,
        amount: getDecayedAmount(
          {
            startTime: this.info.startTime,
            endTime: this.info.endTime,
            startAmount: this.info.input.startAmount,
            endAmount: this.info.input.endAmount,
          },
          options.timestamp
        ),
      },
      outputs: this.info.outputs.map((output) => ({
        token: output.token,
        amount: getDecayedAmount(
          {
            startTime: this.info.startTime,
            endTime: this.info.endTime,
            startAmount: output.startAmount,
            endAmount: output.endAmount,
          },
          options.timestamp
        ),
      })),
    };
  }

  private toPermit(): PermitTransferFrom {
    return {
      permitted: {
        token: this.info.input.token,
        amount: this.info.input.endAmount,
      },
      spender: this.info.reactor,
      nonce: this.info.nonce,
      deadline: this.info.deadline,
    };
  }

  private witnessInfo(): WitnessInfo {
    return {
      info: {
        reactor: this.info.reactor,
        swapper: this.info.swapper,
        nonce: this.info.nonce,
        deadline: this.info.deadline,
        validationContract: this.info.validationContract,
        validationData: this.info.validationData,
      },
      startTime: this.info.startTime,
      endTime: this.info.endTime,
      exclusiveFiller: this.info.exclusiveFiller,
      exclusivityOverrideBps: this.info.exclusivityOverrideBps,
      inputToken: this.info.input.token,
      inputStartAmount: this.info.input.startAmount,
      inputEndAmount: this.info.input.endAmount,
      outputs: this.info.outputs,
    };
  }

  private witness(): Witness {
    return {
      witness: this.witnessInfo(),
      // TODO: remove "Limit"
      witnessTypeName: "ExclusiveDutchLimitOrder",
      witnessType: DUTCH_ORDER_TYPES,
    };
  }
}
