"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Utils = function () {
    function Utils() {
        _classCallCheck(this, Utils);
    }

    _createClass(Utils, null, [{
        key: "sortObjectKeys",
        value: function sortObjectKeys(obj) {
            var sort = function sort(obj) {
                var tmp = {};
                Object.keys(obj).sort().forEach(function (k) {
                    if (Array.isArray(obj[k])) {
                        var p = [];
                        obj[k].forEach(function (item) {
                            if (item != null && (typeof item === "undefined" ? "undefined" : _typeof(item)) === "object") {
                                p.push(sort(item));
                            } else {
                                p.push(item);
                            }
                        });
                        tmp[k] = p;
                    } else if (obj[k] != null && _typeof(obj[k]) === "object") {
                        tmp[k] = sort(obj[k]);
                    } else if (obj[k] != null && typeof obj[k] === "function") {
                        tmp[k] = evil(obj[k].toString());
                    } else if (obj[k] != null && typeof obj[k] === "boolean") {
                        tmp[k] = obj[k];
                    } else {
                        tmp[k] = new String(obj[k]).toString();
                    }
                });
                return tmp;
            };
            return sort(obj);
        }
    }, {
        key: "isEmpty",
        value: function isEmpty(obj) {
            switch (typeof obj === "undefined" ? "undefined" : _typeof(obj)) {
                case "undefined":
                    {
                        return true;
                    }
                case "string":
                    {
                        return obj.length === 0;
                    }
                case "number":
                    {
                        return obj === 0;
                    }
                case "object":
                    {
                        if (obj == null) {
                            return true;
                        } else if (Array.isArray(obj)) {
                            return obj.length === 0;
                        } else {
                            return Object.keys(obj).length === 0;
                        }
                    }
            }
        }
    }]);

    return Utils;
}();

exports.default = Utils;
;

function evil(fn) {
    var Fn = Function;
    return new Fn('return ' + fn)();
}