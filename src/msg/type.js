import * as Bech32 from 'bech32';
import config from "../config";

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
    super(data);
    this.toString = function (prefix) {
      const depositor = Bech32.toWords(this)
      return Bech32.encode(prefix, depositor)
    }
  }
}

export class Coin {
  constructor (denom, amount) {
    this.denom = denom || ''
    this.amount = amount || ''
  }
}
