import {Msg} from "../src";

export default class MsgSend extends Msg{
    constructor(properties){
        super("irishub/bank/Send");
        this.input = properties.input;
        this.output = properties.output
    }
}
