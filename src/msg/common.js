export class PubKeySecp256k1 extends Buffer {
  constructor (data) {
    super(data)
    // return createBufferProxy(this)
  }
}
export class SignatureSecp256k1 extends Buffer {
  constructor (data) {
    super(data)
    // return createBufferProxy(this)
  }
}
export class AccAddress extends Buffer {
  constructor (data) {
    super(data)
    // return createBufferProxy(this)
  }
}

// const createBufferProxy = (obj) =>{
//     return new Proxy(obj, {
//         get: (target, name) => {
//             switch (name) {
//                 case "toString":{
//                     return function (...args) {
//                         let result = Reflect.apply(target["toJSON"], target, []);
//                         return result.data
//                     }
//                 }
//                 case "toJSON":{
//                     return function (...args) {
//                         let result = Reflect.apply(target["toJSON"], target, []);
//                         return result.data
//                     }
//                 }
//                 case "length":{
//                     return obj.length
//                 }
//             }
//         }
//     });
// }

export class StdTx {
  constructor (properties = {}) {
    this.msgs = properties.msgs || []
    this.fee = properties.fee || new StdFee()
    this.signatures = properties.signatures || new StdSignature()
    this.memo = properties.memo || ''
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
}

export class Coin {
  constructor (denom, amount) {
    this.denom = denom || ''
    this.amount = amount || ''
  }
}

export class Input {
  constructor (properties = {}) {
    this.address = properties.address || new AccAddress(0)
    this.coins = properties.coins || [new Coin()]
  }
}

export class Output {
  constructor (properties = {}) {
    this.address = properties.address || new AccAddress(0)
    this.coins = properties.coins || [new Coin()]
  }
}
