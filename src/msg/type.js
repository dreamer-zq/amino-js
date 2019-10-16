export class Msg {
  getSignBytes () {}
  validateBasic () {}
  toJSON () {}
}

export class PubKeySecp256k1 extends Buffer {
  constructor (data) {
    super(data)
  }
}

export class SignatureSecp256k1 extends Buffer {
  constructor (data) {
    super(data)
  }
}

export class AccAddress extends Buffer {
  constructor (data) {
    super(data)
  }
}

export class Coin {
  constructor (denom, amount) {
    this.denom = denom || ''
    this.amount = amount || ''
  }
}
