'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MsgDeposit = undefined;

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

var MsgDeposit = exports.MsgDeposit = function (_Msg) {
  _inherits(MsgDeposit, _Msg);

  function MsgDeposit() {
    var properties = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, MsgDeposit);

    var _this = _possibleConstructorReturn(this, (MsgDeposit.__proto__ || Object.getPrototypeOf(MsgDeposit)).call(this));

    _this.proposalID = properties.proposalID || 0;
    _this.depositor = properties.depositor || new _type.AccAddress(0);
    _this.amount = properties.amount || new _type.Coin();
    return _this;
  }

  _createClass(MsgDeposit, [{
    key: 'getSignBytes',
    value: function getSignBytes() {
      var msg = _index.Codec.marshalJSON(this); // TODO
      msg.value = {
        proposal_id: this.proposalID,
        depositor: this.depositor.toString(_config2.default.iris.bech32.accAddr),
        amount: this.amount
      };
      return _utils2.default.sortObjectKeys(msg);
    }
  }, {
    key: 'validateBasic',
    value: function validateBasic() {
      if (_utils2.default.isEmpty(this.proposalID)) {
        throw new Error('proposalID is empty');
      }

      if (_utils2.default.isEmpty(this.depositor)) {
        throw new Error('depositor is empty');
      }

      if (_utils2.default.isEmpty(this.amount)) {
        throw new Error('amount must great than 0');
      }
    }
  }, {
    key: 'toJSON',
    value: function toJSON() {
      return {
        proposalID: this.proposalID,
        depositor: new _type.AccAddress(this.depositor).toString(_config2.default.iris.bech32.accAddr),
        amount: this.amount
      };
    }
  }], [{
    key: 'create',
    value: function create(proposalID, depositor, amount) {
      return new MsgDeposit({
        proposalID: proposalID,
        depositor: depositor,
        amount: amount
      });
    }
  }]);

  return MsgDeposit;
}(_type.Msg);