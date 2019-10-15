import Utils from "../utils"
import * as Bech32 from "bech32"
import config from "../config"
import {Codec} from "../index"

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

  toJSON() {
    return {
      msgs: this.msgs,
      fee: this.fee,
      memo: this.memo,
      signatures: this.signatures,
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

  getSignBytes() {
    let strByte = Bech32.toWords(this.address);
    let msg = {
      "address": Bech32.encode(config.iris.bech32.accAddr,strByte),
      "coins": this.coins
    };
    return Utils.sortObjectKeys(msg)
  }

  validateBasic() {
    if (Utils.isEmpty(this.address)) {
      throw new Error("address is empty")
    }

    if (Utils.isEmpty(this.coins)) {
      throw new Error("coins is empty")
    }
  }

  toJSON(){
    let strByte = Bech32.toWords(this.address);
    return  {
      "address": Bech32.encode(config.iris.bech32.accAddr,strByte),
      "coins": this.coins
    };
  }
}

export class Output {
  constructor (properties = {}) {
    this.address = properties.address || new AccAddress(0)
    this.coins = properties.coins || [new Coin()]
  }

  getSignBytes() {
    let strByte = Bech32.toWords(this.address);
    let msg = {
      "address": Bech32.encode(config.iris.bech32.accAddr,strByte),
      "coins": this.coins
    };
    return Utils.sortObjectKeys(msg)
  }

  validateBasic() {
    if (Utils.isEmpty(this.address)) {
      throw new Error("address is empty")
    }

    if (Utils.isEmpty(this.coins)) {
      throw new Error("coins is empty")
    }
  }

  toJSON(){
    let strByte = Bech32.toWords(this.address);
    return  {
      "address": Bech32.encode(config.iris.bech32.accAddr,strByte),
      "coins": this.coins
    };
  }
}

export class MsgSend {
  constructor (properties = {}) {
    this.input = properties.input || [new Input()]
    this.output = properties.output || [new Output()]
  }

  static create (from, to, amount) {
    return new MsgSend({
      input: [new Input({ address: from, coins: amount })],
      output: [new Output({ address: to, coins: amount })]
    })
  }

  getSignBytes() {
    let inputs = [];
    let outputs = [];
    this.input.forEach(function(item) {
      inputs.push(item.getSignBytes())
    });
    this.output.forEach(function(item) {
      outputs.push(item.getSignBytes())
    });
    let msg = {
      "inputs": inputs,
      "outputs": outputs
    };

    return Utils.sortObjectKeys(msg);
  }

  validateBasic() {
    if (Utils.isEmpty(this.input)) {
      throw new Error("sender is  empty");
    }
    if (Utils.isEmpty(this.output)) {
      throw new Error("sender is  empty");
    }

    this.input.forEach(function(input) {
      input.validateBasic();
    });

    this.output.forEach(function(output) {
      output.validateBasic();
    })
  }
}

export class MsgDelegate {
  constructor (properties = {}) {
    this.delegatorAddr = properties.delegatorAddr || new AccAddress(0)
    this.validatorAddr = properties.validatorAddr || new AccAddress(0)
    this.delegation = properties.delegation || new Coin()
  }

  static create (delegatorAddr, validatorAddr, delegation) {
    return new MsgDelegate({
      delegatorAddr: delegatorAddr,
      validatorAddr: validatorAddr,
      delegation: delegation
    })
  }

  getSignBytes() {
    let msg = Codec.marshalJSON(this)
    let delegator = Bech32.toWords(this.delegatorAddr);
    let validator = Bech32.toWords(this.validatorAddr);
    msg.value = {
      "delegator_addr": Bech32.encode(config.iris.bech32.accAddr, delegator),
      "validator_addr": Bech32.encode(config.iris.bech32.valAddr, validator),
      "delegation": this.delegation
    }
    return Utils.sortObjectKeys(msg);
  }

  validateBasic() {
    if (Utils.isEmpty(this.delegatorAddr)) {
      throw new Error("delegatorAddr is empty");
    }

    if (Utils.isEmpty(this.validatorAddr)) {
      throw new Error("validatorAddr is empty");
    }

    if (Utils.isEmpty(this.delegation)) {
      throw new Error("delegation must great than 0");
    }
  }

  toJSON(){
    let delegator = Bech32.toWords(this.delegatorAddr);
    let validator = Bech32.toWords(this.validatorAddr);
    return  {
      delegatorAddr: Bech32.encode(config.iris.bech32.accAddr, delegator),
      validatorAddr: Bech32.encode(config.iris.bech32.valAddr, validator),
      delegation: this.delegation
    }
  }
}

export class MsgBeginUnbonding {
  constructor (properties = {}) {
    this.delegatorAddr = properties.delegatorAddr || new AccAddress(0)
    this.validatorAddr = properties.validatorAddr || new AccAddress(0)
    this.shares = properties.shares || ''
  }

  static create (delegatorAddr, validatorAddr, shares) {
    return new MsgDelegate({
      delegatorAddr: delegatorAddr,
      validatorAddr: validatorAddr,
      shares: shares
    })
  }

  getSignBytes() {
    let msg = Codec.marshalJSON(this)
    let delegator = Bech32.toWords(this.delegatorAddr);
    let validator = Bech32.toWords(this.validatorAddr);
    msg.value = {
      "delegator_addr": Bech32.encode(config.iris.bech32.accAddr, delegator),
      "validator_addr": Bech32.encode(config.iris.bech32.valAddr, validator),
      "shares_amount": this.shares
    }
  }

  validateBasic() {
    if (Utils.isEmpty(this.delegatorAddr)) {
      throw new Error("delegatorAddr is empty");
    }

    if (Utils.isEmpty(this.validatorAddr)) {
      throw new Error("validatorAddr is empty");
    }

    if (Utils.isEmpty(this.shares)) {
      throw new Error("shares must great than 0");
    }
  }

  toJSON(){
    let delegator = Bech32.toWords(this.delegatorAddr);
    let validator = Bech32.toWords(this.validatorAddr);
    return  {
      delegatorAddr: Bech32.encode(config.iris.bech32.accAddr, delegator),
      validatorAddr: Bech32.encode(config.iris.bech32.valAddr, validator),
      shares: this.shares
    }
  }
}
