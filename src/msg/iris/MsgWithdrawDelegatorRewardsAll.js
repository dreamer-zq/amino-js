import config from '../../config'
import Utils from '../../utils'
import { Codec } from '../../index'
import {Msg,AccAddress} from '../type'


export class MsgWithdrawDelegatorRewardsAll extends Msg {
  constructor (properties = {}) {
    super()
    this.delegatorAddr = properties.delegatorAddr || new AccAddress(0)
  }

  static create (delegatorAddr) {
    return new MsgWithdrawDelegatorRewardsAll({
      delegatorAddr: delegatorAddr
    })
  }

  getSignBytes () {
    const msg = Codec.marshalJSON(this) // TODO
    msg.value = {
      delegator_addr: this.delegatorAddr.toString(config.iris.bech32.accAddr),
    }
    return Utils.sortObjectKeys(msg)
  }

  validateBasic () {
    if (Utils.isEmpty(this.delegatorAddr)) {
      throw new Error('delegatorAddr is empty')
    }
  }

  toJSON () {
    return {
      delegatorAddr: new AccAddress(this.delegatorAddr).toString(config.iris.bech32.accAddr),
    }
  }
}
