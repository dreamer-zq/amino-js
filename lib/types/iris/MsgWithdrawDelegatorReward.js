'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MsgWithdrawDelegatorReward = undefined;

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

var MsgWithdrawDelegatorReward = exports.MsgWithdrawDelegatorReward = function (_Msg) {
  _inherits(MsgWithdrawDelegatorReward, _Msg);

  function MsgWithdrawDelegatorReward() {
    var properties = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, MsgWithdrawDelegatorReward);

    var _this = _possibleConstructorReturn(this, (MsgWithdrawDelegatorReward.__proto__ || Object.getPrototypeOf(MsgWithdrawDelegatorReward)).call(this));

    _this.delegatorAddr = properties.delegatorAddr || new _type.AccAddress();
    _this.validatorAddr = properties.validatorAddr || new _type.AccAddress();
    return _this;
  }

  _createClass(MsgWithdrawDelegatorReward, [{
    key: 'getSignBytes',
    value: function getSignBytes() {
      var msg = _index.Codec.marshalJSON(this); // TODO
      msg.value = {
        delegator_addr: this.delegatorAddr.toString(_config2.default.iris.bech32.accAddr),
        validator_addr: this.validatorAddr.toString(_config2.default.iris.bech32.valAddr)
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
    }
  }, {
    key: 'toJSON',
    value: function toJSON() {
      return {
        delegatorAddr: new _type.AccAddress(this.delegatorAddr).toString(_config2.default.iris.bech32.accAddr),
        validatorAddr: new _type.AccAddress(this.validatorAddr).toString(_config2.default.iris.bech32.valAddr)
      };
    }
  }], [{
    key: 'create',
    value: function create(delegatorAddr, validatorAddr, delegation) {
      return new MsgWithdrawDelegatorReward({
        delegatorAddr: delegatorAddr,
        validatorAddr: validatorAddr
      });
    }
  }, {
    key: 'getType',
    value: function getType() {
      return "irishub/distr/MsgWithdrawDelegationReward";
    }
  }]);

  return MsgWithdrawDelegatorReward;
}(_type.Msg);