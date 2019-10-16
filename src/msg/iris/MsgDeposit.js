import config from '../../config'
import Utils from '../../utils'
import { Codec } from '../../index'
import {Msg,AccAddress,Coin} from '../type'

export class MsgDeposit extends Msg {
  constructor (properties = {}) {
    super()
    this.proposalID = properties.proposalID || 0
    this.depositor = properties.depositor || new AccAddress(0)
    this.amount = properties.amount || new Coin()
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
    msg.value = {
      proposal_id: this.proposalID,
      depositor: this.depositor.toString(config.iris.bech32.accAddr),
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
    return {
      proposalID: this.proposalID,
      depositor: new AccAddress(this.depositor).toString(config.iris.bech32.accAddr),
      amount: this.amount
    }
  }
}
