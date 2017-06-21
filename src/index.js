const Koa = require('koa');
const app = new Koa();
const koaBody = require('koa-body');

app.use(koaBody());
app.use(require('./middleware/routes'));
app.use(require('./middleware/serve'));

app.listen(8000);

console.log('Server started on :8000');