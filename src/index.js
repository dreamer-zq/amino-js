import Encoder from "./encoder"
import Sha256 from "sha256"

const _aminoPrefix = (name) => {
    let a = Sha256(name);
    let b = _hexToBytes(a);
    while (b[0] === 0) {
        b = b.slice(1, b.length - 1)
    }
    b = b.slice(3, b.length - 1);
    while (b[0] === 0) {
        b = b.slice(1, b.length - 1)
    }
    b = b.slice(0, 4);
    return b
};
const _hexToBytes = (hex) => {
    let bytes = [];
    for (let c = 0; c < hex.length; c += 2) {
        bytes.push(parseInt(hex.substr(c, 2), 16));
    }
    return bytes;
};

const _typPrefix = new Map();
const _encoder = new Encoder(_typPrefix);

export default class Codec {
    static registerConcrete(type, prefix) {
        if (!type || !prefix) return;
        type.prototype.__msgType__ = prefix;
        _typPrefix[prefix] = _aminoPrefix(prefix)
    }

    static marshalBinary(obj) {
        return _encoder.marshalBinary(obj)
    }

    static marshalBinaryBare(obj) {
        return _encoder.marshalBinaryBare(obj)
    }

    static marshalJSON(obj) {
        return _encoder.marshalJSON(obj)
    }
};
