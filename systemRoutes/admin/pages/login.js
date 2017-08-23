const router = require('express').Router();

module.exports = () => {
  const isLogged = (req, res, next) => {
    if (req.session && req.session.mail && req.session.password) {
      return res.redirect('/admin/index');
    }
    next();
  };

  router.get('/login', isLogged, (req, res) => {
    res.render('admin/login');
  });
  return router;
};
