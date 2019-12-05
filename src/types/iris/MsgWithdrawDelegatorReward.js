import config from '../../config'
import Utils from '../../utils'
import { Codec } from '../../index'
import {Msg,AccAddress} from '../type'

export class MsgWithdrawDelegatorReward extends Msg {
  constructor (properties = {}) {
    super()
    this.delegatorAddr = properties.delegatorAddr || new AccAddress()
    this.validatorAddr = properties.validatorAddr || new AccAddress()
  }

  static create (delegatorAddr, validatorAddr, delegation) {
    return new MsgWithdrawDelegatorReward({
      delegatorAddr: delegatorAddr,
      validatorAddr: validatorAddr
    })
  }

  getSignBytes () {
    const msg = Codec.marshalJSON(this) // TODO
    msg.value = {
      delegator_addr: this.delegatorAddr.toString(config.iris.bech32.accAddr),
      validator_addr: this.validatorAddr.toString(config.iris.bech32.valAddr),
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
    return {
      delegatorAddr: new AccAddress(this.delegatorAddr).toString(config.iris.bech32.accAddr),
      validatorAddr: new AccAddress(this.validatorAddr).toString(config.iris.bech32.valAddr)
    }
  }

  static getType() {
    return "irishub/distr/MsgWithdrawDelegationReward"
  }
}
