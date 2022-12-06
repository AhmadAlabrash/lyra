/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Signer, utils } from "ethers";
import { Provider } from "@ethersproject/providers";
import type {
  OptionMarketWrapper,
  OptionMarketWrapperInterface,
} from "../OptionMarketWrapper";

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "thrower",
        type: "address",
      },
      {
        internalType: "contract IERC20Decimals",
        name: "asset",
        type: "address",
      },
      {
        internalType: "address",
        name: "approving",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "approvalAmount",
        type: "uint256",
      },
    ],
    name: "ApprovalFailure",
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
        internalType: "contract IERC20Decimals",
        name: "asset",
        type: "address",
      },
      {
        internalType: "address",
        name: "sender",
        type: "address",
      },
      {
        internalType: "address",
        name: "receiver",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "AssetTransferFailed",
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
        internalType: "uint8",
        name: "id",
        type: "uint8",
      },
      {
        internalType: "address",
        name: "addr",
        type: "address",
      },
    ],
    name: "DuplicateEntry",
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
    inputs: [
      {
        internalType: "address",
        name: "thrower",
        type: "address",
      },
      {
        internalType: "enum OptionMarket.OptionType",
        name: "optionType",
        type: "uint8",
      },
    ],
    name: "OnlyShorts",
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
        internalType: "uint8",
        name: "id",
        type: "uint8",
      },
    ],
    name: "RemovingInvalidId",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "asset",
        type: "address",
      },
    ],
    name: "UnsupportedToken",
    type: "error",
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
        indexed: false,
        internalType: "bool",
        name: "isOpen",
        type: "bool",
      },
      {
        indexed: false,
        internalType: "bool",
        name: "isLong",
        type: "bool",
      },
      {
        indexed: true,
        internalType: "address",
        name: "market",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "positionId",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "totalCost",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "totalFee",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "int256",
        name: "swapFee",
        type: "int256",
      },
      {
        indexed: false,
        internalType: "address",
        name: "token",
        type: "address",
      },
    ],
    name: "PositionTraded",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "newCollateral",
        type: "uint256",
      },
    ],
    name: "SetCollateralTo",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "sender",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "WETHDeposit",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "contract ICurve",
        name: "curveSwap",
        type: "address",
      },
      {
        indexed: false,
        internalType: "contract IFeeCounter",
        name: "tradingRewards",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "minReturnPercent",
        type: "uint256",
      },
    ],
    name: "WrapperParamsUpdated",
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
        internalType: "contract IERC20Decimals",
        name: "token",
        type: "address",
      },
      {
        internalType: "uint8",
        name: "id",
        type: "uint8",
      },
    ],
    name: "addCurveStable",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "params",
        type: "uint256",
      },
    ],
    name: "addLong",
    outputs: [
      {
        internalType: "uint256",
        name: "totalCost",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "contract OptionMarket",
        name: "optionMarket",
        type: "address",
      },
      {
        internalType: "uint8",
        name: "id",
        type: "uint8",
      },
      {
        components: [
          {
            internalType: "contract IERC20Decimals",
            name: "quoteAsset",
            type: "address",
          },
          {
            internalType: "contract IERC20Decimals",
            name: "baseAsset",
            type: "address",
          },
          {
            internalType: "contract OptionToken",
            name: "optionToken",
            type: "address",
          },
          {
            internalType: "contract LiquidityPool",
            name: "liquidityPool",
            type: "address",
          },
          {
            internalType: "contract LiquidityToken",
            name: "liquidityToken",
            type: "address",
          },
        ],
        internalType:
          "struct OptionMarketWrapperWithSwaps.OptionMarketContracts",
        name: "_marketContracts",
        type: "tuple",
      },
    ],
    name: "addMarket",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "params",
        type: "uint256",
      },
    ],
    name: "addShort",
    outputs: [
      {
        internalType: "uint256",
        name: "totalReceived",
        type: "uint256",
      },
    ],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "params",
        type: "uint256",
      },
    ],
    name: "closeLong",
    outputs: [
      {
        internalType: "uint256",
        name: "totalReceived",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "contract OptionMarket",
            name: "optionMarket",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "strikeId",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "positionId",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "iterations",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "setCollateralTo",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "currentCollateral",
            type: "uint256",
          },
          {
            internalType: "enum OptionMarket.OptionType",
            name: "optionType",
            type: "uint8",
          },
          {
            internalType: "uint256",
            name: "amount",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "minCost",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "maxCost",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "inputAmount",
            type: "uint256",
          },
          {
            internalType: "contract IERC20Decimals",
            name: "inputAsset",
            type: "address",
          },
        ],
        internalType:
          "struct OptionMarketWrapperWithSwaps.OptionPositionParams",
        name: "params",
        type: "tuple",
      },
    ],
    name: "closePosition",
    outputs: [
      {
        components: [
          {
            internalType: "address",
            name: "market",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "positionId",
            type: "uint256",
          },
          {
            internalType: "address",
            name: "owner",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "amount",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "totalCost",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "totalFee",
            type: "uint256",
          },
          {
            internalType: "int256",
            name: "swapFee",
            type: "int256",
          },
          {
            internalType: "address",
            name: "token",
            type: "address",
          },
        ],
        internalType: "struct OptionMarketWrapperWithSwaps.ReturnDetails",
        name: "returnDetails",
        type: "tuple",
      },
    ],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "params",
        type: "uint256",
      },
    ],
    name: "closeShort",
    outputs: [
      {
        internalType: "uint256",
        name: "totalCost",
        type: "uint256",
      },
    ],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [],
    name: "curveSwap",
    outputs: [
      {
        internalType: "contract ICurve",
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
    name: "ercIds",
    outputs: [
      {
        internalType: "uint8",
        name: "",
        type: "uint8",
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
            internalType: "contract OptionMarket",
            name: "optionMarket",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "strikeId",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "positionId",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "iterations",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "setCollateralTo",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "currentCollateral",
            type: "uint256",
          },
          {
            internalType: "enum OptionMarket.OptionType",
            name: "optionType",
            type: "uint8",
          },
          {
            internalType: "uint256",
            name: "amount",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "minCost",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "maxCost",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "inputAmount",
            type: "uint256",
          },
          {
            internalType: "contract IERC20Decimals",
            name: "inputAsset",
            type: "address",
          },
        ],
        internalType:
          "struct OptionMarketWrapperWithSwaps.OptionPositionParams",
        name: "params",
        type: "tuple",
      },
    ],
    name: "forceClosePosition",
    outputs: [
      {
        components: [
          {
            internalType: "address",
            name: "market",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "positionId",
            type: "uint256",
          },
          {
            internalType: "address",
            name: "owner",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "amount",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "totalCost",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "totalFee",
            type: "uint256",
          },
          {
            internalType: "int256",
            name: "swapFee",
            type: "int256",
          },
          {
            internalType: "address",
            name: "token",
            type: "address",
          },
        ],
        internalType: "struct OptionMarketWrapperWithSwaps.ReturnDetails",
        name: "returnDetails",
        type: "tuple",
      },
    ],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
    ],
    name: "getBalancesAndAllowances",
    outputs: [
      {
        components: [
          {
            internalType: "uint8",
            name: "id",
            type: "uint8",
          },
          {
            internalType: "address",
            name: "token",
            type: "address",
          },
          {
            internalType: "uint8",
            name: "decimals",
            type: "uint8",
          },
          {
            internalType: "string",
            name: "symbol",
            type: "string",
          },
          {
            internalType: "uint256",
            name: "balance",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "allowance",
            type: "uint256",
          },
        ],
        internalType: "struct OptionMarketWrapperWithSwaps.StableAssetView[]",
        name: "",
        type: "tuple[]",
      },
      {
        components: [
          {
            internalType: "uint8",
            name: "id",
            type: "uint8",
          },
          {
            internalType: "contract OptionMarket",
            name: "market",
            type: "address",
          },
          {
            internalType: "address",
            name: "token",
            type: "address",
          },
          {
            internalType: "uint8",
            name: "decimals",
            type: "uint8",
          },
          {
            internalType: "string",
            name: "symbol",
            type: "string",
          },
          {
            internalType: "uint256",
            name: "balance",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "allowance",
            type: "uint256",
          },
          {
            internalType: "bool",
            name: "isApprovedForAll",
            type: "bool",
          },
        ],
        internalType: "struct OptionMarketWrapperWithSwaps.MarketAssetView[]",
        name: "",
        type: "tuple[]",
      },
      {
        components: [
          {
            internalType: "address",
            name: "token",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "balance",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "allowance",
            type: "uint256",
          },
        ],
        internalType:
          "struct OptionMarketWrapperWithSwaps.LiquidityBalanceAndAllowance[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getMarketAndErcIds",
    outputs: [
      {
        internalType: "uint8[]",
        name: "",
        type: "uint8[]",
      },
      {
        internalType: "uint8[]",
        name: "",
        type: "uint8[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint8",
        name: "",
        type: "uint8",
      },
    ],
    name: "idToERC",
    outputs: [
      {
        internalType: "contract IERC20Decimals",
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
        internalType: "uint8",
        name: "",
        type: "uint8",
      },
    ],
    name: "idToMarket",
    outputs: [
      {
        internalType: "contract OptionMarket",
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
        internalType: "contract OptionMarket",
        name: "",
        type: "address",
      },
    ],
    name: "marketContracts",
    outputs: [
      {
        internalType: "contract IERC20Decimals",
        name: "quoteAsset",
        type: "address",
      },
      {
        internalType: "contract IERC20Decimals",
        name: "baseAsset",
        type: "address",
      },
      {
        internalType: "contract OptionToken",
        name: "optionToken",
        type: "address",
      },
      {
        internalType: "contract LiquidityPool",
        name: "liquidityPool",
        type: "address",
      },
      {
        internalType: "contract LiquidityToken",
        name: "liquidityToken",
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
    name: "marketIds",
    outputs: [
      {
        internalType: "uint8",
        name: "",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "minReturnPercent",
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
        name: "params",
        type: "uint256",
      },
    ],
    name: "openLong",
    outputs: [
      {
        internalType: "uint256",
        name: "totalCost",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "contract OptionMarket",
            name: "optionMarket",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "strikeId",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "positionId",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "iterations",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "setCollateralTo",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "currentCollateral",
            type: "uint256",
          },
          {
            internalType: "enum OptionMarket.OptionType",
            name: "optionType",
            type: "uint8",
          },
          {
            internalType: "uint256",
            name: "amount",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "minCost",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "maxCost",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "inputAmount",
            type: "uint256",
          },
          {
            internalType: "contract IERC20Decimals",
            name: "inputAsset",
            type: "address",
          },
        ],
        internalType:
          "struct OptionMarketWrapperWithSwaps.OptionPositionParams",
        name: "params",
        type: "tuple",
      },
    ],
    name: "openPosition",
    outputs: [
      {
        components: [
          {
            internalType: "address",
            name: "market",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "positionId",
            type: "uint256",
          },
          {
            internalType: "address",
            name: "owner",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "amount",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "totalCost",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "totalFee",
            type: "uint256",
          },
          {
            internalType: "int256",
            name: "swapFee",
            type: "int256",
          },
          {
            internalType: "address",
            name: "token",
            type: "address",
          },
        ],
        internalType: "struct OptionMarketWrapperWithSwaps.ReturnDetails",
        name: "returnDetails",
        type: "tuple",
      },
    ],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "params",
        type: "uint256",
      },
    ],
    name: "openShort",
    outputs: [
      {
        internalType: "uint256",
        name: "totalReceived",
        type: "uint256",
      },
    ],
    stateMutability: "payable",
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
    inputs: [
      {
        internalType: "address",
        name: "fromToken",
        type: "address",
      },
      {
        internalType: "address",
        name: "toToken",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amountIn",
        type: "uint256",
      },
    ],
    name: "quoteCurveSwap",
    outputs: [
      {
        internalType: "address",
        name: "pool",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amountOut",
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
        name: "params",
        type: "uint256",
      },
    ],
    name: "reduceLong",
    outputs: [
      {
        internalType: "uint256",
        name: "totalReceived",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "params",
        type: "uint256",
      },
    ],
    name: "reduceShort",
    outputs: [
      {
        internalType: "uint256",
        name: "totalCost",
        type: "uint256",
      },
    ],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint8",
        name: "id",
        type: "uint8",
      },
    ],
    name: "removeCurveStable",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint8",
        name: "id",
        type: "uint8",
      },
    ],
    name: "removeMarket",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "tradingRewards",
    outputs: [
      {
        internalType: "contract IFeeCounter",
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
        internalType: "contract IWETH",
        name: "_weth",
        type: "address",
      },
      {
        internalType: "contract ICurve",
        name: "_curveSwap",
        type: "address",
      },
      {
        internalType: "contract IFeeCounter",
        name: "_tradingRewards",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_minReturnPercent",
        type: "uint256",
      },
    ],
    name: "updateContractParams",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "weth",
    outputs: [
      {
        internalType: "contract IWETH",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

export class OptionMarketWrapper__factory {
  static readonly abi = _abi;
  static createInterface(): OptionMarketWrapperInterface {
    return new utils.Interface(_abi) as OptionMarketWrapperInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): OptionMarketWrapper {
    return new Contract(address, _abi, signerOrProvider) as OptionMarketWrapper;
  }
}
