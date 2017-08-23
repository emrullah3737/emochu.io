const mongoose = require('mongoose');

module.exports = (app) => {
  mongoose.Promise = global.Promise;
  const config = app.config[app.config.env];

  class Mongo {
    constructor() {
      console.log('* Mongoose init *');
    }

    connect() {
      return new Promise((res, rej) => {
        const db = config.db.db || '';
        const host = config.db.host || '';
        const user = config.db.user || '';
        const password = config.db.pass || '';

        mongoose.connect(`mongodb://${user}:${password}@${host}/${db}`);
        this.connection(db, (err, data) => {
          if (err) rej(err);
          else res(data);
        });
      });
    }

    connection(dbName, cb) {
      const db = mongoose.connection;
      db.on('open', () => cb(null, `* mongoose connection success, database:${dbName} *`));
      db.on('error', () => cb(`* mongoose connection error, database:${dbName} *`, null));
    }
  }
  return new Mongo();
};
