#! /usr/bin/env node
const createFile = require('create-file');

const routeName = process.argv[2];
const create = route => new Promise((res, rej) => {
  createFile(`routes/${route}.js`, `module.exports = (app) => {
  const router = app.packages.router;

  router.use('/${route}', (req, res) => {
    res.send('WELCOME TO PAGE ${route.toUpperCase()}');
  });

  return router;
};\n`, (err) => {
    if (!err) {
      console.log(`routes/${routeName}.js created`);
      return res();
    } return rej(err);
  });
});

create(routeName).then().catch(console.log);
