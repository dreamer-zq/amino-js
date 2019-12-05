import * as Bech32 from 'bech32';
import {Codec} from '../index'
import Utils from "../utils";

export class Msg {
  getSignBytes() {
    const msg = Codec.marshalJSON(this);
    return Utils.sortObjectKeys(msg)
  }

  validateBasic() {
    throw new Error("you must implement validateBasic method")
  }

  toJSON() {
    throw new Error("you must implement toJSON method")
  }

  static getType() {
    throw new Error("you must implement getType method")
  }
}

export class PubKeySecp256k1 {
  constructor(data = []) {
    return Buffer.from(data)
  }
}

export class SignatureSecp256k1 {
  constructor(data = []) {
    return Buffer.from(data)
  }
}

export class AccAddress {
  constructor(data = []) {
    let buf = Buffer.from(data)
    buf.toString = function (prefix) {
      return convert(prefix, this)
    }
    return buf
  }
}

export class Coin {
  constructor(denom, amount) {
    this.denom = denom || ''
    this.amount = amount || ''
  }
}

const convert = (prefix, data) => {
  const depositor = Bech32.toWords(data)
  return Bech32.encode(prefix, depositor)
}
