const router = require('express').Router();
const _ = require('underscore');

module.exports = (app) => {
  const config = app.config[app.config.env];
  const systemModels = app.systemModels.config;
  const login = app.systemRoutes.api.login;
  router.use('/login', login);

  // TODO: regiter, verify, forgot password, social login
  const allModels = systemModels.concat(config.models);
  _.each(allModels, (el, key) => {
    let page;
    if (app.models && app.models[el]) page = app.models[el];
    else page = app.systemModels[el];
    router.use(page.router.api, page.router.cb);
  });

  return router;
};
