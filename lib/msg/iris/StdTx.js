'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.StdSignature = exports.StdFee = exports.StdTx = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _type = require('../type');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var StdTx = exports.StdTx = function () {
  function StdTx() {
    var properties = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, StdTx);

    this.msgs = properties.msgs || [];
    this.fee = properties.fee || new StdFee();
    this.signatures = properties.signatures || new StdSignature();
    this.memo = properties.memo || '';
  }

  _createClass(StdTx, [{
    key: 'toJSON',
    value: function toJSON() {
      return {
        msgs: this.msgs,
        fee: this.fee,
        memo: this.memo,
        signatures: this.signatures
      };
    }
  }]);

  return StdTx;
}();

var StdFee = exports.StdFee = function StdFee(amount, gas) {
  _classCallCheck(this, StdFee);

  this.amount = amount || [new _type.Coin()];
  this.gas = gas || 0;
};

var StdSignature = exports.StdSignature = function () {
  function StdSignature(pub_key, signature, account_number, sequence) {
    _classCallCheck(this, StdSignature);

    this.pub_key = pub_key || _type.PubKeySecp256k1.alloc(0);
    this.signature = signature || [_type.SignatureSecp256k1.alloc(0)];
    this.account_number = account_number || 0;
    this.sequence = sequence || 0;
  }

  _createClass(StdSignature, [{
    key: 'toJSON',
    value: function toJSON() {
      var signatures = [];
      this.signature.forEach(function (signature) {
        signatures.push(Buffer.from(signature).toString('base64'));
      });
      return {
        pub_key: Buffer.from(this.pub_key).toString('base64'),
        signature: signatures,
        account_number: this.account_number,
        sequence: this.sequence
      };
    }
  }]);

  return StdSignature;
}();