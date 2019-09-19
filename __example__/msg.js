export class StdTx {
    constructor(properties = {}) {
        this.msgs = properties.msgs || [];
        this.fee = properties.fee || new StdFee();
        this.signatures = properties.signatures || new StdSignature();
        this.memo = properties.memo || ""
    }
}

export class StdFee {
    constructor(amount, gas) {
        this.amount = amount || [new Coin()];
        this.gas = gas || 0;
    }
}

export class StdSignature {
    constructor(pub_key, signature, account_number, sequence) {
        this.pub_key = pub_key || Buffer.alloc(0);
        this.signature = signature || [Buffer.alloc(0)];
        this.account_number = account_number || 0;
        this.sequence = sequence || 0;
    }
}

export class Coin {
    constructor(denom, amount) {
        this.denom = denom || "";
        this.amount = amount || "";
    }
}

export class Input {
    constructor(properties = {}) {
        this.address = properties.address || Buffer.alloc(0);
        this.coins = properties.coins || [new Coin()];
    }
}

export class Output {
    constructor(properties = {}) {
        this.address = properties.address || Buffer.alloc(0);
        this.coins = properties.coins || [new Coin()];
    }
}

export class MsgSend {
    constructor(properties = {}) {
        this.input = properties.input || [new Input()];
        this.output = properties.output || [new Output()]
    }
}

export class MsgDelegate {
    constructor(properties = {}) {
        this.delegatorAddr = properties.delegatorAddr || Buffer.alloc(0);
        this.validatorAddr = properties.validatorAddr || Buffer.alloc(0);
        this.delegation = properties.delegation || new Coin()
    }
}
