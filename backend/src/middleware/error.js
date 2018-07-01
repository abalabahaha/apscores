"use strict";

module.exports = (ctx, next) => {
    return next().catch((err) => {
        if(err.message === "Validation failed") {
            let array = err.array().map((failed) => `${failed.param}: ${failed.msg} (${JSON.stringify(failed.value)})`);
            ctx.status = 400;
            ctx.body = {
                error: "Invalid input",
                messages: array
            };
            return;
        }
        if(err.message.startsWith("timeout of ") && err.message.endsWith(" exceeded")) {
            ctx.status = 502;
            ctx.body = {
                error: "CollegeBoard.org is not responding, try again in a bit"
            };
            return;
        }
        if(err.custom) {
            ctx.status = err.status;
            ctx.body = {
                error: err.message,
                extra: err.extra
            };
            return;
        }
        console.error(err.stack);
        ctx.status = err.statusCode || err.status || 500;
        ctx.body = {
            error: `Internal error: ${err.message}`
        };
    });
};
