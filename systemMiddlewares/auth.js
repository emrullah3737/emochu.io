module.exports = () => {
  const middle = (req, res, next) => {
    if (!req.session || !req.session.mail || !req.session.password || req.session.role !== 'SuperAdmin') {
      req.session.destroy();
      return res.redirect('/admin/login');
    }
    next();
  };
  return middle;
};
