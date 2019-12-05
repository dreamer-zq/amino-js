import config from '../../config'
import Utils from '../../utils'
import {Msg,AccAddress,Coin} from '../type'

export class MsgSend extends Msg {
    constructor (properties = {}) {
        super()
        this.fromAddress = properties.fromAddress || new AccAddress()
        this.toAddress = properties.toAddress || new AccAddress()
        this.amount = properties.amount || [new Coin()]
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
            from_address: new AccAddress(this.fromAddress).toString(config.cosmos.bech32.accAddr),
            to_address: new AccAddress(this.toAddress).toString(config.cosmos.bech32.accAddr),
            coins: this.coins
        }
    }

    static getType() {
        return "cosmos-sdk/MsgSend"
    }
}
