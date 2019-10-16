'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Type = exports.Codec = exports.IRIS = undefined;
exports.setNetwork = setNetwork;

var _iris = require('./msg/iris');

var iris = _interopRequireWildcard(_iris);

var _config = require('./config');

var _config2 = _interopRequireDefault(_config);

var _codec = require('./codec');

var amino = _interopRequireWildcard(_codec);

var _type = require('./msg/type');

var type = _interopRequireWildcard(_type);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var codec = amino.default;
// import * as cosmos from './msg/cosmos'

codec.registerConcrete(iris.StdTx, _config2.default.iris.type.StdTx);
codec.registerConcrete(iris.MsgSend, _config2.default.iris.type.MsgSend);
codec.registerConcrete(iris.MsgDelegate, _config2.default.iris.type.MsgDelegate);
codec.registerConcrete(iris.MsgBeginUnbonding, _config2.default.iris.type.MsgBeginUnbonding);
codec.registerConcrete(iris.MsgBeginRedelegate, _config2.default.iris.type.MsgBeginRedelegate);
codec.registerConcrete(iris.MsgWithdrawDelegatorRewardsAll, _config2.default.iris.type.MsgWithdrawDelegationRewardsAll);
codec.registerConcrete(iris.MsgWithdrawDelegatorReward, _config2.default.iris.type.MsgWithdrawDelegationReward);
codec.registerConcrete(iris.MsgDeposit, _config2.default.iris.type.MsgDeposit);
codec.registerConcrete(iris.MsgVote, _config2.default.iris.type.MsgVote);

var IRIS = exports.IRIS = iris;
// export const COSMOS = cosmos
var Codec = exports.Codec = codec;
var Type = exports.Type = type;

function setNetwork(network) {
  if (network && network === 'testnet') {
    _config2.default.iris.bech32 = {
      accAddr: 'faa',
      valAddr: 'fva',
      accPub: 'fap'
    };
  }
}