import config from "../../config";
import Utils from "../../utils";
import * as Bech32 from "bech32"
import * as Tx from "./StdTx"

export class Input {
    constructor (properties = {}) {
        this.address = properties.address || new Tx.AccAddress(0)
        this.coins = properties.coins || [new Tx.Coin()]
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
        this.address = properties.address || new Tx.AccAddress(0)
        this.coins = properties.coins || [new Tx.Coin()]
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
