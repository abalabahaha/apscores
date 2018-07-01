"use strict";

const KoaBody = require("koa-body");
const KoaRouter = require("koa-router");
const Koa2Ratelimit = require("koa2-ratelimit").RateLimit;

const APEController = require("../controller/ape");
const CBAuthMiddleware = require("../middleware/cbauth");
const CBController = require("../controller/cb");
const IndexController = require("../controller/index");

const bodyParserMiddleware = KoaBody({
    json:       true,
    jsonLimit:  "512kb",
    multipart:  false,
    text:       false,
    urlencoded: false
});

const loginRatelimitMiddleware = Koa2Ratelimit.middleware({
    interval: {
        ms: 5000
    },
    max: 1,
    message: "Too many login attempts, try again in a bit.",
    prefixKey: "cb/login"
});
const termsRatelimitMiddleware = Koa2Ratelimit.middleware({
    interval: {
        ms: 2000
    },
    max: 1,
    message: "Too many requests, try again in a bit.",
    prefixKey: "cb/terms"
});
const apeScoreRatelimitMiddleware = Koa2Ratelimit.middleware({
    interval: {
        ms: 2000
    },
    max: 1,
    message: "Too many score requests, try again in a bit.",
    prefixKey: "cb/scores/ape"
});

const router = new KoaRouter({
    prefix: "/api/v1"
});
router
    .delete("/", IndexController.delete)
    .get("/", IndexController.get);

const cbRouter = new KoaRouter();
cbRouter
    .post("/login", loginRatelimitMiddleware, bodyParserMiddleware, CBController.login)

    .post("/logout", loginRatelimitMiddleware, bodyParserMiddleware, CBAuthMiddleware, CBController.logout)

    .post("/numbers", termsRatelimitMiddleware, bodyParserMiddleware, CBAuthMiddleware, APEController.postNumbers)

    .post("/terms", termsRatelimitMiddleware, bodyParserMiddleware, CBAuthMiddleware, APEController.postTerms)

    .post("/scores/ape", apeScoreRatelimitMiddleware, bodyParserMiddleware, CBAuthMiddleware, APEController.getScores);
router.use("/cb", cbRouter.routes());

module.exports = router;
