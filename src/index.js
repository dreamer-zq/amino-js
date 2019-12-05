import * as iris from './types/iris'
import * as cosmos from './types/cosmos'
import config from './config'
import * as amino from './codec'
import * as type from "./types/type"

const codec = amino.default
codec.registerConcrete(iris.StdTx, iris.StdTx.getType())
codec.registerConcrete(iris.MsgSend, iris.MsgSend.getType())
codec.registerConcrete(iris.MsgDelegate, iris.MsgDelegate.getType())
codec.registerConcrete(iris.MsgBeginUnbonding, iris.MsgBeginUnbonding.getType())
codec.registerConcrete(iris.MsgBeginRedelegate, iris.MsgBeginRedelegate.getType())
codec.registerConcrete(iris.MsgWithdrawDelegatorRewardsAll, iris.MsgWithdrawDelegatorRewardsAll.getType())
codec.registerConcrete(iris.MsgWithdrawDelegatorReward, iris.MsgWithdrawDelegatorReward.getType())
codec.registerConcrete(iris.MsgDeposit, iris.MsgDeposit.getType())
codec.registerConcrete(iris.MsgVote, iris.MsgVote.getType())
codec.registerConcrete(cosmos.MsgSend, cosmos.MsgSend.getType())
codec.registerConcrete(cosmos.StdTx, cosmos.StdTx.getType())

export const IRIS = iris
export const COSMOS = cosmos
export const Codec = codec
export const Type = type

export function setNetwork (network) {
  if (network === 'testnet') {
    config.iris.bech32 = {
      accAddr: 'faa',
      valAddr: 'fva',
      accPub: 'fap'
    }
  }
}
