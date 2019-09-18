export class Msg {
    constructor(msg, fee, signatures, memo) {
        this.msg = msg;
        this.fee = fee;
        this.signatures = signatures;
        this.memo = memo
    }
}

export class StdFee {
    constructor(amount, gas) {
        this.amount = amount;
        this.gas = gas;
    }
}

export class StdSignature {
    constructor(pub_key, signature, account_number, sequence) {
        this.pub_key = pub_key;
        this.signature = [signature];
        this.account_number = account_number;
        this.sequence = sequence;
    }
}

export class Coin {
    constructor(denom, amount) {
        this.denom = denom;
        this.amount = amount;
    }
}

export class MsgSend {
    constructor(properties) {
        this.input = properties.input;
        this.output = properties.output
    }
}

export class MsgDelegate {
    constructor(properties) {
        this.delegatorAddr = properties.delegatorAddr;
        this.validatorAddr = properties.validatorAddr;
        this.delegation = properties.delegation
    }
}
