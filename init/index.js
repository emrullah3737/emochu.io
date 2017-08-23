const router = require('express').Router();
const bodyParser = require('body-parser');
const session = require('express-session');

module.exports = (app) => {
  const routing = () => {
    router.use(bodyParser.json());
    router.use(bodyParser.urlencoded({ extended: true }));

    router.use(
      session({
        secret: 'secret',
        resave: false,
        saveUninitialized: true,
      }));

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
