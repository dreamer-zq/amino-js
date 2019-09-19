import Encoder from "./encoder"
import Decoder from "./decoder"
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
const _decoder = new Decoder(_typPrefix);

export default class Codec {
    static registerConcrete(type, prefix) {
        if (!type || !prefix) return;
        type.prototype.__msgType__ = prefix;

        const bzPrefix = _aminoPrefix(prefix);
        _typPrefix[prefix] = bzPrefix;
        _typPrefix[Buffer.from(bzPrefix).toString("hex")] = type;
    }

    static marshalBinaryLengthPrefixed(obj) {
        return _encoder.marshalBinaryLengthPrefixed(obj)
    }

    static unMarshalBinaryLengthPrefixed(bytes,type) {
        const result = _decoder.unMarshalBinaryLengthPrefixed(bytes,type);
        return result.val || {}
    }

    static marshalBinaryBare(obj) {
        return _encoder.marshalBinaryBare(obj)
    }

    static marshalJSON(obj) {
        return _encoder.marshalJSON(obj)
    }
};
