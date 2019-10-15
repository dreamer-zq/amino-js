import * as iris from './msg/iris'
import * as cosmos from './msg/cosmos'
import config from './config'
import * as amino from './codec'

const codec = amino.default
codec.registerConcrete(iris.StdTx, config.iris.model.stdTx)
codec.registerConcrete(iris.MsgSend, config.iris.model.msgSend)
codec.registerConcrete(iris.MsgDelegate, config.iris.model.msgDelegate)
codec.registerConcrete(iris.MsgBeginUnbonding, config.iris.model.msgBeginUnbonding)

export const IRIS = iris
export const COSMOS = cosmos
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
