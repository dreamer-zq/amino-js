import config from '../../config'
import Utils from '../../utils'
import * as Bech32 from 'bech32'
import * as Tx from './StdTx'
import { Codec } from '../../index'
import Msg from '../Msg'

export class MsgDelegate extends Msg {
  constructor (properties = {}) {
    super()
    this.delegatorAddr = properties.delegatorAddr || new Tx.AccAddress(0)
    this.validatorAddr = properties.validatorAddr || new Tx.AccAddress(0)
    this.delegation = properties.delegation || new Tx.Coin()
  }

  static create (delegatorAddr, validatorAddr, delegation) {
    return new MsgDelegate({
      delegatorAddr: delegatorAddr,
      validatorAddr: validatorAddr,
      delegation: delegation
    })
  }

  getSignBytes () {
    const msg = Codec.marshalJSON(this) // TODO
    const delegator = Bech32.toWords(this.delegatorAddr)
    const validator = Bech32.toWords(this.validatorAddr)
    msg.value = {
      delegator_addr: Bech32.encode(config.iris.bech32.accAddr, delegator),
      validator_addr: Bech32.encode(config.iris.bech32.valAddr, validator),
      delegation: this.delegation
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

    if (Utils.isEmpty(this.delegation)) {
      throw new Error('delegation must great than 0')
    }
  }

  toJSON () {
    const delegator = Bech32.toWords(this.delegatorAddr)
    const validator = Bech32.toWords(this.validatorAddr)
    return {
      delegatorAddr: Bech32.encode(config.iris.bech32.accAddr, delegator),
      validatorAddr: Bech32.encode(config.iris.bech32.valAddr, validator),
      delegation: this.delegation
    }
  }
}
