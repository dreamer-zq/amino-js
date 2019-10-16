import config from '../../config'
import Utils from '../../utils'
import {Msg,AccAddress} from '../type'

export class MsgBeginUnbonding extends Msg {
  constructor (properties = {}) {
    super()
    this.delegatorAddr = properties.delegatorAddr || new AccAddress()
    this.validatorAddr = properties.validatorAddr || new AccAddress()
    this.shares = properties.shares || ''
  }

  static create (delegatorAddr, validatorAddr, shares) {
    return new MsgBeginUnbonding({
      delegatorAddr: delegatorAddr,
      validatorAddr: validatorAddr,
      shares: shares
    })
  }

  getSignBytes () {
    return {
      delegator_addr: this.delegatorAddr.toString(config.iris.bech32.accAddr),
      validator_addr: this.validatorAddr.toString(config.iris.bech32.valAddr),
      shares_amount: this.shares
    }
  }

  validateBasic () {
    if (Utils.isEmpty(this.delegatorAddr)) {
      throw new Error('delegatorAddr is empty')
    }

    if (Utils.isEmpty(this.validatorAddr)) {
      throw new Error('validatorAddr is empty')
    }

    if (Utils.isEmpty(this.shares)) {
      throw new Error('shares must great than 0')
    }
  }

  toJSON () {
    return {
      delegatorAddr: new AccAddress(this.delegatorAddr).toString(config.iris.bech32.accAddr),
      validatorAddr: new AccAddress(this.validatorAddr).toString(config.iris.bech32.valAddr),
      shares: this.shares
    }
  }
}
