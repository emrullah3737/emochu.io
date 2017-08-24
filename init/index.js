const router = require('express').Router();
const bodyParser = require('body-parser');
const session = require('express-session');
const _ = require('underscore');

module.exports = (app) => {
  const routing = (mongolog) => {
    console.log(mongolog);
    router.use(bodyParser.json());
    router.use(bodyParser.urlencoded({ extended: true }));

    router.use(
      session({
        secret: 'secret',
        resave: false,
        saveUninitialized: true,
      }));

    _.each(app.routes, (e) => {
      router.use('/', e);
    });
    router.use('/admin', app.systemRoutes.admin.pages.index);
    router.use('/admin', app.systemRoutes.admin.pages.login);
    router.use('/admin', app.systemRoutes.admin.login);
    router.use('/admin', app.systemRoutes.admin.view);
    router.use('/api', app.systemRoutes.api.api);
    app.use('/', router);
  };

  app.systemLib.mongoose.connect()
    .then(routing)
    .catch(console.log);
};
