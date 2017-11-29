"use strict";

///// Client (browser)
const ws = require("../lib");

const action = ws("my-action", (err, data, cb) => {
    if (err) {
        /* The server sent an error */
        /* Or got disconnected (e.g. server down, internet down) */
    }

    /* do something with data coming from the server */
    ...

    /* Send something back to the server */
    cb(null, {
        foo: "bar"
    })
})

// Send data to the server
action.data(...)

// Send an error to the server
action.error(...)

///// Client (browser)
const action = Bloggify.actions.ws("my-action", (err, data, cb) => {
    if (err) {
        /* The client sent an error */
    }

    /* do something with data coming from the client */
    ...

    /* Send something back to the client */
    cb(null, {
        foo: "bar"
    })
})

// Send data to the client
action.data(...)

// Send an error to the client
action.error(...)
