const mongoose = require('mongoose');
const _ = require('underscore');

module.exports = (app) => {
  const header = app.systemLib.header;

  class MdlCreator {
    constructor(opt = { name: 'modelName', schema: {} }) {
      console.log('* MdlCreator started *');
      const name = opt.name;
      const schema = opt.schema;
      this.Schema = schema;
      this.protect = opt.protect ? opt.protect : undefined;// protect requests
      this.owner = opt.owner ? opt.owner : undefined;// owner id (for token)
      this.mask = opt.mask ? opt.mask : undefined;// masking fields
      this.model({ name, schema });
      this.setRouter(name);
    }

    model({ name = 'modelName', schema = {} }) {
      const Model = mongoose.model(name, schema);
      this.Model = Model;
      return Model;
    }

    setRouter(name) {
      const api = name.toLowerCase();
      this.router = {
        api: `/${api}/:id*?`,
        cb: (req, res) => {
          if (req.method === 'GET') this.getData(req, res);
          if (req.method === 'POST') this.postData(req, res);
          if (req.method === 'PUT') this.putData(req, res);
          if (req.method === 'DELETE') this.deleteData(req, res);
        },
      };
    }

    find(obj) {
      this.Model.find(obj.cond, (err, data) => {
        if (this.mask) {
          _.mapObject(data, (e) => {
            const deepData = e;
            _.each(this.mask, (de, di) => {
              if (de) deepData[di] = undefined;
            });
            return deepData;
          });
        }
        const count = data ? data.length : 0;
        if (!err && data.length > 0) header.status200(obj.req, obj.res, data, count);
        else header.status404(obj.req, obj.res, err);
      }).populate(obj.populate)
        .sort(obj.sort)
        .limit(obj.limit)
        .count(obj.count, (err, res) => {
          if (err) console.log(err);
          if (res) return res;
        })
        .skip(obj.skip);
    }

    populate(populate) {
      populate = populate.split(',');
      _.each(populate, (e, i) => {
        const deepPopulate = e.split('.');
        if (deepPopulate.length) {
          populate[i] = this.deepPopulate({}, deepPopulate);
        }
      });
      return populate;
    }

    deepPopulate(obje, n) {
      let populate;
      if (!obje.path) populate = '';
      else populate = obje;
      if (n.length === 1) return { path: n[0], populate };
      const obj = {
        path: n[n.length - 1],
        populate,
      };
      n.pop();
      return this.deepPopulate(obj, n);
    }


    getData(req, res) {
      if (this.protect && this.protect.get) return header.status403(req, res);
      if (header.headerController(req) === false) return header.status403(req, res);
      const obj = {};
      obj.req = req;
      obj.res = res;
      obj.limit = 10;
      obj.sort = '';
      obj.populate = '';
      obj.count = '';
      obj.skip = '';
      const cond = {};
      if (req.params.id !== undefined) cond._id = req.params.id;

      if (req.query) {
        // limit
        obj.limit = parseInt(req.query.l, 10) || parseInt(req.query.limit, 10) || 10;

        // sort
        obj.sort = req.query.s || req.query.sort || '';

        // skip
        obj.skip = req.query.ss || req.query.skip || '';
        obj.skip = parseInt(obj.skip, 10);

        // populate
        const populate = req.query.p || req.query.populate || '';
        obj.populate = this.populate(populate);

        // where
        if (req.query.where) {
          const where = req.query.where;
          const whereArr = where.split(',');
          _.each(whereArr, (e, i) => {
            const objArr = e.split(':');
            cond[objArr[0]] = objArr[1];
          });
        }

        // count
        if (req.query.count || req.query.c) {
          obj.count = {};
          const count = req.query.c || req.query.count || '';
          const countArr = count.split(',');
          _.each(countArr, (e, i) => {
            const objArr = e.split(':');
            obj.count[objArr[0]] = objArr[1];
          });
        }
      }
      return header.token(req, (error, decode) => {
        if (this.owner && !error) {
          if (this.owner.key) cond[this.owner.key] = decode._id;
        } else if (this.owner && error) return header.status403(req, res);
        obj.cond = cond;
        this.find(obj);
      });
    }

    checkToken(req, res, cond = '', cb) {
      return header.token(req, (error, decode) => {
        if (this.owner && !error) {
          if (this.owner.key) cond[this.owner.key] = decode._id;
        } else if (this.owner && error) return header.status403(req, res);
        cb(req, res, cond);
      });
    }

    postData(req, res) {
      if (this.protect && this.protect.post) return header.status403(req, res);
      if (header.headerController(req) === false) return header.status403(req, res);
      const model = new this.Model(req.body);
      this.checkToken(req, res, null, () => {
        model.save((err, data) => {
          if (!err) header.status200(req, res, data);
          else header.status403(req, res, err);
        });
      });
    }

    putData(req, res) {
      if (this.protect && this.protect.put) return header.status403(req, res);
      if (header.headerController(req) === false) return header.status403(req, res);
      if (req.params.id !== undefined) {
        this.checkToken(req, res, null, () => {
          this.Model.update(
            { _id: req.params.id },
            { $set: req.body },
            (err, data) => {
              const obj = {
                data,
                body: req.body,
              };
              if (err) header.status403(req, res, err);
              else header.status200(req, res, obj);
            });
        });
      } else this.specErr(req, res);
    }

    deleteData(req, res) {
      if (this.protect && this.protect.delete) return header.status403(req, res);
      if (header.headerController(req) === false) return header.status403(req, res);
      if (req.params.id !== undefined) {
        this.checkToken(req, res, null, () => {
          this.Model.remove({ _id: req.params.id }, (err, data) => {
            if (!err) header.status200(req, res, { data, id: req.params.id });
            else header.status404(req, res, err);
          });
        });
      } else this.specErr(req, res);
    }
  }

  return MdlCreator;
};
