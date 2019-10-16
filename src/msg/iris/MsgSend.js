import config from '../../config'
import Utils from '../../utils'
import {Msg,AccAddress,Coin} from '../type'

export class Input {
  constructor (properties = {}) {
    this.address = properties.address || new AccAddress()
    this.coins = properties.coins || [new Coin()]
  }

  getSignBytes () {
    const msg = {
      address: this.address.toString(config.iris.bech32.accAddr),
      coins: this.coins
    }
    return Utils.sortObjectKeys(msg)
  }

  validateBasic () {
    if (Utils.isEmpty(this.address)) {
      throw new Error('address is empty')
    }

    if (Utils.isEmpty(this.coins)) {
      throw new Error('coins is empty')
    }
  }

  toJSON () {
    return {
      address: new AccAddress(this.address).toString(config.iris.bech32.accAddr),
      coins: this.coins
    }
  }
}

export class Output {
  constructor (properties = {}) {
    this.address = properties.address || new AccAddress()
    this.coins = properties.coins || [new Coin()]
  }

  getSignBytes () {
    const msg = {
      address: this.address.toString(config.iris.bech32.accAddr),
      coins: this.coins
    }
    return Utils.sortObjectKeys(msg)
  }

  validateBasic () {
    if (Utils.isEmpty(this.address)) {
      throw new Error('address is empty')
    }

    if (Utils.isEmpty(this.coins)) {
      throw new Error('coins is empty')
    }
  }

  toJSON () {
    return {
      address: new AccAddress(this.address).toString(config.iris.bech32.accAddr),
      coins: this.coins
    }
  }
}

export class MsgSend extends Msg {
  constructor (properties = {}) {
    super()
    this.input = properties.input || [new Input()]
    this.output = properties.output || [new Output()]
  }

  static create (from, to, amount) {
    return new MsgSend({
      input: [new Input({ address: from, coins: amount })],
      output: [new Output({ address: to, coins: amount })]
    })
  }

  getSignBytes () {
    const inputs = []
    const outputs = []
    this.input.forEach(function (item) {
      inputs.push(item.getSignBytes())
    })
    this.output.forEach(function (item) {
      outputs.push(item.getSignBytes())
    })
    const msg = {
      inputs: inputs,
      outputs: outputs
    }

    return Utils.sortObjectKeys(msg)
  }

  validateBasic () {
    if (Utils.isEmpty(this.input)) {
      throw new Error('sender is  empty')
    }
    if (Utils.isEmpty(this.output)) {
      throw new Error('sender is  empty')
    }

    this.input.forEach(function (input) {
      input.validateBasic()
    })

    this.output.forEach(function (output) {
      output.validateBasic()
    })
  }

  toJSON () {
    let inputs = []
    this.input.forEach(item => {
      inputs.push(item.toJSON())
    })
    let outputs = []
    this.output.forEach(item => {
      outputs.push(item.toJSON())
    })
    return {
      input: inputs,
      output: outputs
    }
  }
}
