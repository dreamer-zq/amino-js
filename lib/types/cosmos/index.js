'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _MsgSend = require('./MsgSend');

Object.keys(_MsgSend).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _MsgSend[key];
    }
  });
});

var _StdTx = require('./StdTx');

Object.keys(_StdTx).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _StdTx[key];
    }
  });
});