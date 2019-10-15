import config from '../../config'
import Utils from '../../utils'
import * as Bech32 from 'bech32'
import * as Tx from './StdTx'
import { Codec } from '../../index'
import Msg from '../Msg'

export class MsgDeposit extends Msg {
  constructor (properties = {}) {
    super()
    this.proposalID = properties.proposalID || 0
    this.depositor = properties.depositor || new Tx.AccAddress(0)
    this.amount = properties.amount || new Tx.Coin()
  }

  static create (proposalID, depositor, amount) {
    return new MsgDeposit({
      proposalID: proposalID,
      depositor: depositor,
      amount: amount
    })
  }

  getSignBytes () {
    const msg = Codec.marshalJSON(this) // TODO
    const depositor = Bech32.toWords(this.depositor)
    msg.value = {
      proposal_id: this.proposalID,
      depositor: Bech32.encode(config.iris.bech32.accAddr, depositor),
      amount: this.amount
    }
    return Utils.sortObjectKeys(msg)
  }

  validateBasic () {
    if (Utils.isEmpty(this.proposalID)) {
      throw new Error('proposalID is empty')
    }

    if (Utils.isEmpty(this.depositor)) {
      throw new Error('depositor is empty')
    }

    if (Utils.isEmpty(this.amount)) {
      throw new Error('amount must great than 0')
    }
  }

  toJSON () {
    const depositor = Bech32.toWords(this.depositor)
    return {
      proposalID: this.proposalID,
      depositor: Bech32.encode(config.iris.bech32.accAddr, depositor),
      amount: this.amount
    }
  }
}
