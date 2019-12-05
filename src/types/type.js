import * as Bech32 from 'bech32';

export class Msg {
  getSignBytes () {}
  validateBasic () {}
  toJSON () {}
  static getType() {}
}

export class PubKeySecp256k1{
  constructor (data = []) {
    return Buffer.from(data)
  }
}

export class SignatureSecp256k1{
  constructor (data = []) {
    return Buffer.from(data)
  }
}

export class AccAddress{
  constructor (data = []) {
    let buf = Buffer.from(data)
    buf.toString = function (prefix) {
      return convert(prefix,this)
    }
    return buf
  }
}

export class Coin {
  constructor (denom, amount) {
    this.denom = denom || ''
    this.amount = amount || ''
  }
}

const convert = (prefix,data) => {
  const depositor = Bech32.toWords(data)
  return Bech32.encode(prefix, depositor)
}
