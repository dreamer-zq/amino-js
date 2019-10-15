import config from "../../config";
import Utils from "../../utils";
import * as Bech32 from "bech32"
import * as Tx from "./StdTx"
import {Codec} from "../../index"

export class MsgWithdrawDelegatorRewardsAll {
    constructor (properties = {}) {
        this.delegatorAddr = properties.delegatorAddr || new Tx.AccAddress(0)
    }

    static create (delegatorAddr) {
        return new MsgWithdrawDelegatorRewardsAll({
            delegatorAddr: delegatorAddr
        })
    }

    getSignBytes() {
        let msg = Codec.marshalJSON(this) //TODO
        let delegator = Bech32.toWords(this.delegatorAddr);
        msg.value = {
            "delegator_addr": Bech32.encode(config.iris.bech32.accAddr, delegator)
        }
        return Utils.sortObjectKeys(msg);
    }

    validateBasic() {
        if (Utils.isEmpty(this.delegatorAddr)) {
            throw new Error("delegatorAddr is empty");
        }
    }

    toJSON(){
        let delegator = Bech32.toWords(this.delegatorAddr);
        return  {
            delegatorAddr: Bech32.encode(config.iris.bech32.accAddr, delegator),
        }
    }
}
