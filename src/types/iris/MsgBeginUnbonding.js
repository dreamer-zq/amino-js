import config from '../../config'
import Utils from '../../utils'
import {Msg,AccAddress} from '../type'

export class MsgBeginUnbonding extends Msg {
  constructor (properties = {}) {
    super()
    this.delegatorAddr = properties.delegatorAddr || new AccAddress()
    this.validatorAddr = properties.validatorAddr || new AccAddress()
    this.sharesAmount = properties.sharesAmount || ''
  }

  static create (delegatorAddr, validatorAddr, sharesAmount) {
    return new MsgBeginUnbonding({
      delegatorAddr: delegatorAddr,
      validatorAddr: validatorAddr,
      sharesAmount: sharesAmount
    })
  }

  validateBasic () {
    if (Utils.isEmpty(this.delegatorAddr)) {
      throw new Error('delegatorAddr is empty')
    }

    if (Utils.isEmpty(this.validatorAddr)) {
      throw new Error('validatorAddr is empty')
    }

    if (Utils.isEmpty(this.sharesAmount)) {
      throw new Error('shares must great than 0')
    }
  }

  toJSON () {
    return {
      delegator_addr: new AccAddress(this.delegatorAddr).toString(config.iris.bech32.accAddr),
      validator_addr: new AccAddress(this.validatorAddr).toString(config.iris.bech32.valAddr),
      shares_amount: this.sharesAmount
    }
  }

  static getType() {
    return "irishub/stake/BeginUnbonding"
  }
}
