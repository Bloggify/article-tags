"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var DATA_EVENT = "__data";

module.exports = function () {
    function WsAction(name, socket) {
        _classCallCheck(this, WsAction);

        this.name = name;
        this.socket = socket;
    }

    _createClass(WsAction, [{
        key: "write",
        value: function write(err, data) {
            this.socket.emit(DATA_EVENT, err, data);return this;
        }
    }, {
        key: "data",
        value: function data(_data) {
            this.socket.emit(DATA_EVENT, null, _data);return this;
        }
    }, {
        key: "error",
        value: function error(err, data) {
            this.socket.emit(DATA_EVENT, err, data);return this;
        }
    }, {
        key: "on",
        value: function on(event, cb) {
            this.socket.on(event, cb);return this;
        }
    }, {
        key: "emit",
        value: function emit(name) {
            var _socket;

            for (var _len = arguments.length, data = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
                data[_key - 1] = arguments[_key];
            }

            (_socket = this.socket).emit.apply(_socket, [name].concat(data));return this;
        }
    }, {
        key: "heartbeat",
        value: function heartbeat() {
            this.socket.emit("heartbeat");return this;
        }
    }]);

    return WsAction;
}();