"use strict";

var common = require("bloggify/actions/common"),
    WsAction = require("./common/ws-action"),
    SocketIO = require("socket.io-client");

module.exports = function (name, handler) {
    var socket = SocketIO.connect(common.wsUrl(name));
    var action = new WsAction(name, socket);
    if (handler) {
        var send = function send(err, data) {
            socket.emit("__data", err, data);
        };
        socket.on("error", function (err) {
            handler(err, null, socket, send);
        });
        socket.on("__data", function (err, data) {
            handler(err, data, socket, send);
        });
    }
    return action;
};