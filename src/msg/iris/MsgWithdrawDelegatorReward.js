import config from "../../config";
import Utils from "../../utils";
import * as Bech32 from "bech32"
import * as Tx from "./StdTx"
import {Codec} from "../../index"

export class MsgWithdrawDelegatorReward {
    constructor (properties = {}) {
        this.delegatorAddr = properties.delegatorAddr || new Tx.AccAddress(0)
        this.validatorAddr = properties.validatorAddr || new Tx.AccAddress(0)
    }

    static create (delegatorAddr, validatorAddr, delegation) {
        return new MsgWithdrawDelegatorReward({
            delegatorAddr: delegatorAddr,
            validatorAddr: validatorAddr,
        })
    }

    getSignBytes() {
        let msg = Codec.marshalJSON(this) //TODO
        let delegator = Bech32.toWords(this.delegatorAddr);
        let validator = Bech32.toWords(this.validatorAddr);
        msg.value = {
            "delegator_addr": Bech32.encode(config.iris.bech32.accAddr, delegator),
            "validator_addr": Bech32.encode(config.iris.bech32.valAddr, validator),
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
    }

    toJSON(){
        let delegator = Bech32.toWords(this.delegatorAddr);
        let validator = Bech32.toWords(this.validatorAddr);
        return  {
            delegatorAddr: Bech32.encode(config.iris.bech32.accAddr, delegator),
            validatorAddr: Bech32.encode(config.iris.bech32.valAddr, validator)
        }
    }
}
