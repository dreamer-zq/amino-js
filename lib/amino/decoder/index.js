'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * @module amino.decode
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */

var _protocolBuffersEncodings = require('protocol-buffers-encodings');

var _safeBuffer = require('safe-buffer');

var _is_js = require('is_js');

var _is_js2 = _interopRequireDefault(_is_js);

var _typeToTyp = require('../typeToTyp3');

var _typeToTyp2 = _interopRequireDefault(_typeToTyp);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var decoder = function decoder(bytes, varType) {
  var val = varType.decode(bytes, 0);
  var offset = varType.encodingLength(val);
  return { val: val, offset: offset };
};

var setDefaultValue = function setDefaultValue(type, key) {
  if (_is_js2.default.object(type[key])) type[key] = null;

  if (_is_js2.default.number(type[key])) type[key] = 0;

  if (_is_js2.default.boolean(type[key])) type[key] = false;

  if (_is_js2.default.string(type[key])) type[key] = '';
};

var decodeFieldNumberAndTyp3 = function decodeFieldNumberAndTyp3(bytes) {
  if (bytes.length < 2) {
    // default value
    return { fieldNum: -1 };
  }

  var _decoder = decoder(bytes, _protocolBuffersEncodings.varint),
      val = _decoder.val;

  var typ = val & 7;
  var fieldNum = val >> 3;
  if (fieldNum > 1 << 29 - 1) {
    throw new Error('invalid field num ' + fieldNum);
  }

  return { fieldNum: fieldNum, typ: typ };
};

var Decoder = function () {
  function Decoder() {
    var typePrefixes = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, Decoder);

    this._typePrefixes = typePrefixes;
  }

  _createClass(Decoder, [{
    key: 'unMarshalBinaryLengthPrefixed',
    value: function unMarshalBinaryLengthPrefixed(bytes, type) {
      if (bytes.length === 0) {
        throw new TypeError('Cannot decode empty bytes');
      }

      // read byte-length prefix

      var _decoder2 = decoder(bytes, _protocolBuffersEncodings.varint),
          len = _decoder2.offset;

      if (len < 0) {
        throw new Error('Error reading msg byte-length prefix: got code ' + len);
      }

      bytes = bytes.slice(len);
      type = this.getInstance(type, bytes.slice(0, 4));
      return this.unMarshalBinaryBare(bytes, type);
    }
  }, {
    key: 'unMarshalBinaryBare',
    value: function unMarshalBinaryBare(bytes, type) {
      if (!_is_js2.default.object(type)) {
        throw new TypeError('type should be object');
      }

      if (!_safeBuffer.Buffer.isBuffer(bytes)) {
        throw new TypeError('bytes must be buffer');
      }

      if (_is_js2.default.array(type)) {
        if (!_is_js2.default.object(type[0])) {
          throw new TypeError('type should be object');
        }

        return this.decodeArrayBinary(bytes, type[0]);
      }

      return this.decodeBinary(bytes, type);
    }
  }, {
    key: 'decodeArrayBinary',
    value: function decodeArrayBinary(bytes, type) {
      var arr = [];
      var arrayOffset = 0;

      var _decodeFieldNumberAnd = decodeFieldNumberAndTyp3(bytes),
          fieldNumber = _decodeFieldNumberAnd.fieldNum;

      while (true) {
        var _decodeFieldNumberAnd2 = decodeFieldNumberAndTyp3(bytes),
            fieldNum = _decodeFieldNumberAnd2.fieldNum;

        if (fieldNum !== fieldNumber || fieldNum < 0) break;

        // remove 1 byte of encoded field number and type
        bytes = bytes.slice(1);

        // is default value, skip and continue read bytes
        if (bytes.length > 0 && bytes[0] === 0x00) continue;

        var _decodeBinary = this.decodeBinary(bytes, type, true),
            offset = _decodeBinary.offset,
            val = _decodeBinary.val;

        arr.push(val);
        bytes = bytes.slice(offset);

        arrayOffset += offset + 1;
        fieldNumber = fieldNum;
      }
      return { val: arr, offset: arrayOffset };
    }
  }, {
    key: 'decodeBinary',
    value: function decodeBinary(bytes, type, isLengthPrefixed) {
      if (_safeBuffer.Buffer.isBuffer(type)) {
        return decoder(bytes, _protocolBuffersEncodings.bytes);
      }

      if (_is_js2.default.array(type)) {
        return this.decodeArrayBinary(bytes, type);
      }

      if (_is_js2.default.number(type)) {
        return decoder(bytes, _protocolBuffersEncodings.varint);
      }

      if (_is_js2.default.boolean(type)) {
        return decoder(bytes, _protocolBuffersEncodings.bool);
      }

      if (_is_js2.default.string(type)) {
        return decoder(bytes, _protocolBuffersEncodings.string);
      }

      if (_is_js2.default.object(type) || type === undefined) {
        return this.decodeObjectBinary(bytes, type, isLengthPrefixed);
      }
    }
  }, {
    key: 'decodeObjectBinary',
    value: function decodeObjectBinary(bytes, type, isLengthPrefixed) {
      var _this = this;

      var objectOffset = 0;

      // read byte-length prefix
      if (isLengthPrefixed) {
        var _decoder3 = decoder(bytes, _protocolBuffersEncodings.varint),
            len = _decoder3.offset;

        bytes = bytes.slice(len);
        objectOffset += len;
      }

      // If registered concrete, consume and verify prefix bytes.
      type = this.getInstance(type, bytes.slice(0, 4));
      if (this._typePrefixes[type.__msgType__]) {
        bytes = bytes.slice(4);
        objectOffset += 4;
      }

      var lastFieldNum = 0;
      var keys = Object.keys(type);
      keys.forEach(function (key, index) {
        if (_is_js2.default.array(type[key])) {
          var bz = bytes.slice(0, bytes[1] + 2);

          var _decodeArrayBinary = _this.decodeArrayBinary(bz, type[key][0]),
              offset = _decodeArrayBinary.offset,
              val = _decodeArrayBinary.val;

          objectOffset += offset;
          type[key] = val;
          bytes = bytes.slice(offset);
        } else {
          var _decodeFieldNumberAnd3 = decodeFieldNumberAndTyp3(bytes),
              fieldNum = _decodeFieldNumberAnd3.fieldNum,
              typ = _decodeFieldNumberAnd3.typ;

          // if this field is default value, continue


          if (index + 1 !== fieldNum || fieldNum < 0) {
            setDefaultValue(type, key);
            return;
          }

          if (fieldNum <= lastFieldNum) {
            throw new Error('encountered fieldNum: ' + fieldNum + ', but we have already seen num: ' + lastFieldNum);
          }

          lastFieldNum = fieldNum;

          if (index + 1 !== fieldNum) {
            throw new Error('field number is not expected');
          }

          var typeWanted = (0, _typeToTyp2.default)(type[key]);
          if (typ !== typeWanted) {
            throw new Error('field type is not expected');
          }

          // remove 1 byte of type
          bytes = bytes.slice(1);

          var _decodeBinary2 = _this.decodeBinary(bytes, type[key], true),
              value = _decodeBinary2.val,
              _offset = _decodeBinary2.offset;

          type[key] = value;

          // remove decoded bytes
          bytes = bytes.slice(_offset);
          objectOffset += _offset + 1;
        }
      });
      return { val: type, offset: objectOffset };
    }
  }, {
    key: 'getInstance',
    value: function getInstance(type, prefixByte) {
      if (_is_js2.default.undefined(type)) {
        var prefix = _safeBuffer.Buffer.from(prefixByte).toString('hex');
        var Type = this._typePrefixes[prefix];
        if (_is_js2.default.undefined(Type)) {
          throw new Error('you must specify a specific type or register it to codec');
        }
        type = new Type();
      }
      return type;
    }
  }]);

  return Decoder;
}();

exports.default = Decoder;