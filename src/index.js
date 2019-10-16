import * as iris from './msg/iris'
// import * as cosmos from './msg/cosmos'
import config from './config'
import * as amino from './codec'
import * as type from "./msg/type"

const codec = amino.default
codec.registerConcrete(iris.StdTx, config.iris.type.StdTx)
codec.registerConcrete(iris.MsgSend, config.iris.type.MsgSend)
codec.registerConcrete(iris.MsgDelegate, config.iris.type.MsgDelegate)
codec.registerConcrete(iris.MsgBeginUnbonding, config.iris.type.MsgBeginUnbonding)
codec.registerConcrete(iris.MsgBeginRedelegate, config.iris.type.MsgBeginRedelegate)
codec.registerConcrete(iris.MsgWithdrawDelegatorRewardsAll, config.iris.type.MsgWithdrawDelegationRewardsAll)
codec.registerConcrete(iris.MsgWithdrawDelegatorReward, config.iris.type.MsgWithdrawDelegationReward)
codec.registerConcrete(iris.MsgDeposit, config.iris.type.MsgDeposit)
codec.registerConcrete(iris.MsgVote, config.iris.type.MsgVote)

export const IRIS = iris
// export const COSMOS = cosmos
export const Codec = codec
export const Type = type

export function setNetwork (network) {
  if (network && network === 'testnet') {
    config.iris.bech32 = {
      accAddr: 'faa',
      valAddr: 'fva',
      accPub: 'fap'
    }
  }
}
