"use strict";

const Bloggify = require("bloggify")
    , SocketIO = require("socket.io")
    , deffy = require("deffy")

/**
 * bloggifyWs
 * Websockets for Bloggify Actions!
 *
 * @name bloggifyWs
 * @function
 * @param {Number} a Param descrpition.
 * @param {Number} b Param descrpition.
 * @return {Number} Return description.
 */
module.exports = config => {
    const WsAction = require("./common/ws-action")
        , Actions = Bloggify.actions
        , common = require("bloggify/lib/client/common")

    if (!Actions) {
        Bloggify.log("No actions found. Websockets will not be enabled.", "warn")
        return
    }

    Actions.ws = (name, middlewares, handler) => {
        if (typeof middlewares === "function") {
            handler = middlewares
            middlewares = []
        }
        middlewares = deffy(middlewares, [])
        let thisWsAction = Actions.ws._[name]
        if (thisWsAction && (middlewares.length || handler)) {
            throw new Error("There is already a WS action with this name.")
        }

        const url = common.wsUrl(name)
        const ws = Actions.ws.server.of(url)

        middlewares.forEach(c => { ws.use(c); })

        if (handler) {
            ws.on("connect", socket => {
                socket.on("__data", (err, data) => {
                    handler(err, data, socket, (err, data) => {
                        socket.emit("__data", err, data)
                    })
                })
            })
        }

        thisWsAction = Actions.ws._[name] = new WsAction(name, ws)
        setInterval(() => { thisWsAction.heartbeat() }, 50 * 1000)

        return thisWsAction
    }

    Actions.ws._ = {}
    Bloggify.wsServer = Actions.ws.server = SocketIO(Bloggify.server.server)
};
