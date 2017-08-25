#! /usr/bin/env node
const file = require('file');
const createFile = require('create-file');
const exec = require('child_process').exec;

const make = () => new Promise((resolve, reject) => {
  const env = () => new Promise((res, rej) => {
    createFile('config/env.js', 'module.exports = () => \'development\';\n', (err) => {
      if (!err) {
        console.log('\x1b[32m%s\x1b[1m\x1b[0m', 'config/env.js created');
        return res();
      } return rej(err);
    });
  });

  const dev = () => new Promise((res, rej) => {
    createFile('config/development.js', `module.exports = () => ({
  app: 'emochu.io',
  'X-Client-Id': '123',
  'X-Client-Secret': '123',
  endpoint: '127.0.0.1',
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
          console.log('\x1b[32m%s\x1b[1m\x1b[0m', 'config/development.js created');
          return res();
        } return rej(err);
      });
  });

  const pro = () => new Promise((res, rej) => {
    createFile('config/production.js', `module.exports = () => ({
  app: 'emochu.io',
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
          console.log('\x1b[32m%s\x1b[1m\x1b[0m', 'config/production.js created');
          return res();
        } return rej(err);
      });
  });
  const appjs = () => new Promise((res, rej) => {
    createFile('./app.js', `const emochu = require('emochu.io');
    
emochu.firstLoads(['config'], () => {
  emochu.load('models', { verbose: true })
    .then('controllers', { verbose: true })
    .then('routes', { verbose: true })
    .into(emochu.app, () => {
      emochu.start(8080, emochu.app.config);
    });
});\n`, (err) => {
        if (!err) {
          console.log('\x1b[32m%s\x1b[1m\x1b[0m', 'app.js created');
          return res();
        } return rej(err);
      });
  });

  dev().then(env).then(pro).then(appjs)
    .then(() => {
      exec('mkdir -m 777 models');
      exec('mkdir -m 777 routes');
      exec('mkdir -m 777 controllers');
      exec('mkdir -m 777 views');
      setTimeout(() => {
        resolve();
      }, 100);
    })
    .catch(reject);
});


make().then(() => {
  console.log('\x1b[32m%s\x1b[1m\x1b[0m', 'npm emochu.io installing...');
  exec('npm install emochu.io ', (err, stdout, stderr) => {
    if (err) console.log(err);
    if (stdout) console.log('\x1b[32m%s\x1b[1m\x1b[0m', stdout);
    if (stderr) console.log(stderr);
    console.log('\x1b[32m%s\x1b[1m\x1b[0m', 'npm emochu.io installed ');
  });
});
