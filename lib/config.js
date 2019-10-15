"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var config = {
  "iris": {
    "model": {
      "msgSend": "irishub/bank/Send",
      "msgDelegate": "irishub/stake/MsgDelegate",
      "msgBeginUnbonding": "irishub/stake/BeginUnbonding",
      "msgBeginRedelegate": "irishub/stake/BeginRedelegate",
      "msgWithdrawDelegationRewardsAll": "irishub/distr/MsgWithdrawDelegationRewardsAll",
      "msgWithdrawDelegationReward": "irishub/distr/MsgWithdrawDelegationReward",
      "msgDeposit": "irishub/gov/MsgDeposit",
      "msgVote": "irishub/gov/MsgVote",
      "msgAddLiquidity": "irishub/coinswap/MsgAddLiquidity",
      "msgRemoveLiquidity": "irishub/coinswap/MsgRemoveLiquidity",
      "msgSwapOrder": "irishub/coinswap/MsgSwapOrder",
      "stdTx": "irishub/bank/StdTx"
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