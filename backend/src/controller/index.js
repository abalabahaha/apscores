"use strict";

module.exports.delete = async(ctx, next) => {
    // console.log("Someone did DELETE /");

    ctx.body = {
        error: "Sorry, teapots are invincible"
    };
    ctx.status = 418;

    await next();
};

module.exports.get = async(ctx, next) => {
    ctx.body = {
        v: 1
    };

    await next();
};
