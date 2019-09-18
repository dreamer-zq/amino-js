import Codec from "../src";
import {Coin, StdFee, StdSignature, StdTx, MsgSend ,MsgDelegate} from "../__example__/msg";
import chai from "chai"

const assert = chai.assert;

const sender = Buffer.from([76, 88, 159, 138, 37, 0, 233, 9, 9, 54, 6, 236, 43, 14, 141, 39, 151, 170, 233, 196]);
const fee = new Coin("iris-atto", "600000000000000000");
const stdFee = new StdFee([fee], 20000);
const pub_key = Buffer.from([235, 90, 233, 135, 33, 3, 128, 234, 6, 23, 16, 160, 236, 237, 58, 91, 222, 102, 37, 248, 194, 84, 147, 67, 253, 21, 94, 208, 251, 92, 39, 91, 77, 163, 146, 76, 185, 81]);
const account_number = 2;
const memo = "1";

describe("codec", () => {

    beforeEach(() => {
        Codec.registerConcrete(StdTx, "irishub/bank/StdTx");
        Codec.registerConcrete(MsgSend, "irishub/bank/Send");
        Codec.registerConcrete(MsgDelegate, "irishub/stake/MsgDelegate")
    });

    it("encode MsgSend", () => {
        const receipt = Buffer.from([134, 152, 80, 35, 135, 38, 124, 211, 158, 176, 61, 130, 76, 234, 166, 214, 133, 57, 181, 7]);
        const signature = Buffer.from([156, 11, 125, 181, 8, 234, 122, 109, 230, 27, 184, 196, 197, 212, 169, 207, 205, 83, 32, 139, 91, 147, 17, 87, 9, 58, 105, 173, 211, 177, 197, 155, 26, 212, 250, 0, 80, 102, 73, 14, 235, 68, 74, 28, 149, 51, 127, 182, 66, 222, 200, 153, 11, 91, 101, 37, 19, 138, 139, 79, 148, 47, 191, 147]);
        const sequence = 57;
        let msg = new MsgSend({
            input: {
                address: sender,
                coins: [new Coin("iris-atto", "10000000000000000000")],
            },
            output: {
                address: receipt,
                coins: [new Coin("iris-atto", "10000000000000000000")],
            }
        });

        let stdSignature = new StdSignature(pub_key, signature, account_number, sequence);
        const stdTx = new StdTx(msg, stdFee, stdSignature, memo);
        const bytes = Codec.marshalBinary(stdTx);
        console.log(JSON.stringify(bytes));
    });

    it("encode MsgDelegate", () => {
        const validator = Buffer.from([239, 109, 152, 243, 114, 255, 194, 210, 230, 20, 108, 65, 177, 146, 185, 70, 39, 151, 164, 253]);
        const signature = Buffer.from([193, 24, 243, 215, 239, 140, 54, 246, 94, 208, 225, 111, 23, 28, 148, 226, 15, 83, 253, 86, 85, 156, 86, 157, 118, 116, 34, 229, 72, 180, 89, 133, 56, 242, 105, 189, 30, 54, 110, 109, 44, 0, 200, 193, 40, 189, 10, 131, 197, 207, 219, 203, 158, 179, 89, 87, 228, 196, 225, 75, 138, 41, 90, 230]);
        const sequence = 12;

        let msg = new MsgDelegate({
            delegatorAddr: sender,
            validatorAddr: validator,
            delegation: new Coin("iris-atto", "1000000000000000000000000")
        });

        let stdSignature = new StdSignature(pub_key, signature, account_number, sequence);
        const stdTx = new StdTx([msg], stdFee, stdSignature, memo);
        const bytes = Codec.marshalBinary(stdTx);

        let expect = "f801d91e76b00a586af6af3b0a144c589f8a2500e909093606ec2b0e8d2797aae9c41214ef6d98f372ffc2d2e6146c41b192b9462797a4fd1a260a09697269732d6174746f12193130303030303030303030303030303030303030303030303012250a1f0a09697269732d6174746f121236303030303030303030303030303030303010a09c011a6e0a26eb5ae987210380ea061710a0eced3a5bde6625f8c2549343fd155ed0fb5c275b4da3924cb9511240c118f3d7ef8c36f65ed0e16f171c94e20f53fd56559c569d767422e548b4598538f269bd1e366e6d2c00c8c128bd0a83c5cfdbcb9eb35957e4c4e14b8a295ae61802200c220131";
        assert.equal(bytes.toString('hex'), expect)
    });
});




