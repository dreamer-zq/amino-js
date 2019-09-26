'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PubKeySecp256k1 = exports.PubKeySecp256k1 = function (_Buffer) {
  _inherits(PubKeySecp256k1, _Buffer);

  function PubKeySecp256k1(data) {
    _classCallCheck(this, PubKeySecp256k1);

    return _possibleConstructorReturn(this, (PubKeySecp256k1.__proto__ || Object.getPrototypeOf(PubKeySecp256k1)).call(this, data));
    // return createBufferProxy(this)
  }

  return PubKeySecp256k1;
}(Buffer);

var SignatureSecp256k1 = exports.SignatureSecp256k1 = function (_Buffer2) {
  _inherits(SignatureSecp256k1, _Buffer2);

  function SignatureSecp256k1(data) {
    _classCallCheck(this, SignatureSecp256k1);

    return _possibleConstructorReturn(this, (SignatureSecp256k1.__proto__ || Object.getPrototypeOf(SignatureSecp256k1)).call(this, data));
    // return createBufferProxy(this)
  }

  return SignatureSecp256k1;
}(Buffer);

var AccAddress = exports.AccAddress = function (_Buffer3) {
  _inherits(AccAddress, _Buffer3);

  function AccAddress(data) {
    _classCallCheck(this, AccAddress);

    return _possibleConstructorReturn(this, (AccAddress.__proto__ || Object.getPrototypeOf(AccAddress)).call(this, data));
    // return createBufferProxy(this)
  }

  return AccAddress;
}(Buffer);

// const createBufferProxy = (obj) =>{
//     return new Proxy(obj, {
//         get: (target, name) => {
//             switch (name) {
//                 case "toString":{
//                     return function (...args) {
//                         let result = Reflect.apply(target["toJSON"], target, []);
//                         return result.data
//                     }
//                 }
//                 case "toJSON":{
//                     return function (...args) {
//                         let result = Reflect.apply(target["toJSON"], target, []);
//                         return result.data
//                     }
//                 }
//                 case "length":{
//                     return obj.length
//                 }
//             }
//         }
//     });
// }

var StdTx = exports.StdTx = function StdTx() {
  var properties = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  _classCallCheck(this, StdTx);

  this.msgs = properties.msgs || [];
  this.fee = properties.fee || new StdFee();
  this.signatures = properties.signatures || new StdSignature();
  this.memo = properties.memo || '';
};

var StdFee = exports.StdFee = function StdFee(amount, gas) {
  _classCallCheck(this, StdFee);

  this.amount = amount || [new Coin()];
  this.gas = gas || 0;
};

var StdSignature = exports.StdSignature = function StdSignature(pub_key, signature, account_number, sequence) {
  _classCallCheck(this, StdSignature);

  this.pub_key = pub_key || PubKeySecp256k1.alloc(0);
  this.signature = signature || [SignatureSecp256k1.alloc(0)];
  this.account_number = account_number || 0;
  this.sequence = sequence || 0;
};

var Coin = exports.Coin = function Coin(denom, amount) {
  _classCallCheck(this, Coin);

  this.denom = denom || '';
  this.amount = amount || '';
};

var Input = exports.Input = function Input() {
  var properties = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  _classCallCheck(this, Input);

  this.address = properties.address || new AccAddress(0);
  this.coins = properties.coins || [new Coin()];
};

var Output = exports.Output = function Output() {
  var properties = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  _classCallCheck(this, Output);

  this.address = properties.address || new AccAddress(0);
  this.coins = properties.coins || [new Coin()];
};