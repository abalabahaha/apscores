"use strict";

const ToughCookie = require("tough-cookie");

const AuthUtil = require("../util/auth");

module.exports = async(ctx, next) => {
    if(!ctx.request || !ctx.request.body || typeof ctx.request.body.session !== "string") {
        ctx.throw(401, "Authorization required");
    }

    try {
        let session = AuthUtil.decode(ctx.request.body.session);
        ctx.state.session = ToughCookie.CookieJar.deserializeSync(session);
    } catch(err) {
        ctx.throw(401, "Invalid token");
    }

    await next();
};
