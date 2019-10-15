import * as iris from './msg/iris'
//import * as cosmos from './msg/cosmos'
import config from './config'
import * as amino from './codec'

const codec = amino.default
codec.registerConcrete(iris.StdTx, config.iris.model.StdTx)
codec.registerConcrete(iris.MsgSend, config.iris.model.MsgSend)
codec.registerConcrete(iris.MsgDelegate, config.iris.model.MsgDelegate)
codec.registerConcrete(iris.MsgBeginUnbonding, config.iris.model.MsgBeginUnbonding)
codec.registerConcrete(iris.MsgBeginRedelegate, config.iris.model.MsgBeginRedelegate)
codec.registerConcrete(iris.MsgWithdrawDelegatorRewardsAll, config.iris.model.MsgWithdrawDelegationRewardsAll)
codec.registerConcrete(iris.MsgWithdrawDelegatorReward, config.iris.model.MsgWithdrawDelegationReward)
codec.registerConcrete(iris.MsgDeposit, config.iris.model.MsgDeposit)
codec.registerConcrete(iris.MsgVote, config.iris.model.MsgVote)

export const IRIS = iris
//export const COSMOS = cosmos
export const Codec = codec

export function setNetwork(network){
    if(network && network === 'testnet'){
        config.iris.bech32 = {
            accAddr: "faa",
            valAddr: "fva",
            accPub: "fap"
        };
    }
}
