const load = require('express-load');
const exec = require('child_process').exec;
const express = require('express');
const cors = require('cors');
const _ = require('underscore');
const git = require('git-rev');
const path = require('path');
const icon = require('./icon');


const dirname = {
  local: '',
  npm: 'node_modules/emochu.io/',
};

const dir = dirname.npm;

const app = express();

git.short((str) => {
  app.locals.git = str || Math.floor((Math.random() * 100000) + 1);
});

app.use(cors());
app.set('view engine', 'hbs');
app.set('trust proxy', 1); // trust first proxy
app.use('/', express.static(`${dirname.npm}public`));
app.use('/admin', express.static(`${dirname.npm}public`));
app.use('/', express.static(`${dirname.local}public`));
app.use('/admin', express.static(`${dirname.local}public`));
app.set('views', [path.join(__dirname, 'views'), 'views']);
module.exports = {
  static: (arr) => {
    _.each(arr, (e) => {
      app.use(e.url, express.static(e.path));
    });
  },
  app,
  express,
  load,
  firstLoads: (arr, cb) => {
    _.each(arr, (e, i) => {
      load(e, { verbose: true }).into(app);
      if (i === (arr.length - 1)) {
        load('packages.js', { verbose: true, cwd: dir })
          .then('systemLib/header.js', { verbose: true, cwd: dir })
          .then('systemLib', { verbose: true, cwd: dir }).into(app, cb);
      }
    });
  },
  start: (port, config, cb = () => { }) => {
    load('systemModels', { verbose: true, cwd: dir })
      .then('systemMiddlewares', { verbose: true, cwd: dir })
      .then('systemRoutes/api/login.js', { verbose: true, cwd: dir })
      .then('systemRoutes', { verbose: true, cwd: dir })
      .then('init', { verbose: true, cwd: dir })
      .into(app, () => {
        app.locals.appName = config[config.env].app;
        app.listen(port, () => {
          if (config.env === 'development') {
            const url = config[config.env].endpoint;
            exec(`open http://${url}:${port}/admin/login && node bin/www`);
          }
          console.log(icon);
          console.log(`listening: ${port}`);
          cb();
        });
      });
  },
};
