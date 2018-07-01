"use strict";

const Koa = require("koa");
const KoaCORS = require("@koa/cors");
const Koa2Validator = require("koa2-validator");

const ErrorMiddleware = require("./src/middleware/error");
const RouterV1 = require("./src/router/v1");

const app = new Koa();

// app.use(LogMiddleware); // TODO
app.use(ErrorMiddleware);
app.use(KoaCORS({
    allowHeaders: ["Authorization", "Content-Type"],
    allowMethods: ["GET", "HEAD", "POST"],
    maxAge: 600,
    // origin: "https://apstudents.net"
}));
app.use(Koa2Validator({
    customValidators: {
        isArray(arr) {
            return Array.isArray(arr);
        }
    }
}));
app.use(RouterV1.routes());
app.use(RouterV1.allowedMethods());

const port = process.env.PORT || 3001;
app.listen(port, () => {
    console.log(`Listening: 0.0.0.0:${port}`);
});
