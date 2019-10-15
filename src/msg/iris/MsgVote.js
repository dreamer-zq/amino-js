import config from "../../config";
import Utils from "../../utils";
import * as Bech32 from "bech32"
import * as Tx from "./StdTx"
import {Codec} from "../../index"

export class MsgVote {
    constructor (properties = {}) {
        this.proposalID = properties.proposalID || 0
        this.voter = properties.voter || new Tx.AccAddress(0)
        this.option = properties.option || 0
    }

    static create (proposalID, voter, option) {
        return new MsgVote({
            proposalID: proposalID,
            depositor: voter,
            option: option
        })
    }

    getSignBytes() {
        let msg = Codec.marshalJSON(this) //TODO
        let voter = Bech32.toWords(this.voter);
        msg.value = {
            "proposal_id": this.proposalID,
            "voter": Bech32.encode(config.iris.bech32.accAddr, voter),
            "option": this.option
        }
        return Utils.sortObjectKeys(msg);
    }

    validateBasic() {
        if (Utils.isEmpty(this.proposalID)) {
            throw new Error("proposalID is empty");
        }

        if (Utils.isEmpty(this.voter)) {
            throw new Error("depositor is empty");
        }

        if (Utils.isEmpty(this.option)) {
            throw new Error("amount must great than 0");
        }
    }

    toJSON(){
        let depositor = Bech32.toWords(this.voter);
        return  {
            proposalID: this.proposalID,
            depositor: Bech32.encode(config.iris.bech32.accAddr, depositor),
            option: this.option
        }
    }
}
