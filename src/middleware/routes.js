const Router = require('koa-router');
const handleSms = require('../handler/handleSms');

module.exports = function(ctx, next) {
  let router = new Router();
  router.post('/sms', (ctx, next) => {
    if (!ctx.request.body.phone || !ctx.request.body.message || ctx.request.body.message.length === 0) {
      ctx.response.status = 400;
      ctx.response.body = "We are missing phone or message.";
      return next(new Error('missing input', 400));
    }
    return handleSms.handle(
      ctx.request.body.phone,
      ctx.request.body.message
    )
      .then(_ => {
        ctx.response.status = 200;
        ctx.response.body = "Success! Your message has been sent";
        return next()
      }, e => {
        console.log('input', {phone: ctx.request.body.phone, message: ctx.request.body.message});
        ctx.response.status = 500;
        ctx.response.body = "We are not able to send your message at the moment. Please try again later";
        return next(e);
      });
  });

  return router.routes()(ctx, next);
};