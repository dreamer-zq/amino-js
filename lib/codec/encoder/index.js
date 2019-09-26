'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; /**
                                                                                                                                                                                                                                                                               * @module amino.encode
                                                                                                                                                                                                                                                                               */

var _varstruct = require('varstruct');

var _varstruct2 = _interopRequireDefault(_varstruct);

var _safeBuffer = require('safe-buffer');

var _is_js = require('is_js');

var _is_js2 = _interopRequireDefault(_is_js);

var _varint = require('./varint');

var _typeToTyp = require('../typeToTyp3');

var _typeToTyp2 = _interopRequireDefault(_typeToTyp);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var VarString = _varstruct2.default.VarString(_varint.UVarInt);

var sortObject = function sortObject(obj) {
  if (obj === null) return null;
  if ((typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) !== 'object') return obj;
  // arrays have typeof "object" in js!
  if (Array.isArray(obj)) {
    return obj.map(sortObject);
  }
  var sortedKeys = Object.keys(obj).sort();
  var result = {};
  sortedKeys.forEach(function (key) {
    result[key] = sortObject(obj[key]);
  });
  return result;
};

/**
 * encode number
 * @param num
 */
var encodeNumber = function encodeNumber(num) {
  return _varint.UVarInt.encode(num);
};

/**
 * encode bool
 * @param b
 */
var encodeBool = function encodeBool(b) {
  return b ? _varint.UVarInt.encode(1) : _varint.UVarInt.encode(0);
};

/**
 * encode string
 * @param str
 */
var encodeString = function encodeString(str) {
  return VarString.encode(str);
};

/**
 * encode time
 * @param value
 */
var encodeTime = function encodeTime(value) {
  var millis = new Date(value).getTime();
  var seconds = Math.floor(millis / 1000);
  var nanos = Number(seconds.toString().padEnd(9, '0'));

  var buffer = _safeBuffer.Buffer.alloc(14);

  buffer[0] = 1 << 3 | 1; // field 1, typ3 1
  buffer.writeUInt32LE(seconds, 1);

  buffer[9] = 2 << 3 | 5; // field 2, typ3 5
  buffer.writeUInt32LE(nanos, 10);

  return buffer;
};

/**
 * @param obj -- {object}
 * @return bytes {Buffer}
 */
var convertObjectToSignBytes = function convertObjectToSignBytes(obj) {
  return _safeBuffer.Buffer.from(JSON.stringify(sortObject(obj)));
};

/**
 * prefixed with bytes length
 * @param {Buffer} bytes
 * @return {Buffer} with bytes length prefixed
 */
var encodeBinaryByteArray = function encodeBinaryByteArray(bytes) {
  var lenPrefix = bytes.length;
  return _safeBuffer.Buffer.concat([_varint.UVarInt.encode(lenPrefix), bytes]);
};

// Write field key.
var encodeTypeAndField = function encodeTypeAndField(index, field) {
  var value = index << 3 | (0, _typeToTyp2.default)(field);
  return _varint.UVarInt.encode(value);
};

var isDefaultValue = function isDefaultValue(obj) {
  if (obj === null) return false;

  return _is_js2.default.number(obj) && obj === 0 || _is_js2.default.string(obj) && obj === '' || _is_js2.default.array(obj) && obj.length === 0 || _is_js2.default.boolean(obj) && !obj;
};

var Encoder = function () {
  function Encoder() {
    var typePrefixes = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, Encoder);

    this._typePrefixes = typePrefixes;
  }

  _createClass(Encoder, [{
    key: 'marshalBinaryLengthPrefixed',
    value: function marshalBinaryLengthPrefixed(obj) {
      if (!_is_js2.default.object(obj)) {
        throw new TypeError('data must be an object');
      }

      return this._encodeBinary(obj, -1, true);
    }
  }, {
    key: 'marshalBinaryBare',
    value: function marshalBinaryBare(obj) {
      if (!_is_js2.default.object(obj)) {
        throw new TypeError('data must be an object');
      }

      return this._encodeBinary(obj).toString('hex');
    }
  }, {
    key: 'marshalJSON',
    value: function marshalJSON(obj) {
      var msg = {};
      if (this._typePrefixes[obj.__msgType__]) {
        msg.type = obj.__msgType__;
        msg.value = obj;
        return msg;
      }
      return obj;
    }

    /**
       * This is the main entrypoint for encoding all types in binary form.
       * @param {*} js data type (not null, not undefined)
       * @param {Number} field index of object
       * @param {Boolean} isByteLenPrefix
       * @return {Buffer} binary of object.
       */

  }, {
    key: '_encodeBinary',
    value: function _encodeBinary(val, fieldNum, isByteLenPrefix) {
      if (val === null || val === undefined) {
        throw new TypeError('unsupported type');
      }

      if (_safeBuffer.Buffer.isBuffer(val)) {
        if (isByteLenPrefix) {
          return _safeBuffer.Buffer.concat([_varint.UVarInt.encode(val.length), val]);
        }
        return val;
      }

      if (_is_js2.default.array(val)) {
        return this._encodeArrayBinary(fieldNum, val, isByteLenPrefix);
      }

      if (_is_js2.default.number(val)) {
        return encodeNumber(val);
      }

      if (_is_js2.default.boolean(val)) {
        return encodeBool(val);
      }

      if (_is_js2.default.string(val)) {
        return encodeString(val);
      }

      if (_is_js2.default.object(val)) {
        return this._encodeObjectBinary(val, isByteLenPrefix);
      }
    }
  }, {
    key: '_encodeArrayBinary',


    /**
       * @param {Number} fieldNum object field index
       * @param {Array} arr
       * @param {Boolean} isByteLenPrefix
       * @return {Buffer} bytes of array
       */
    value: function _encodeArrayBinary(fieldNum, arr, isByteLenPrefix) {
      var _this = this;

      var result = [];

      arr.forEach(function (item) {
        result.push(encodeTypeAndField(fieldNum, item));

        if (isDefaultValue(item)) {
          result.push(_safeBuffer.Buffer.from('00', 'hex'));
          return;
        }

        result.push(_this._encodeBinary(item, fieldNum, true));
      });

      // encode length
      if (isByteLenPrefix) {
        var length = result.reduce(function (prev, item) {
          return prev + item.length;
        }, 0);
        result.unshift(_varint.UVarInt.encode(length));
      }

      return _safeBuffer.Buffer.concat(result);
    }
  }, {
    key: '_encodeObjectBinary',


    /**
       *
       * @param {Object} obj
       * @return {Buffer} with bytes length prefixed
       */
    value: function _encodeObjectBinary(obj, isByteLenPrefix) {
      var _this2 = this;

      var bufferArr = [];
      var index = 1;
      Object.keys(obj).forEach(function (key) {
        if (key.startsWith('__')) return;

        if (isDefaultValue(obj[key])) return;

        if (_is_js2.default.array(obj[key]) && obj[key].length > 0) {
          bufferArr.push(_this2._encodeArrayBinary(index, obj[key], false));
        } else {
          bufferArr.push(encodeTypeAndField(index, obj[key]));
          bufferArr.push(_this2._encodeBinary(obj[key], index, true));
        }
        index++;
      });

      var bytes = _safeBuffer.Buffer.concat(bufferArr);

      // add prefix
      if (this._typePrefixes[obj.__msgType__]) {
        var prefix = _safeBuffer.Buffer.from(this._typePrefixes[obj.__msgType__]);
        bytes = _safeBuffer.Buffer.concat([prefix, bytes]);
      }

      // Write byte-length prefixed.
      if (isByteLenPrefix) {
        var lenBytes = _varint.UVarInt.encode(bytes.length);
        bytes = _safeBuffer.Buffer.concat([lenBytes, bytes]);
      }
      return bytes;
    }
  }]);

  return Encoder;
}();

exports.default = Encoder;