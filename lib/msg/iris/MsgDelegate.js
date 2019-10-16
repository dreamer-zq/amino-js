'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MsgDelegate = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _config = require('../../config');

var _config2 = _interopRequireDefault(_config);

var _utils = require('../../utils');

var _utils2 = _interopRequireDefault(_utils);

var _index = require('../../index');

var _type = require('../type');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var MsgDelegate = exports.MsgDelegate = function (_Msg) {
  _inherits(MsgDelegate, _Msg);

  function MsgDelegate() {
    var properties = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, MsgDelegate);

    var _this = _possibleConstructorReturn(this, (MsgDelegate.__proto__ || Object.getPrototypeOf(MsgDelegate)).call(this));

    _this.delegatorAddr = properties.delegatorAddr || new _type.AccAddress(0);
    _this.validatorAddr = properties.validatorAddr || new _type.AccAddress(0);
    _this.delegation = properties.delegation || new _type.Coin();
    return _this;
  }

  _createClass(MsgDelegate, [{
    key: 'getSignBytes',
    value: function getSignBytes() {
      var msg = _index.Codec.marshalJSON(this); // TODO
      msg.value = {
        delegator_addr: this.delegatorAddr.toString(_config2.default.iris.bech32.accAddr),
        validator_addr: this.validatorAddr.toString(_config2.default.iris.bech32.valAddr),
        delegation: this.delegation
      };
      return _utils2.default.sortObjectKeys(msg);
    }
  }, {
    key: 'validateBasic',
    value: function validateBasic() {
      if (_utils2.default.isEmpty(this.delegatorAddr)) {
        throw new Error('delegatorAddr is empty');
      }

      if (_utils2.default.isEmpty(this.validatorAddr)) {
        throw new Error('validatorAddr is empty');
      }

      if (_utils2.default.isEmpty(this.delegation)) {
        throw new Error('delegation must great than 0');
      }
    }
  }, {
    key: 'toJSON',
    value: function toJSON() {
      return {
        delegatorAddr: new _type.AccAddress(this.delegatorAddr).toString(_config2.default.iris.bech32.accAddr),
        validatorAddr: new _type.AccAddress(this.validatorAddr).toString(_config2.default.iris.bech32.valAddr),
        delegation: this.delegation
      };
    }
  }], [{
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
}(_type.Msg);