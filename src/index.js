import * as iris from './msg/iris'
import * as cosmos from './msg/cosmos'
import * as common from './msg/common'
import Codec from './codec'

Codec.registerConcrete(common.StdTx, 'irishub/bank/StdTx')
Codec.registerConcrete(iris.MsgSend, 'irishub/bank/Send')
Codec.registerConcrete(iris.MsgDelegate, 'irishub/stake/MsgDelegate')

export const IRIS = iris
export const COSMOS = cosmos
export const AMINO = Codec
