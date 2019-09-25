'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _encoder2 = require('./encoder');

var _encoder3 = _interopRequireDefault(_encoder2);

var _decoder2 = require('./decoder');

var _decoder3 = _interopRequireDefault(_decoder2);

var _sha = require('sha256');

var _sha2 = _interopRequireDefault(_sha);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _aminoPrefix = function _aminoPrefix(name) {
  var a = (0, _sha2.default)(name);
  var b = _hexToBytes(a);
  while (b[0] === 0) {
    b = b.slice(1, b.length - 1);
  }
  b = b.slice(3, b.length - 1);
  while (b[0] === 0) {
    b = b.slice(1, b.length - 1);
  }
  b = b.slice(0, 4);
  return b;
};
var _hexToBytes = function _hexToBytes(hex) {
  var bytes = [];
  for (var c = 0; c < hex.length; c += 2) {
    bytes.push(parseInt(hex.substr(c, 2), 16));
  }
  return bytes;
};

var _typPrefix = new Map();
var _encoder = new _encoder3.default(_typPrefix);
var _decoder = new _decoder3.default(_typPrefix);

var Codec = function () {
  function Codec() {
    _classCallCheck(this, Codec);
  }

  _createClass(Codec, null, [{
    key: 'registerConcrete',
    value: function registerConcrete(type, prefix) {
      if (!type || !prefix) return;
      type.prototype.__msgType__ = prefix;

      var bzPrefix = _aminoPrefix(prefix);
      _typPrefix[prefix] = bzPrefix;
      _typPrefix[Buffer.from(bzPrefix).toString('hex')] = type;
    }
  }, {
    key: 'marshalBinaryLengthPrefixed',
    value: function marshalBinaryLengthPrefixed(obj) {
      return _encoder.marshalBinaryLengthPrefixed(obj);
    }
  }, {
    key: 'unMarshalBinaryLengthPrefixed',
    value: function unMarshalBinaryLengthPrefixed(bytes, type) {
      var result = _decoder.unMarshalBinaryLengthPrefixed(bytes, type);
      return result.val || {};
    }
  }, {
    key: 'marshalBinaryBare',
    value: function marshalBinaryBare(obj) {
      return _encoder.marshalBinaryBare(obj);
    }
  }, {
    key: 'marshalJSON',
    value: function marshalJSON(obj) {
      return _encoder.marshalJSON(obj);
    }
  }]);

  return Codec;
}();

exports.default = Codec;
;