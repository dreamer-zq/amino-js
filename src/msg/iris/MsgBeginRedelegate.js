import config from '../../config'
import Utils from '../../utils'
import * as Bech32 from 'bech32'
import {Msg,AccAddress} from '../type'

export class MsgBeginRedelegate extends Msg {
  constructor (properties = {}) {
    super()
    this.delegatorAddr = properties.delegatorAddr || new AccAddress(0)
    this.validatorSrcAddr = properties.validatorSrcAddr || new AccAddress(0)
    this.validatorDstAddr = properties.validatorDstAddr || new AccAddress(0)
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
    const delegator = Bech32.toWords(this.delegatorAddr)
    const validatorSrcAddr = Bech32.toWords(this.validatorSrcAddr)
    const validatorDstAddr = Bech32.toWords(this.validatorDstAddr)
    return {
      delegator_addr: Bech32.encode(config.iris.bech32.accAddr, delegator),
      validator_src_addr: Bech32.encode(config.iris.bech32.valAddr, validatorSrcAddr),
      validator_dst_addr: Bech32.encode(config.iris.bech32.valAddr, validatorDstAddr),
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
    const delegator = Bech32.toWords(this.delegatorAddr)
    const validatorSrcAddr = Bech32.toWords(this.validatorSrcAddr)
    const validatorDstAddr = Bech32.toWords(this.validatorDstAddr)
    return {
      delegatorAddr: Bech32.encode(config.iris.bech32.accAddr, delegator),
      validatorSrcAddr: Bech32.encode(config.iris.bech32.valAddr, validatorSrcAddr),
      validatorDstAddr: Bech32.encode(config.iris.bech32.valAddr, validatorDstAddr),
      sharesAmount: this.sharesAmount
    }
  }
}
