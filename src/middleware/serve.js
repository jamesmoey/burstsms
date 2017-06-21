const serveFile = require('koa-better-serve');

/**
 * Middleware Serve from public and default to index.html. 404 if file is not found.
 *
 * @param ctx
 * @param next
 * @returns {*}
 */
module.exports = function(ctx, next) {
  if (ctx.url === "/") {
    ctx.url = "/index.html";
  }
  return serveFile(__dirname + '/../../public/', '/')(ctx, next)
    .catch(_ => ctx.throw(404, "file not found"));
};