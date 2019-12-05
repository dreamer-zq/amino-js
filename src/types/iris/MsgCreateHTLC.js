import config from '../../config'
import Utils from '../../utils'
import { Codec } from '../../index'
import {Msg,AccAddress,Coin} from '../type'

export class MsgCreateHTLC extends Msg {
    constructor (properties = {}) {
        super()
        this.sender = properties.sender || new AccAddress()
        this.to = properties.to || new AccAddress()
        this.receiverOnOtherChain = properties.receiverOnOtherChain.delegation || ""
        this.amount = properties.amount || [new Coin()]
        this.hashLock = properties.hashLock || Buffer.alloc(0)
        this.timestamp = properties.timestamp || 0
        this.timeLock = properties.timeLock || 0
    }

    static create (sender, to, receiverOnOtherChain,amount,hashLock,timestamp,timeLock) {
        return new MsgCreateHTLC({
            sender: sender,
            to: to,
            receiverOnOtherChain: receiverOnOtherChain,
            amount: amount,
            hashLock: hashLock,
            timestamp: timestamp,
            timeLock: timeLock
        })
    }

    getSignBytes () {
        const msg = Codec.marshalJSON(this) // TODO
        msg.value = {
            sender: this.delegatorAddr.toString(config.iris.bech32.accAddr),
            to: this.validatorAddr.toString(config.iris.bech32.valAddr),
            receiverOnOtherChain: this.delegation
        }
        return Utils.sortObjectKeys(msg)
    }

    validateBasic () {
        if (Utils.isEmpty(this.delegatorAddr)) {
            throw new Error('delegatorAddr is empty')
        }

        if (Utils.isEmpty(this.validatorAddr)) {
            throw new Error('validatorAddr is empty')
        }

        if (Utils.isEmpty(this.delegation)) {
            throw new Error('delegation must great than 0')
        }
    }

    toJSON () {
        return {
            delegatorAddr: new AccAddress(this.delegatorAddr).toString(config.iris.bech32.accAddr),
            validatorAddr: new AccAddress(this.validatorAddr).toString(config.iris.bech32.valAddr),
            delegation: this.delegation
        }
    }

    static getType() {
        return "irishub/stake/MsgDelegate"
    }
}
