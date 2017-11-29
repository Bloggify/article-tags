"use strict";

var Bloggify = require("bloggify"),
    SocketIO = require("socket.io"),
    deffy = require("deffy");

module.exports = function () {
    var WsAction = require("./common/ws-action"),
        Actions = Bloggify.actions,
        common = require("bloggify/lib/client/common");

    if (!Actions) {
        Bloggify.log("No actions found. Websockets will not be enabled.", "warn");
        return;
    }

    Actions.ws = function (name, middlewares, handler) {
        if (typeof middlewares === "function") {
            handler = middlewares;
            middlewares = [];
        }
        middlewares = deffy(middlewares, []);
        var thisWsAction = Actions.ws._[name];
        if (thisWsAction && (middlewares.length || handler)) {
            throw new Error("There is already a WS action with this name.");
        }

        var url = common.wsUrl(name);
        var ws = Actions.ws.server.of(url);

        middlewares.forEach(function (c) {
            ws.use(c);
        });

        if (handler) {
            ws.on("connect", function (socket) {
                socket.on("__data", function (err, data) {
                    handler(err, data, socket, function (err, data) {
                        socket.emit("__data", err, data);
                    });
                });
            });
        }

        thisWsAction = Actions.ws._[name] = new WsAction(name, ws);
        setInterval(function () {
            thisWsAction.heartbeat();
        }, 50 * 1000);

        return thisWsAction;
    };

    Actions.ws._ = {};
    Bloggify.wsServer = Actions.ws.server = SocketIO(Bloggify.server.server);
};