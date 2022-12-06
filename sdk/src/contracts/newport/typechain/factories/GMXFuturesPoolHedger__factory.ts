/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Signer, utils } from "ethers";
import { Provider } from "@ethersproject/providers";
import type {
  GMXFuturesPoolHedger,
  GMXFuturesPoolHedgerInterface,
} from "../GMXFuturesPoolHedger";

const _abi = [
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "thrower",
        type: "address",
      },
    ],
    name: "AlreadyInitialised",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "margin",
        type: "uint256",
      },
    ],
    name: "CollateralUpdateError",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "thrower",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "lastInteraction",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "interactionDelta",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "currentTime",
        type: "uint256",
      },
    ],
    name: "InteractionDelayNotExpired",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "thrower",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "newMaxLeverage",
        type: "uint256",
      },
    ],
    name: "InvalidMaxLeverage",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address[]",
        name: "_path",
        type: "address[]",
      },
    ],
    name: "InvalidPath",
    type: "error",
  },
  {
    inputs: [],
    name: "MarginError",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "thrower",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "quoteReceived",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "minCollateral",
        type: "uint256",
      },
    ],
    name: "NotEnoughQuoteForMinCollateral",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "thrower",
        type: "address",
      },
      {
        internalType: "address",
        name: "caller",
        type: "address",
      },
      {
        internalType: "address",
        name: "liquidityPool",
        type: "address",
      },
    ],
    name: "OnlyLiquidityPool",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "thrower",
        type: "address",
      },
      {
        internalType: "address",
        name: "caller",
        type: "address",
      },
      {
        internalType: "address",
        name: "nominatedOwner",
        type: "address",
      },
    ],
    name: "OnlyNominatedOwner",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "thrower",
        type: "address",
      },
      {
        internalType: "address",
        name: "caller",
        type: "address",
      },
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
    ],
    name: "OnlyOwner",
    type: "error",
  },
  {
    inputs: [],
    name: "QueueEmpty",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "thrower",
        type: "address",
      },
      {
        internalType: "address",
        name: "approvee",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "QuoteApprovalFailure",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "thrower",
        type: "address",
      },
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "QuoteTransferFailed",
    type: "error",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "bool",
        name: "state",
        type: "bool",
      },
    ],
    name: "ApprovalsUpdated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "bytes32",
        name: "positionKey",
        type: "bytes32",
      },
    ],
    name: "CollateralOrderPosted",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "newCollat",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "oldCollat",
        type: "uint256",
      },
    ],
    name: "CollateralUpdated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "gasLimit",
        type: "uint256",
      },
    ],
    name: "GasLimitToLow",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "newShortBuffer",
        type: "uint256",
      },
    ],
    name: "MaxLeverageSet",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "length",
        type: "uint256",
      },
    ],
    name: "MultiplePositionsOpen",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "bytes32",
        name: "positionKey",
        type: "bytes32",
      },
      {
        indexed: false,
        internalType: "bool",
        name: "isExecuted",
        type: "bool",
      },
      {
        indexed: false,
        internalType: "bool",
        name: "isIncrease",
        type: "bool",
      },
    ],
    name: "OrderExecuted",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "bytes32",
        name: "positionKey",
        type: "bytes32",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "collateralDelta",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "sizeDelta",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "bool",
        name: "isLong",
        type: "bool",
      },
      {
        indexed: false,
        internalType: "bool",
        name: "usedBase",
        type: "bool",
      },
      {
        indexed: false,
        internalType: "bool",
        name: "isIncrease",
        type: "bool",
      },
    ],
    name: "OrderPosted",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "oldOwner",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnerChanged",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnerNominated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "interactionDelay",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "hedgeCap",
            type: "uint256",
          },
        ],
        indexed: false,
        internalType: "struct PoolHedger.PoolHedgerParameters",
        name: "poolHedgerParams",
        type: "tuple",
      },
    ],
    name: "PoolHedgerParametersSet",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "int256",
        name: "oldNetDelta",
        type: "int256",
      },
      {
        indexed: false,
        internalType: "int256",
        name: "currentNetDelta",
        type: "int256",
      },
      {
        indexed: false,
        internalType: "int256",
        name: "expectedNetDelta",
        type: "int256",
      },
    ],
    name: "PositionUpdated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "length",
        type: "uint256",
      },
    ],
    name: "QueueNotEmpty",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "amountQuote",
        type: "uint256",
      },
    ],
    name: "QuoteReturnedToLP",
    type: "event",
  },
  {
    inputs: [],
    name: "acceptOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "poolDeltaChange",
        type: "uint256",
      },
      {
        internalType: "bool",
        name: "deltaIncrease",
        type: "bool",
      },
    ],
    name: "canHedge",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "futuresPoolHedgerParams",
    outputs: [
      {
        internalType: "uint256",
        name: "maximumDelta",
        type: "uint256",
      },
      {
        internalType: "int256",
        name: "maximumFundingRatePerDelta",
        type: "int256",
      },
      {
        internalType: "uint256",
        name: "deltaThreshold",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "marketDepthBuffer",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "minKeeperGas",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getCappedExpectedHedge",
    outputs: [
      {
        internalType: "int256",
        name: "",
        type: "int256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getCurrentHedgedNetDelta",
    outputs: [
      {
        internalType: "int256",
        name: "",
        type: "int256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getExecutionFee",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "spotPrice",
        type: "uint256",
      },
    ],
    name: "getHedgingLiquidity",
    outputs: [
      {
        internalType: "uint256",
        name: "pendingDeltaLiquidity",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "usedDeltaLiquidity",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getPoolHedgerParams",
    outputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "interactionDelay",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "hedgeCap",
            type: "uint256",
          },
        ],
        internalType: "struct PoolHedger.PoolHedgerParameters",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getPosition",
    outputs: [
      {
        internalType: "uint256[]",
        name: "",
        type: "uint256[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "positionKey",
        type: "bytes32",
      },
      {
        internalType: "bool",
        name: "isExecuted",
        type: "bool",
      },
      {
        internalType: "bool",
        name: "isIncrease",
        type: "bool",
      },
    ],
    name: "gmxPositionCallback",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "greekCache",
    outputs: [
      {
        internalType: "contract OptionGreekCache",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "hedgeDelta",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "indexToken",
    outputs: [
      {
        internalType: "contract ERC20",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "contract LiquidityPool",
        name: "_liquidityPool",
        type: "address",
      },
      {
        internalType: "contract OptionGreekCache",
        name: "_greekCache",
        type: "address",
      },
      {
        internalType: "contract IPositionRouter",
        name: "_router",
        type: "address",
      },
      {
        internalType: "contract IReader",
        name: "_reader",
        type: "address",
      },
      {
        internalType: "contract IRouter",
        name: "_baseRouter",
        type: "address",
      },
      {
        internalType: "contract IVaultUtils",
        name: "_vaultUtils",
        type: "address",
      },
      {
        internalType: "contract ERC20",
        name: "_quoteAsset",
        type: "address",
      },
      {
        internalType: "contract ERC20",
        name: "_indexToken",
        type: "address",
      },
    ],
    name: "init",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "isLong",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "lastInteraction",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_owner",
        type: "address",
      },
    ],
    name: "nominateNewOwner",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "nominatedOwner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "orderQueue",
    outputs: [
      {
        internalType: "bool",
        name: "isIncrease",
        type: "bool",
      },
      {
        internalType: "uint256",
        name: "collateralDelta",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "sizeDelta",
        type: "uint256",
      },
      {
        internalType: "bool",
        name: "long",
        type: "bool",
      },
      {
        internalType: "enum GMXFuturesPoolHedger.Status",
        name: "status",
        type: "uint8",
      },
      {
        internalType: "bool",
        name: "useBase",
        type: "bool",
      },
      {
        internalType: "bytes32",
        name: "key",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "processQueue",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [],
    name: "quoteAsset",
    outputs: [
      {
        internalType: "contract ERC20",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "reader",
    outputs: [
      {
        internalType: "contract IReader",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "resetInteractionDelay",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "router",
    outputs: [
      {
        internalType: "contract IPositionRouter",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "maximumDelta",
            type: "uint256",
          },
          {
            internalType: "int256",
            name: "maximumFundingRatePerDelta",
            type: "int256",
          },
          {
            internalType: "uint256",
            name: "deltaThreshold",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "marketDepthBuffer",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "minKeeperGas",
            type: "uint256",
          },
        ],
        internalType: "struct IFuturesPoolHedger.FuturesPoolHedgerParameters",
        name: "_futuresPoolHedgerParams",
        type: "tuple",
      },
    ],
    name: "setFuturesPoolHedgerParameters",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_targetLeverage",
        type: "uint256",
      },
    ],
    name: "setMaxLeverage",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "interactionDelay",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "hedgeCap",
            type: "uint256",
          },
        ],
        internalType: "struct PoolHedger.PoolHedgerParameters",
        name: "_poolHedgerParams",
        type: "tuple",
      },
    ],
    name: "setPoolHedgerParams",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "targetLeverage",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "tradingFee",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "updateCollateral",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "vault",
    outputs: [
      {
        internalType: "contract IVault",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "vaultUtils",
    outputs: [
      {
        internalType: "contract IVaultUtils",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

export class GMXFuturesPoolHedger__factory {
  static readonly abi = _abi;
  static createInterface(): GMXFuturesPoolHedgerInterface {
    return new utils.Interface(_abi) as GMXFuturesPoolHedgerInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): GMXFuturesPoolHedger {
    return new Contract(
      address,
      _abi,
      signerOrProvider
    ) as GMXFuturesPoolHedger;
  }
}
