import * as common from './common'

export class MsgSend {
  constructor (properties = {}) {
    this.input = properties.input || [new common.Input()]
    this.output = properties.output || [new common.Output()]
  }

  static create (from, to, amount) {
    return new MsgSend({
      input: [new common.Input({ address: from, coins: [amount] })],
      output: [new common.Output({ address: to, coins: [amount] })]
    })
  }
}

export class MsgDelegate {
  constructor (properties = {}) {
    this.delegatorAddr = properties.delegatorAddr || new common.AccAddress(0)
    this.validatorAddr = properties.validatorAddr || new common.AccAddress(0)
    this.delegation = properties.delegation || new common.Coin()
  }

  static create (delegatorAddr, validatorAddr, delegation) {
    return new MsgDelegate({
      delegatorAddr: delegatorAddr,
      validatorAddr: validatorAddr,
      delegation: delegation
    })
  }
}

export class MsgBeginUnbonding {
  constructor (properties = {}) {
    this.delegatorAddr = properties.delegatorAddr || new common.AccAddress()
    this.validatorAddr = properties.validatorAddr || new common.AccAddress()
    this.shares = properties.shares || ''
  }

  static create (delegatorAddr, validatorAddr, shares) {
    return new MsgDelegate({
      delegatorAddr: delegatorAddr,
      validatorAddr: validatorAddr,
      shares: shares
    })
  }
}
