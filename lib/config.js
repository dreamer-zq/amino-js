"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var config = {
  "iris": {
    "model": {
      "MsgSend": "irishub/bank/Send",
      "MsgDelegate": "irishub/stake/MsgDelegate",
      "MsgBeginUnbonding": "irishub/stake/BeginUnbonding",
      "MsgBeginRedelegate": "irishub/stake/BeginRedelegate",
      "MsgWithdrawDelegationRewardsAll": "irishub/distr/MsgWithdrawDelegationRewardsAll",
      "MsgWithdrawDelegationReward": "irishub/distr/MsgWithdrawDelegationReward",
      "MsgDeposit": "irishub/gov/MsgDeposit",
      "MsgVote": "irishub/gov/MsgVote",
      "MsgAddLiquidity": "irishub/coinswap/MsgAddLiquidity",
      "MsgRemoveLiquidity": "irishub/coinswap/MsgRemoveLiquidity",
      "MsgSwapOrder": "irishub/coinswap/MsgSwapOrder",
      "StdTx": "irishub/bank/StdTx"
    },
    "bech32": {
      "accAddr": "iaa",
      "valAddr": "iva",
      "accPub": "iap"
    }
  },
  "cosmos": {
    "model": {
      "msgSend": "cosmos-sdk/MsgSend",
      "msgDelegate": "cosmos-sdk/MsgDelegate",
      "msgUndelegate": "cosmos-sdk/MsgUndelegate",
      "msgBeginRedelegate": "cosmos-sdk/MsgBeginRedelegate",
      "msgModifyWithdrawAddress": "cosmos-sdk/MsgModifyWithdrawAddress",
      "msgWithdrawDelegationReward": "cosmos-sdk/MsgWithdrawDelegationReward",
      "msgWithdrawValidatorCommission": "cosmos-sdk/MsgWithdrawValidatorCommission",
      "stdTx": "cosmos-sdk/StdTx"
    },
    "bech32": {
      "accAddr": "cosmos",
      "valAddr": "cosmosvaloper",
      "accPub": "cosmospub"
    }
  }
};

exports.default = config;