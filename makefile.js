const file = require('file');
const createFile = require('create-file');

exports.make = () => new Promise((resolve, reject) => {
  // file.mkdirsSync('config', 777);
  const env = () => new Promise((res, rej) => {
    createFile('config/env.js', 'module.exports = () => \'development\';\n', (err) => {
      if (!err) {
        console.log('config/env.js created');
        return res();
      } return rej(err);
    });
  });

  const dev = () => new Promise((res, rej) => {
    createFile('config/development.js', `module.exports = () => ({
  'X-Client-Id': '123',
  'X-Client-Secret': '123',
  endpoint: '',
  db: {
    db: 'database',
    host: 'localhost',
    user: '',
    pass: '',
  },
  models: [],
  admin: {
    _slug: 'admin@admin.com',
    mail: 'admin@admin.com',
    password: '12345',
    role: 'SuperAdmin',
  },
});\n`, (err) => {
        if (!err) {
          console.log('config/development.js created');
          return res();
        } return rej(err);
      });
  });

  const pro = () => new Promise((res, rej) => {
    createFile('config/production.js', `module.exports = () => ({
  'X-Client-Id': '123',
  'X-Client-Secret': '123',
  endpoint: '',
  db: {
    db: 'database',
    host: 'localhost',
    user: '',
    pass: '',
  },
  models: [],
  admin: {
    _slug: 'admin@admin.com',
    mail: 'admin@admin.com',
    password: '12345',
    role: 'SuperAdmin',
  },
});\n`, (err) => {
        if (!err) {
          console.log('config/production.js created');
          return res();
        } return rej(err);
      });
  });
  dev().then(env).then(pro).then(() => {
    file.mkdirsSync('models', 777);
    file.mkdirsSync('routes', 777);
    setTimeout(() => {
      resolve();
    }, 100);
  })
    .catch(reject);
});
