import {Msg} from "../src";

export default class MsgDelegate extends Msg{
    constructor(properties){
        super("irishub/stake/MsgDelegate");
        this.delegatorAddr = properties.delegatorAddr;
        this.validatorAddr = properties.validatorAddr;
        this.delegation = properties.delegation
    }
}
