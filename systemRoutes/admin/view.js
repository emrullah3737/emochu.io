const router = require('express').Router();
const _ = require('underscore');

module.exports = (app) => {
  const Controller = app.systemMiddlewares.modelController;
  const auth = app.systemMiddlewares.auth;
  const config = app.config[app.config.env];
  const upload = app.systemMiddlewares.upload;
  const systemModels = app.systemModels.config;
  const allModels = systemModels.concat(config.models);

  _.each(allModels, (el, key) => {
    let Mdl;
    if (app.models && app.models[el]) Mdl = app.models[el];
    else Mdl = app.systemModels[el];

    const users = (req, res, next) => {
      Mdl.Model.find({}, (err, data) => {
        if (data.length > 0) req.users = data;
        else req.users = [];
        next();
      });
    };

    const inputs = (req, res, next) => {
      let select;
      const file = [];
      if (Mdl.Model.schema.path('role')) {
        select = Mdl.Model.schema.path('role').enumValues;
      }
      const fieldObj = [];
      Mdl.Model.schema.eachPath((fld, types) => {
        const field = types.path;
        const type = types.instance;
        let enums;
        if (types.enumValues && types.enumValues.length > 0) { enums = types.enumValues; }
        if (
          field !== '_id' &&
          field !== '__v' &&
          field !== 'updated_at' &&
          field !== 'created_at'
        ) {
          let ref;
          if (types.options && types.options.file) {
            file.push({
              field: fld,
            });
          } else if (types.options && types.options.ref) {
            const referance = types.options.ref;
            let model = app.systemModels[el];
            if (!model) model = app.models[el];
            model.Model.find({}, (error, response) => {
              ref = { referance, response };
              fieldObj.push({ field, type, enums, ref });
            });
          } else {
            fieldObj.push({ field, type, enums, ref });
          }
        }
      });
      req.select = select;
      req.fieldObj = fieldObj;
      req.file = file;
      next();
    };

    router.use(`/${el}/:id*?`, inputs, auth, users, (req, res) => {
      req.users.el = el;
      const select = req.select;
      const fileArr = req.file;
      const fieldObj = req.fieldObj;
      const objList = {
        session: req.session,
        users: req.users,
        select,
        fieldObj,
        el,
        pages: allModels,
        fileArr,
      };
      let valueObj;

      if (req.params.id) {
        Mdl.Model.findOne({ _id: req.params.id }, (err, data) => {
          if (data) {
            valueObj = data;
            const objEdit = {
              session: req.session,
              data: {
                fieldObj,
                valueObj,
                el,
                pages: allModels,
                fileArr,
              },
            };
            res.render('admin/page/edit', objEdit);
          }
        });
      } else res.render('admin/page/list', objList);
    });

    const mdl = (req, res, next) => {
      req.mdl = el;
      next();
    };

    router.post(`/add${el}`, upload.single('file'), mdl, Controller.add, (req, res) => {
      if (req.isCreated === true) res.redirect(el);
      else res.redirect(`/admin/${el}`);
    });

    router.use(`/remove${el}`, mdl, Controller.remove, (req, res) => {
      if (req.isRemoved === true) res.redirect(el);
      else res.redirect(`/admin/${el}`);
    });

    router.post(`/update${el}`, upload.single('file'), mdl, Controller.update, (req, res) => {
      if (req.isUpdated === true) res.redirect(el);
      else res.redirect(`/admin/${el}`);
    });
  });

  return router;
};
