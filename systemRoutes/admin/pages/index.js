const router = require('express').Router();
const _ = require('underscore');
const mongoose = require('mongoose');

module.exports = (app) => {
  const config = app.config[app.config.env];
  const systemModels = app.systemModels.config;
  const auth = app.systemMiddlewares.auth;

  router.get('/', (req, res) => {
    res.redirect('login');
  });

  const radarData = (req, res, next) => {
    let strData = '[';
    let strLabel = '[';
    let count1 = 1;
    _.each(mongoose.models, (el, key) => {
      count1 += 1;
    });
    let count2 = 1;
    _.each(mongoose.models, (el, key) => {
      el.count((err, data) => {
        count2 += 1;
        strLabel += `"${key}", `;
        strData += `${data}, `;
        if (count1 === count2) {
          strData += ']';
          strLabel += ']';
          req.radarData = strData;
          req.radatLabel = strLabel;
          next();
        }
      });
    });
  };

  router.use('/index', auth, radarData, (req, res) => {
    const obj = {
      session: req.session,
      pages: systemModels.concat(config.models),
      dataRadar: req.radarData,
      labelRadar: req.radatLabel,
    };
    res.render('admin/index', obj);
  });
  return router;
};
