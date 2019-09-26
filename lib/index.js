'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AMINO = exports.COSMOS = exports.IRIS = undefined;

var _iris = require('./msg/iris');

var iris = _interopRequireWildcard(_iris);

var _cosmos = require('./msg/cosmos');

var cosmos = _interopRequireWildcard(_cosmos);

var _common = require('./msg/common');

var common = _interopRequireWildcard(_common);

var _codec = require('./codec');

var _codec2 = _interopRequireDefault(_codec);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

_codec2.default.registerConcrete(common.StdTx, 'irishub/bank/StdTx');
_codec2.default.registerConcrete(iris.MsgSend, 'irishub/bank/Send');
_codec2.default.registerConcrete(iris.MsgDelegate, 'irishub/stake/MsgDelegate');

var IRIS = exports.IRIS = iris;
var COSMOS = exports.COSMOS = cosmos;
var AMINO = exports.AMINO = _codec2.default;