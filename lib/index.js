'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Type = exports.Codec = exports.COSMOS = exports.IRIS = undefined;
exports.setNetwork = setNetwork;

var _iris = require('./types/iris');

var iris = _interopRequireWildcard(_iris);

var _cosmos = require('./types/cosmos');

var cosmos = _interopRequireWildcard(_cosmos);

var _config = require('./config');

var _config2 = _interopRequireDefault(_config);

var _codec = require('./codec');

var amino = _interopRequireWildcard(_codec);

var _type = require('./types/type');

var type = _interopRequireWildcard(_type);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var codec = amino.default;
codec.registerConcrete(iris.StdTx, iris.StdTx.getType());
codec.registerConcrete(iris.MsgSend, iris.MsgSend.getType());
codec.registerConcrete(iris.MsgDelegate, iris.MsgDelegate.getType());
codec.registerConcrete(iris.MsgBeginUnbonding, iris.MsgBeginUnbonding.getType());
codec.registerConcrete(iris.MsgBeginRedelegate, iris.MsgBeginRedelegate.getType());
codec.registerConcrete(iris.MsgWithdrawDelegatorRewardsAll, iris.MsgWithdrawDelegatorRewardsAll.getType());
codec.registerConcrete(iris.MsgWithdrawDelegatorReward, iris.MsgWithdrawDelegatorReward.getType());
codec.registerConcrete(iris.MsgDeposit, iris.MsgDeposit.getType());
codec.registerConcrete(iris.MsgVote, iris.MsgVote.getType());
codec.registerConcrete(cosmos.MsgSend, cosmos.MsgSend.getType());
codec.registerConcrete(cosmos.StdTx, cosmos.StdTx.getType());

var IRIS = exports.IRIS = iris;
var COSMOS = exports.COSMOS = cosmos;
var Codec = exports.Codec = codec;
var Type = exports.Type = type;

function setNetwork(network) {
  if (network === 'testnet') {
    _config2.default.iris.bech32 = {
      accAddr: 'faa',
      valAddr: 'fva',
      accPub: 'fap'
    };
  }
}