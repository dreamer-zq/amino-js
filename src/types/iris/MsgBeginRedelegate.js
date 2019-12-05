import config from '../../config'
import Utils from '../../utils'
import {Msg,AccAddress} from '../type'

export class MsgBeginRedelegate extends Msg {
  constructor (properties = {}) {
    super()
    this.delegatorAddr = properties.delegatorAddr || new AccAddress()
    this.validatorSrcAddr = properties.validatorSrcAddr || new AccAddress()
    this.validatorDstAddr = properties.validatorDstAddr || new AccAddress()
    this.sharesAmount = properties.sharesAmount || ''
  }

  static create (delegatorAddr, validatorSrcAddr, validatorDstAddr, sharesAmount) {
    return new MsgBeginRedelegate({
      delegatorAddr: delegatorAddr,
      validatorSrcAddr: validatorSrcAddr,
      validatorDstAddr: validatorDstAddr,
      sharesAmount: sharesAmount
    })
  }

  getSignBytes () {
    return {
      delegator_addr: this.delegatorAddr.toString(config.iris.bech32.accAddr),
      validator_src_addr: this.validatorSrcAddr.toString(config.iris.bech32.valAddr),
      validator_dst_addr: this.validatorDstAddr.toString(config.iris.bech32.valAddr),
      shares: this.sharesAmount
    }
  }

  validateBasic () {
    if (Utils.isEmpty(this.delegatorAddr)) {
      throw new Error('delegatorAddr is empty')
    }

    if (Utils.isEmpty(this.validatorSrcAddr)) {
      throw new Error('validatorSrcAddr is empty')
    }

    if (Utils.isEmpty(this.validatorDstAddr)) {
      throw new Error('validatorDstAddr is empty')
    }

    if (Utils.isEmpty(this.sharesAmount)) {
      throw new Error('sharesAmount must great than 0')
    }
  }

  toJSON () {
    return {
      delegator_addr: new AccAddress(this.delegatorAddr).toString(config.iris.bech32.accAddr),
      validator_src_addr: new AccAddress(this.validatorSrcAddr).toString(config.iris.bech32.valAddr),
      validator_dst_addr: new AccAddress(this.validatorDstAddr).toString(config.iris.bech32.valAddr),
      shares_amount: this.sharesAmount
    }
  }

  static getType() {
    return "irishub/stake/BeginRedelegate"
  }
}
