import config from "../../config";
import Utils from "../../utils";
import * as Bech32 from "bech32"
import * as Tx from "./StdTx"

export class MsgBeginRedelegate {
    constructor (properties = {}) {
        this.delegatorAddr = properties.delegatorAddr || new Tx.AccAddress(0)
        this.validatorSrcAddr = properties.validatorSrcAddr || new Tx.AccAddress(0)
        this.validatorDstAddr = properties.validatorDstAddr || new Tx.AccAddress(0)
        this.sharesAmount = properties.sharesAmount || ''
    }

    static create (delegatorAddr, validatorSrcAddr, validatorDstAddr,sharesAmount) {
        return new MsgBeginRedelegate({
            delegatorAddr: delegatorAddr,
            validatorSrcAddr: validatorSrcAddr,
            validatorDstAddr: validatorDstAddr,
            sharesAmount: sharesAmount
        })
    }

    getSignBytes() {
        let delegator = Bech32.toWords(this.delegatorAddr);
        let validatorSrcAddr = Bech32.toWords(this.validatorSrcAddr);
        let validatorDstAddr = Bech32.toWords(this.validatorDstAddr);
        return  {
            "delegator_addr": Bech32.encode(config.iris.bech32.accAddr, delegator),
            "validator_src_addr": Bech32.encode(config.iris.bech32.valAddr, validatorSrcAddr),
            "validator_dst_addr": Bech32.encode(config.iris.bech32.valAddr, validatorDstAddr),
            "shares": this.sharesAmount
        }
    }

    validateBasic() {
        if (Utils.isEmpty(this.delegatorAddr)) {
            throw new Error("delegatorAddr is empty");
        }

        if (Utils.isEmpty(this.validatorSrcAddr)) {
            throw new Error("validatorSrcAddr is empty");
        }

        if (Utils.isEmpty(this.validatorDstAddr)) {
            throw new Error("validatorDstAddr is empty");
        }

        if (Utils.isEmpty(this.sharesAmount)) {
            throw new Error("sharesAmount must great than 0");
        }
    }

    toJSON(){
        let delegator = Bech32.toWords(this.delegatorAddr);
        let validatorSrcAddr = Bech32.toWords(this.validatorSrcAddr);
        let validatorDstAddr = Bech32.toWords(this.validatorDstAddr);
        return  {
            delegatorAddr: Bech32.encode(config.iris.bech32.accAddr, delegator),
            validatorSrcAddr: Bech32.encode(config.iris.bech32.valAddr, validatorSrcAddr),
            validatorDstAddr: Bech32.encode(config.iris.bech32.valAddr, validatorDstAddr),
            sharesAmount: this.sharesAmount
        }
    }
}
