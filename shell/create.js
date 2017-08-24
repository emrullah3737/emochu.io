#! /usr/bin/env node
const file = require('file');
const createFile = require('create-file');
const exec = require('child_process').exec;

const make = () => new Promise((resolve, reject) => {
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
    db: 'dbemochu',
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
    db: 'dbemochu',
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
  const appjs = () => new Promise((res, rej) => {
    createFile('./app.js', `const emochu = require('emochu.io');
    
    emochu.firstLoads(['config'], () => {
  emochu.load('models', { verbose: true })
    .then('controller', { verbose: true })
    .then('routes', { verbose: true })
    .into(emochu.app, () => {
      emochu.start(8080);
    });
});\n`, (err) => {
        if (!err) {
          console.log('config/app.js created');
          return res();
        } return rej(err);
      });
  });

  dev().then(env).then(pro).then(appjs)
    .then(() => {
      file.mkdirsSync('models', 777);
      file.mkdirsSync('routes', 777);
      file.mkdirsSync('controllers', 777);
      file.mkdirsSync('views', 777);
      setTimeout(() => {
        resolve();
      }, 100);
    })
    .catch(reject);
});


make().then(() => {
  exec('npm install emochu.io', (err, stdout, stderr) => {
    if (err) console.log(err);
    if (stdout) console.log(stdout);
    if (stderr) console.log(stderr);
  });
});
