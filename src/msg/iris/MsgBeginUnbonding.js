import config from '../../config'
import Utils from '../../utils'
import * as Bech32 from 'bech32'
import {Msg,AccAddress} from '../type'

export class MsgBeginUnbonding extends Msg {
  constructor (properties = {}) {
    super()
    this.delegatorAddr = properties.delegatorAddr || new AccAddress(0)
    this.validatorAddr = properties.validatorAddr || new AccAddress(0)
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
    const delegator = Bech32.toWords(this.delegatorAddr)
    const validator = Bech32.toWords(this.validatorAddr)
    return {
      delegator_addr: Bech32.encode(config.iris.bech32.accAddr, delegator),
      validator_addr: Bech32.encode(config.iris.bech32.valAddr, validator),
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
    const delegator = Bech32.toWords(this.delegatorAddr)
    const validator = Bech32.toWords(this.validatorAddr)
    return {
      delegatorAddr: Bech32.encode(config.iris.bech32.accAddr, delegator),
      validatorAddr: Bech32.encode(config.iris.bech32.valAddr, validator),
      shares: this.shares
    }
  }
}
