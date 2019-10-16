import config from '../../config'
import Utils from '../../utils'
import * as Bech32 from 'bech32'
import { Codec } from '../../index'
import {Msg,AccAddress} from '../type'

export class MsgWithdrawDelegatorReward extends Msg {
  constructor (properties = {}) {
    super()
    this.delegatorAddr = properties.delegatorAddr || new AccAddress(0)
    this.validatorAddr = properties.validatorAddr || new AccAddress(0)
  }

  static create (delegatorAddr, validatorAddr, delegation) {
    return new MsgWithdrawDelegatorReward({
      delegatorAddr: delegatorAddr,
      validatorAddr: validatorAddr
    })
  }

  getSignBytes () {
    const msg = Codec.marshalJSON(this) // TODO
    const delegator = Bech32.toWords(this.delegatorAddr)
    const validator = Bech32.toWords(this.validatorAddr)
    msg.value = {
      delegator_addr: Bech32.encode(config.iris.bech32.accAddr, delegator),
      validator_addr: Bech32.encode(config.iris.bech32.valAddr, validator)
    }
    return Utils.sortObjectKeys(msg)
  }

  validateBasic () {
    if (Utils.isEmpty(this.delegatorAddr)) {
      throw new Error('delegatorAddr is empty')
    }

    if (Utils.isEmpty(this.validatorAddr)) {
      throw new Error('validatorAddr is empty')
    }
  }

  toJSON () {
    const delegator = Bech32.toWords(this.delegatorAddr)
    const validator = Bech32.toWords(this.validatorAddr)
    return {
      delegatorAddr: Bech32.encode(config.iris.bech32.accAddr, delegator),
      validatorAddr: Bech32.encode(config.iris.bech32.valAddr, validator)
    }
  }
}
