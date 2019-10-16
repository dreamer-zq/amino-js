'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MsgSend = exports.Output = exports.Input = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _config = require('../../config');

var _config2 = _interopRequireDefault(_config);

var _utils = require('../../utils');

var _utils2 = _interopRequireDefault(_utils);

var _type = require('../type');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Input = exports.Input = function () {
  function Input() {
    var properties = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, Input);

    this.address = properties.address || new _type.AccAddress(0);
    this.coins = properties.coins || [new _type.Coin()];
  }

  _createClass(Input, [{
    key: 'getSignBytes',
    value: function getSignBytes() {
      var msg = {
        address: this.address.toString(_config2.default.iris.bech32.accAddr),
        coins: this.coins
      };
      return _utils2.default.sortObjectKeys(msg);
    }
  }, {
    key: 'validateBasic',
    value: function validateBasic() {
      if (_utils2.default.isEmpty(this.address)) {
        throw new Error('address is empty');
      }

      if (_utils2.default.isEmpty(this.coins)) {
        throw new Error('coins is empty');
      }
    }
  }, {
    key: 'toJSON',
    value: function toJSON() {
      return {
        address: new _type.AccAddress(this.address).toString(_config2.default.iris.bech32.accAddr),
        coins: this.coins
      };
    }
  }]);

  return Input;
}();

var Output = exports.Output = function () {
  function Output() {
    var properties = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, Output);

    this.address = properties.address || new _type.AccAddress(0);
    this.coins = properties.coins || [new _type.Coin()];
  }

  _createClass(Output, [{
    key: 'getSignBytes',
    value: function getSignBytes() {
      var msg = {
        address: this.address.toString(_config2.default.iris.bech32.accAddr),
        coins: this.coins
      };
      return _utils2.default.sortObjectKeys(msg);
    }
  }, {
    key: 'validateBasic',
    value: function validateBasic() {
      if (_utils2.default.isEmpty(this.address)) {
        throw new Error('address is empty');
      }

      if (_utils2.default.isEmpty(this.coins)) {
        throw new Error('coins is empty');
      }
    }
  }, {
    key: 'toJSON',
    value: function toJSON() {
      return {
        address: new _type.AccAddress(this.address).toString(_config2.default.iris.bech32.accAddr),
        coins: this.coins
      };
    }
  }]);

  return Output;
}();

var MsgSend = exports.MsgSend = function (_Msg) {
  _inherits(MsgSend, _Msg);

  function MsgSend() {
    var properties = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, MsgSend);

    var _this = _possibleConstructorReturn(this, (MsgSend.__proto__ || Object.getPrototypeOf(MsgSend)).call(this));

    _this.input = properties.input || [new Input()];
    _this.output = properties.output || [new Output()];
    return _this;
  }

  _createClass(MsgSend, [{
    key: 'getSignBytes',
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
        inputs: inputs,
        outputs: outputs
      };

      return _utils2.default.sortObjectKeys(msg);
    }
  }, {
    key: 'validateBasic',
    value: function validateBasic() {
      if (_utils2.default.isEmpty(this.input)) {
        throw new Error('sender is  empty');
      }
      if (_utils2.default.isEmpty(this.output)) {
        throw new Error('sender is  empty');
      }

      this.input.forEach(function (input) {
        input.validateBasic();
      });

      this.output.forEach(function (output) {
        output.validateBasic();
      });
    }
  }], [{
    key: 'create',
    value: function create(from, to, amount) {
      return new MsgSend({
        input: [new Input({ address: from, coins: amount })],
        output: [new Output({ address: to, coins: amount })]
      });
    }
  }]);

  return MsgSend;
}(_type.Msg);