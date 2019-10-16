'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Coin = exports.AccAddress = exports.SignatureSecp256k1 = exports.PubKeySecp256k1 = exports.Msg = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _bech = require('bech32');

var Bech32 = _interopRequireWildcard(_bech);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Msg = exports.Msg = function () {
  function Msg() {
    _classCallCheck(this, Msg);
  }

  _createClass(Msg, [{
    key: 'getSignBytes',
    value: function getSignBytes() {}
  }, {
    key: 'validateBasic',
    value: function validateBasic() {}
  }, {
    key: 'toJSON',
    value: function toJSON() {}
  }]);

  return Msg;
}();

var PubKeySecp256k1 = exports.PubKeySecp256k1 = function PubKeySecp256k1() {
  var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

  _classCallCheck(this, PubKeySecp256k1);

  return Buffer.from(data);
};

var SignatureSecp256k1 = exports.SignatureSecp256k1 = function SignatureSecp256k1() {
  var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

  _classCallCheck(this, SignatureSecp256k1);

  return Buffer.from(data);
};

var AccAddress = exports.AccAddress = function AccAddress() {
  var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

  _classCallCheck(this, AccAddress);

  var buf = Buffer.from(data);
  buf.toString = function (prefix) {
    return convert(prefix, this);
  };
  return buf;
};

var Coin = exports.Coin = function Coin(denom, amount) {
  _classCallCheck(this, Coin);

  this.denom = denom || '';
  this.amount = amount || '';
};

var convert = function convert(prefix, data) {
  var depositor = Bech32.toWords(data);
  return Bech32.encode(prefix, depositor);
};