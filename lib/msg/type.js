'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Coin = exports.AccAddress = exports.SignatureSecp256k1 = exports.PubKeySecp256k1 = exports.Msg = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _bech = require('bech32');

var Bech32 = _interopRequireWildcard(_bech);

var _config = require('../config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

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

var PubKeySecp256k1 = exports.PubKeySecp256k1 = function (_Buffer) {
  _inherits(PubKeySecp256k1, _Buffer);

  function PubKeySecp256k1(data) {
    _classCallCheck(this, PubKeySecp256k1);

    return _possibleConstructorReturn(this, (PubKeySecp256k1.__proto__ || Object.getPrototypeOf(PubKeySecp256k1)).call(this, data));
  }

  return PubKeySecp256k1;
}(Buffer);

var SignatureSecp256k1 = exports.SignatureSecp256k1 = function (_Buffer2) {
  _inherits(SignatureSecp256k1, _Buffer2);

  function SignatureSecp256k1(data) {
    _classCallCheck(this, SignatureSecp256k1);

    return _possibleConstructorReturn(this, (SignatureSecp256k1.__proto__ || Object.getPrototypeOf(SignatureSecp256k1)).call(this, data));
  }

  return SignatureSecp256k1;
}(Buffer);

var AccAddress = exports.AccAddress = function (_Buffer3) {
  _inherits(AccAddress, _Buffer3);

  function AccAddress(data) {
    _classCallCheck(this, AccAddress);

    var _this3 = _possibleConstructorReturn(this, (AccAddress.__proto__ || Object.getPrototypeOf(AccAddress)).call(this, data));

    _this3.toString = function (prefix) {
      var depositor = Bech32.toWords(this);
      return Bech32.encode(prefix, depositor);
    };
    return _this3;
  }

  return AccAddress;
}(Buffer);

var Coin = exports.Coin = function Coin(denom, amount) {
  _classCallCheck(this, Coin);

  this.denom = denom || '';
  this.amount = amount || '';
};