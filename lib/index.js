'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Codec = exports.COSMOS = exports.IRIS = undefined;
exports.setNetwork = setNetwork;

var _iris = require('./msg/iris');

var iris = _interopRequireWildcard(_iris);

var _cosmos = require('./msg/cosmos');

var cosmos = _interopRequireWildcard(_cosmos);

var _config = require('./config');

var _config2 = _interopRequireDefault(_config);

var _codec = require('./codec');

var amino = _interopRequireWildcard(_codec);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var codec = amino.default;
codec.registerConcrete(iris.StdTx, _config2.default.iris.model.stdTx);
codec.registerConcrete(iris.MsgSend, _config2.default.iris.model.msgSend);
codec.registerConcrete(iris.MsgDelegate, _config2.default.iris.model.msgDelegate);

var IRIS = exports.IRIS = iris;
var COSMOS = exports.COSMOS = cosmos;
var Codec = exports.Codec = codec;

function setNetwork(network) {
    if (network && network === 'testnet') {
        _config2.default.iris.bech32 = {
            accAddr: "faa",
            valAddr: "fva",
            accPub: "fap"
        };
    }
}