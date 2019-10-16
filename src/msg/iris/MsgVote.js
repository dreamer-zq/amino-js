import config from '../../config'
import Utils from '../../utils'
import { Codec } from '../../index'
import {Msg,AccAddress} from '../type'

export class MsgVote extends Msg {
  constructor (properties = {}) {
    super()
    this.proposalID = properties.proposalID || 0
    this.voter = properties.voter || new AccAddress()
    this.option = properties.option || 0
  }

  static create (proposalID, voter, option) {
    return new MsgVote({
      proposalID: proposalID,
      depositor: voter,
      option: option
    })
  }

  getSignBytes () {
    const msg = Codec.marshalJSON(this) // TODO
    msg.value = {
      proposal_id: this.proposalID,
      voter: this.voter.toString(config.iris.bech32.accAddr),
      option: this.option
    }
    return Utils.sortObjectKeys(msg)
  }

  validateBasic () {
    if (Utils.isEmpty(this.proposalID)) {
      throw new Error('proposalID is empty')
    }

    if (Utils.isEmpty(this.voter)) {
      throw new Error('depositor is empty')
    }

    if (Utils.isEmpty(this.option)) {
      throw new Error('amount must great than 0')
    }
  }

  toJSON () {
    return {
      proposalID: this.proposalID,
      depositor: new AccAddress(this.voter).toString(config.iris.bech32.accAddr),
      option: this.option
    }
  }
}
