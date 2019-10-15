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
}

export class StdFee {
  constructor (amount, gas) {
    this.amount = amount || [new Coin()]
    this.gas = gas || 0
  }
}

export class StdSignature {
  constructor (pub_key, signature, account_number, sequence) {
    this.pub_key = pub_key || PubKeySecp256k1.alloc(0)
    this.signature = signature || [SignatureSecp256k1.alloc(0)]
    this.account_number = account_number || 0
    this.sequence = sequence || 0
  }

  toJSON () {
    const signatures = []
    this.signature.forEach((signature) => {
      signatures.push(Buffer.from(signature).toString('base64'))
    })
    return {
      pub_key: Buffer.from(this.pub_key).toString('base64'),
      signature: signatures,
      account_number: this.account_number,
      sequence: this.sequence
    }
  }
}

export class Coin {
  constructor (denom, amount) {
    this.denom = denom || ''
    this.amount = amount || ''
  }
}
