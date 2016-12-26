function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const ObjectId = require('mongodb').ObjectID;

class Model {
  constructor(db, collectionName) {
    this.name = collectionName;
    this.db = db;
  }

  insertOne(data) {
    var _this = this;

    return _asyncToGenerator(function* () {
      const operation = yield _this.db.collection(_this.name).insertOne(data);
      if (operation.result.ok !== 1 || operation.ops.length !== 1) {
        throw new Error('Db insertOne error');
      }
      return operation.ops[0];
    })();
  }

  findOneById(id) {
    var _this2 = this;

    return _asyncToGenerator(function* () {
      let query = {
        _id: ObjectId(id)
      };
      const result = yield _this2.db.collection(_this2.name).findOne(query);
      if (!result) {
        throw new Error('Db findOneById error');
      }
      return result;
    })();
  }

  findOneAndUpdate(id, data) {
    var _this3 = this;

    return _asyncToGenerator(function* () {
      const query = { _id: ObjectId(id) };
      const modifier = { $set: data };
      const options = { returnOriginal: false };
      const operation = yield _this3.db.collection(_this3.name).findOneAndUpdate(query, modifier, options);
      if (!operation.value) {
        throw new Error('Db findOneAndUpdate error');
      }
      return operation.value;
    })();
  }

  removeOne(id) {
    var _this4 = this;

    return _asyncToGenerator(function* () {
      const query = { _id: ObjectId(id) };
      const operation = yield _this4.db.collection(_this4.name).remove(query);
      if (operation.result.n !== 1) {
        throw new Error('Db remove error');
      }
      return { success: true };
    })();
  }
}

module.exports = Model;