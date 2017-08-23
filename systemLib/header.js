const jwt = require('jsonwebtoken');

module.exports = (app) => {
  const config = app.config[app.config.env];

  class Headers {
    constructor() {
      console.log('* Headers constructor *');
    }

    headerController(req) {
      const Id = config['X-Client-Id'] || '';
      const Secret = config['X-Client-Secret'] || '';
      const ClientId = req.get('X-Client-Id');
      const ClientSecret = req.get('X-Client-Secret');
      if ((Id !== '' && Secret !== '') && (Id !== ClientId || Secret !== ClientSecret)) return false;
      return true;
    }

    token(req, cb) {
      const ClientToken = req.get('X-Client-Token') || '';
      jwt.verify(ClientToken, 'secret', (err, decode) => {
        if (err) return cb(true, null);
        return cb(null, decode);
      });
    }

    status404(req, res, err) {
      if (err) res.status(404).json({ error: err.name, message: err.message, status: 404 });
      else res.status(404).json({ error: 'NotFound', message: 'Data Not Found', status: 404 });
    }

    status403(req, res, err) {
      if (err) res.status(403).json({ error: err.name, message: err.message, status: 403 });
      else res.status(403).json({ error: 'Unauthorized', message: 'Unauthorized zone', status: 403 });
    }

    status200(req, res, data, count) {
      res.status(200).json({ count, data, status: 200 });
    }

    specErr(req, res, err = 'ValidationError', message = 'id is undefined') {
      res.status(400).json({ err, message, meta: 404 });
    }
  }

  return new Headers();
};
