import config from '../../config'
import Utils from '../../utils'
import {Msg,AccAddress} from '../type'


export class MsgWithdrawDelegatorRewardsAll extends Msg {
  constructor (properties = {}) {
    super()
    this.delegatorAddr = properties.delegatorAddr || new AccAddress()
  }

  static create (delegatorAddr) {
    return new MsgWithdrawDelegatorRewardsAll({
      delegatorAddr: delegatorAddr
    })
  }

  validateBasic () {
    if (Utils.isEmpty(this.delegatorAddr)) {
      throw new Error('delegatorAddr is empty')
    }
  }

  toJSON () {
    return {
      delegator_addr: new AccAddress(this.delegatorAddr).toString(config.iris.bech32.accAddr),
    }
  }

  static getType() {
    return "irishub/distr/MsgWithdrawDelegationRewardsAll"
  }
}
