function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const Koa = require('koa');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const config = require('config');
const handleErrors = require('./middlewares/handleErrors');
const db = require('./db');

const app = new Koa();
const router = new Router();

app.use(handleErrors);
app.use(bodyParser());

router.get('/error/test', _asyncToGenerator(function* () {
  throw Error('Error handling works!');
}));

router.get('/', ctx => ctx.body = { hello: 'world' });

router.post('/birds', (() => {
  var _ref2 = _asyncToGenerator(function* (ctx, next) {
    const data = ctx.request.body;
    ctx.body = yield db.Bird.insertOne(data);
  });

  return function (_x, _x2) {
    return _ref2.apply(this, arguments);
  };
})());

router.get('/birds/:id', (() => {
  var _ref3 = _asyncToGenerator(function* (ctx, next) {
    const id = ctx.params.id;
    ctx.body = yield db.Bird.findOneById(id);
  });

  return function (_x3, _x4) {
    return _ref3.apply(this, arguments);
  };
})());

router.put('/birds/:id', (() => {
  var _ref4 = _asyncToGenerator(function* (ctx, next) {
    const id = ctx.params.id;
    const data = ctx.request.body;
    ctx.body = yield db.Bird.findOneAndUpdate(id, data);
  });

  return function (_x5, _x6) {
    return _ref4.apply(this, arguments);
  };
})());

router.del('/birds/:id', (() => {
  var _ref5 = _asyncToGenerator(function* (ctx, next) {
    const id = ctx.params.id;
    ctx.body = yield db.Bird.removeOne(id);
  });

  return function (_x7, _x8) {
    return _ref5.apply(this, arguments);
  };
})());

app.use(router.routes());

db.connect().then(() => {
  app.listen(config.port, () => {
    console.info(`Listen to http://localhost:${ config.port }`);
  });
}).catch(err => {
  console.error('ERR:', err);
});