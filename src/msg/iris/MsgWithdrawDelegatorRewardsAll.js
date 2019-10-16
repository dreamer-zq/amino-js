import config from '../../config'
import Utils from '../../utils'
import * as Bech32 from 'bech32'
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
    const delegator = Bech32.toWords(this.delegatorAddr)
    msg.value = {
      delegator_addr: Bech32.encode(config.iris.bech32.accAddr, delegator)
    }
    return Utils.sortObjectKeys(msg)
  }

  validateBasic () {
    if (Utils.isEmpty(this.delegatorAddr)) {
      throw new Error('delegatorAddr is empty')
    }
  }

  toJSON () {
    const delegator = Bech32.toWords(this.delegatorAddr)
    return {
      delegatorAddr: Bech32.encode(config.iris.bech32.accAddr, delegator)
    }
  }
}
