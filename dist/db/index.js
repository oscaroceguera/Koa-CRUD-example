function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const MongoClient = require('mongodb').MongoClient;
const config = require('config');
const Model = require('./model');
let db;

class Db {
  connect() {
    var _this = this;

    return _asyncToGenerator(function* () {
      if (!db) {
        db = yield MongoClient.connect(config.db.url);
        _this.Bird = new Model(db, 'birds');
      }
    })();
  }
}

module.exports = new Db();