import {PubKeySecp256k1,SignatureSecp256k1,Coin} from '../type'

export class StdTx {
  constructor (properties = {}) {
    this.msgs = properties.msgs || []
    this.fee = properties.fee || new StdFee()
    this.signatures = properties.signatures || new StdSignature()
    this.memo = properties.memo || ''
  }

  toJSON () {
    return {
      msgs: this.msgs,
      fee: this.fee,
      memo: this.memo,
      signatures: this.signatures
    }
  }

  static getType() {
    return "cosmos-sdk/StdTx"
  }
}

export class StdFee {
  constructor (amount, gas) {
    this.amount = amount || [new Coin()]
    this.gas = gas || 0
  }
}

export class StdSignature {
  constructor (pub_key, signature, account_number, sequence) {
    this.pub_key = pub_key || new PubKeySecp256k1()
    this.signature = signature || [new SignatureSecp256k1()]
  }

  toJSON () {
    const signatures = []
    this.signature.forEach((signature) => {
      signatures.push(Buffer.from(signature).toString('base64'))
    })
    return {
      pub_key: Buffer.from(this.pub_key).toString('base64'),
      signature: signatures
    }
  }
}
