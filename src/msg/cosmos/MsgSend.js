import config from '../../config'
import Utils from '../../utils'
import { Codec } from '../../index'
import {Msg,AccAddress,Coin} from '../type'

export class MsgSend extends Msg {
    constructor (properties = {}) {
        super()
        this.fromAddress = properties.fromAddress || new AccAddress()
        this.toAddress = properties.toAddress || new AccAddress()
        this.amount = properties.amount || [new Coin()]
    }

    getSignBytes () {
        const msg = Codec.marshalJSON(this) // TODO
        msg.value = {
            from_address: this.fromAddress.toString(config.cosmos.bech32.accAddr),
            to_address: this.toAddress.toString(config.cosmos.bech32.valAddr),
            amount: this.amount
        }
        return Utils.sortObjectKeys(msg)
    }

    validateBasic () {
        if (Utils.isEmpty(this.fromAddress)) {
            throw new Error('fromAddress is empty')
        }

        if (Utils.isEmpty(this.toAddress)) {
            throw new Error('toAddress is empty')
        }

        if (Utils.isEmpty(this.amount)) {
            throw new Error('amount is empty')
        }
    }

    toJSON () {
        return {
            fromAddress: new AccAddress(this.fromAddress).toString(config.cosmos.bech32.accAddr),
            toAddress: new AccAddress(this.toAddress).toString(config.cosmos.bech32.accAddr),
            coins: this.coins
        }
    }
}
