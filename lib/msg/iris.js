'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MsgBeginUnbonding = exports.MsgDelegate = exports.MsgSend = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _common = require('./common');

var common = _interopRequireWildcard(_common);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var MsgSend = exports.MsgSend = function () {
  function MsgSend() {
    var properties = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, MsgSend);

    this.input = properties.input || [new common.Input()];
    this.output = properties.output || [new common.Output()];
  }

  _createClass(MsgSend, null, [{
    key: 'create',
    value: function create(from, to, amount) {
      return new MsgSend({
        input: [new common.Input({ address: from, coins: [amount] })],
        output: [new common.Output({ address: to, coins: [amount] })]
      });
    }
  }]);

  return MsgSend;
}();

var MsgDelegate = exports.MsgDelegate = function () {
  function MsgDelegate() {
    var properties = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, MsgDelegate);

    this.delegatorAddr = properties.delegatorAddr || new common.AccAddress(0);
    this.validatorAddr = properties.validatorAddr || new common.AccAddress(0);
    this.delegation = properties.delegation || new common.Coin();
  }

  _createClass(MsgDelegate, null, [{
    key: 'create',
    value: function create(delegatorAddr, validatorAddr, delegation) {
      return new MsgDelegate({
        delegatorAddr: delegatorAddr,
        validatorAddr: validatorAddr,
        delegation: delegation
      });
    }
  }]);

  return MsgDelegate;
}();

var MsgBeginUnbonding = exports.MsgBeginUnbonding = function () {
  function MsgBeginUnbonding() {
    var properties = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, MsgBeginUnbonding);

    this.delegatorAddr = properties.delegatorAddr || new common.AccAddress();
    this.validatorAddr = properties.validatorAddr || new common.AccAddress();
    this.shares = properties.shares || '';
  }

  _createClass(MsgBeginUnbonding, null, [{
    key: 'create',
    value: function create(delegatorAddr, validatorAddr, shares) {
      return new MsgDelegate({
        delegatorAddr: delegatorAddr,
        validatorAddr: validatorAddr,
        shares: shares
      });
    }
  }]);

  return MsgBeginUnbonding;
}();