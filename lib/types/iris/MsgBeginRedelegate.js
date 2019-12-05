'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MsgBeginRedelegate = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _config = require('../../config');

var _config2 = _interopRequireDefault(_config);

var _utils = require('../../utils');

var _utils2 = _interopRequireDefault(_utils);

var _type = require('../type');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var MsgBeginRedelegate = exports.MsgBeginRedelegate = function (_Msg) {
  _inherits(MsgBeginRedelegate, _Msg);

  function MsgBeginRedelegate() {
    var properties = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, MsgBeginRedelegate);

    var _this = _possibleConstructorReturn(this, (MsgBeginRedelegate.__proto__ || Object.getPrototypeOf(MsgBeginRedelegate)).call(this));

    _this.delegatorAddr = properties.delegatorAddr || new _type.AccAddress();
    _this.validatorSrcAddr = properties.validatorSrcAddr || new _type.AccAddress();
    _this.validatorDstAddr = properties.validatorDstAddr || new _type.AccAddress();
    _this.sharesAmount = properties.sharesAmount || '';
    return _this;
  }

  _createClass(MsgBeginRedelegate, [{
    key: 'getSignBytes',
    value: function getSignBytes() {
      return {
        delegator_addr: this.delegatorAddr.toString(_config2.default.iris.bech32.accAddr),
        validator_src_addr: this.validatorSrcAddr.toString(_config2.default.iris.bech32.valAddr),
        validator_dst_addr: this.validatorDstAddr.toString(_config2.default.iris.bech32.valAddr),
        shares: this.sharesAmount
      };
    }
  }, {
    key: 'validateBasic',
    value: function validateBasic() {
      if (_utils2.default.isEmpty(this.delegatorAddr)) {
        throw new Error('delegatorAddr is empty');
      }

      if (_utils2.default.isEmpty(this.validatorSrcAddr)) {
        throw new Error('validatorSrcAddr is empty');
      }

      if (_utils2.default.isEmpty(this.validatorDstAddr)) {
        throw new Error('validatorDstAddr is empty');
      }

      if (_utils2.default.isEmpty(this.sharesAmount)) {
        throw new Error('sharesAmount must great than 0');
      }
    }
  }, {
    key: 'toJSON',
    value: function toJSON() {
      return {
        delegatorAddr: new _type.AccAddress(this.delegatorAddr).toString(_config2.default.iris.bech32.accAddr),
        validatorSrcAddr: new _type.AccAddress(this.validatorSrcAddr).toString(_config2.default.iris.bech32.valAddr),
        validatorDstAddr: new _type.AccAddress(this.validatorDstAddr).toString(_config2.default.iris.bech32.valAddr),
        sharesAmount: this.sharesAmount
      };
    }
  }], [{
    key: 'create',
    value: function create(delegatorAddr, validatorSrcAddr, validatorDstAddr, sharesAmount) {
      return new MsgBeginRedelegate({
        delegatorAddr: delegatorAddr,
        validatorSrcAddr: validatorSrcAddr,
        validatorDstAddr: validatorDstAddr,
        sharesAmount: sharesAmount
      });
    }
  }, {
    key: 'getType',
    value: function getType() {
      return "irishub/stake/BeginRedelegate";
    }
  }]);

  return MsgBeginRedelegate;
}(_type.Msg);