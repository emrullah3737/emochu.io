const router = require('express').Router();

module.exports = (app) => {
  const User = app.systemModels.systemUser;
  router.use('/o/login', (req, res) => {
    const mail = req.body.mail;
    const password = req.body.password;
    User.Model.findOne({ mail, password }, (err, data) => {
      if (data) {
        req.session.mail = data.mail;
        req.session.password = data.password;
        req.session.role = data.role;
        res.redirect('/admin/index');
      } else {
        res.redirect('/admin/login');
      }
    });
  });

  router.use('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/admin/login');
  });

  return router;
};
