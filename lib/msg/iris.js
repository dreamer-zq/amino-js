"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MsgBeginUnbonding = exports.MsgDelegate = exports.MsgSend = exports.Output = exports.Input = exports.Coin = exports.StdSignature = exports.StdFee = exports.StdTx = exports.AccAddress = exports.SignatureSecp256k1 = exports.PubKeySecp256k1 = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _utils = require("../utils");

var _utils2 = _interopRequireDefault(_utils);

var _bech = require("bech32");

var Bech32 = _interopRequireWildcard(_bech);

var _config = require("../config");

var _config2 = _interopRequireDefault(_config);

var _index = require("../index");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

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

    return _possibleConstructorReturn(this, (AccAddress.__proto__ || Object.getPrototypeOf(AccAddress)).call(this, data));
  }

  return AccAddress;
}(Buffer);

var StdTx = exports.StdTx = function StdTx() {
  var properties = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  _classCallCheck(this, StdTx);

  this.msgs = properties.msgs || [];
  this.fee = properties.fee || new StdFee();
  this.signatures = properties.signatures || new StdSignature();
  this.memo = properties.memo || '';
};

var StdFee = exports.StdFee = function StdFee(amount, gas) {
  _classCallCheck(this, StdFee);

  this.amount = amount || [new Coin()];
  this.gas = gas || 0;
};

var StdSignature = exports.StdSignature = function StdSignature(pub_key, signature, account_number, sequence) {
  _classCallCheck(this, StdSignature);

  this.pub_key = pub_key || PubKeySecp256k1.alloc(0);
  this.signature = signature || [SignatureSecp256k1.alloc(0)];
  this.account_number = account_number || 0;
  this.sequence = sequence || 0;
};

var Coin = exports.Coin = function Coin(denom, amount) {
  _classCallCheck(this, Coin);

  this.denom = denom || '';
  this.amount = amount || '';
};

var Input = exports.Input = function () {
  function Input() {
    var properties = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, Input);

    this.address = properties.address || new AccAddress(0);
    this.coins = properties.coins || [new Coin()];
  }

  _createClass(Input, [{
    key: "getSignBytes",
    value: function getSignBytes() {
      var strByte = Bech32.toWords(this.address);
      var msg = {
        "address": Bech32.encode(_config2.default.iris.bech32.accAddr, strByte),
        "coins": this.coins
      };
      return _utils2.default.sortObjectKeys(msg);
    }
  }, {
    key: "validateBasic",
    value: function validateBasic() {
      if (_utils2.default.isEmpty(this.address)) {
        throw new Error("address is empty");
      }

      if (_utils2.default.isEmpty(this.coins)) {
        throw new Error("coins is empty");
      }
    }
  }]);

  return Input;
}();

var Output = exports.Output = function () {
  function Output() {
    var properties = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, Output);

    this.address = properties.address || new AccAddress(0);
    this.coins = properties.coins || [new Coin()];
  }

  _createClass(Output, [{
    key: "getSignBytes",
    value: function getSignBytes() {
      var strByte = Bech32.toWords(this.address);
      var msg = {
        "address": Bech32.encode(_config2.default.iris.bech32.accAddr, strByte),
        "coins": this.coins
      };
      return _utils2.default.sortObjectKeys(msg);
    }
  }, {
    key: "validateBasic",
    value: function validateBasic() {
      if (_utils2.default.isEmpty(this.address)) {
        throw new Error("address is empty");
      }

      if (_utils2.default.isEmpty(this.coins)) {
        throw new Error("coins is empty");
      }
    }
  }]);

  return Output;
}();

var MsgSend = exports.MsgSend = function () {
  function MsgSend() {
    var properties = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, MsgSend);

    this.input = properties.input || [new Input()];
    this.output = properties.output || [new Output()];
  }

  _createClass(MsgSend, [{
    key: "getSignBytes",
    value: function getSignBytes() {
      var inputs = [];
      var outputs = [];
      this.input.forEach(function (item) {
        inputs.push(item.getSignBytes());
      });
      this.output.forEach(function (item) {
        outputs.push(item.getSignBytes());
      });
      var msg = {
        "inputs": inputs,
        "outputs": outputs
      };

      return _utils2.default.sortObjectKeys(msg);
    }
  }, {
    key: "validateBasic",
    value: function validateBasic() {
      if (_utils2.default.isEmpty(this.input)) {
        throw new Error("sender is  empty");
      }
      if (_utils2.default.isEmpty(this.output)) {
        throw new Error("sender is  empty");
      }

      this.input.forEach(function (input) {
        input.validateBasic();
      });

      this.output.forEach(function (output) {
        output.validateBasic();
      });
    }
  }], [{
    key: "create",
    value: function create(from, to, amount) {
      return new MsgSend({
        input: [new Input({ address: from, coins: amount })],
        output: [new Output({ address: to, coins: amount })]
      });
    }
  }]);

  return MsgSend;
}();

var MsgDelegate = exports.MsgDelegate = function () {
  function MsgDelegate() {
    var properties = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, MsgDelegate);

    this.delegatorAddr = properties.delegatorAddr || new AccAddress(0);
    this.validatorAddr = properties.validatorAddr || new AccAddress(0);
    this.delegation = properties.delegation || new Coin();
  }

  _createClass(MsgDelegate, [{
    key: "getSignBytes",
    value: function getSignBytes() {
      var msg = _index.Codec.marshalJSON(this);
      var delegator = Bech32.toWords(this.delegatorAddr);
      var validator = Bech32.toWords(this.validatorAddr);
      msg.value = {
        "delegator_addr": Bech32.encode(_config2.default.iris.bech32.accAddr, delegator),
        "validator_addr": Bech32.encode(_config2.default.iris.bech32.valAddr, validator),
        "delegation": this.delegation
      };
      return _utils2.default.sortObjectKeys(msg);
    }
  }, {
    key: "validateBasic",
    value: function validateBasic() {
      if (_utils2.default.isEmpty(this.delegatorAddr)) {
        throw new Error("delegatorAddr is empty");
      }

      if (_utils2.default.isEmpty(this.validatorAddr)) {
        throw new Error("validatorAddr is empty");
      }

      if (_utils2.default.isEmpty(this.delegation)) {
        throw new Error("delegation must great than 0");
      }
    }
  }], [{
    key: "create",
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

    this.delegatorAddr = properties.delegatorAddr || new AccAddress();
    this.validatorAddr = properties.validatorAddr || new AccAddress();
    this.shares = properties.shares || '';
  }

  _createClass(MsgBeginUnbonding, [{
    key: "getSignBytes",
    value: function getSignBytes() {
      var msg = _index.Codec.marshalJSON(this);
      var delegator = Bech32.toWords(this.delegatorAddr);
      var validator = Bech32.toWords(this.validatorAddr);
      msg.value = {
        "delegator_addr": Bech32.encode(_config2.default.iris.bech32.accAddr, delegator),
        "validator_addr": Bech32.encode(_config2.default.iris.bech32.valAddr, validator),
        "shares_amount": this.shares
      };
    }
  }, {
    key: "validateBasic",
    value: function validateBasic() {
      if (_utils2.default.isEmpty(this.delegatorAddr)) {
        throw new Error("delegatorAddr is empty");
      }

      if (_utils2.default.isEmpty(this.validatorAddr)) {
        throw new Error("validatorAddr is empty");
      }

      if (_utils2.default.isEmpty(this.shares)) {
        throw new Error("shares must great than 0");
      }
    }
  }], [{
    key: "create",
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