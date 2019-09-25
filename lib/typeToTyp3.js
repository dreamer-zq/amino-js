'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _is_js = require('is_js');

var _is_js2 = _interopRequireDefault(_is_js);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// typeToTyp3
// amino type convert
exports.default = function (type) {
  if (_is_js2.default.boolean(type)) {
    return 0;
  }

  if (_is_js2.default.number(type)) {
    if (_is_js2.default.integer(type)) {
      return 0;
    } else {
      return 1;
    }
  }

  if (_is_js2.default.string(type) || _is_js2.default.array(type) || _is_js2.default.object(type)) {
    return 2;
  }
};