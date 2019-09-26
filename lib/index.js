"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.codec = exports.COSMOS = exports.IRIS = undefined;

var _iris = require("./msg/iris");

var iris = _interopRequireWildcard(_iris);

var _cosmos = require("./msg/cosmos");

var cosmos = _interopRequireWildcard(_cosmos);

var _common = require("./msg/common");

var common = _interopRequireWildcard(_common);

var _amino = require("./amino");

var _amino2 = _interopRequireDefault(_amino);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var IRIS = exports.IRIS = iris;
_amino2.default.registerConcrete(common.StdTx, 'irishub/bank/StdTx');
_amino2.default.registerConcrete(IRIS.MsgSend, 'irishub/bank/Send');
_amino2.default.registerConcrete(IRIS.MsgDelegate, 'irishub/stake/MsgDelegate');

var COSMOS = exports.COSMOS = cosmos;

var codec = exports.codec = _amino2.default;