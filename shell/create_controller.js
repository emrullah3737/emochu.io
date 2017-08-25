#! /usr/bin/env node
const createFile = require('create-file');

const controllerName = process.argv[2];
const create = controller => new Promise((res, rej) => {
  createFile(`controllers/${controller}.js`, `module.exports = (app) => {
  const controller = {
    ${controller}: (req, res, next) => {
      console.log('${controller} controller executed!');
      next();
    },
  };

  return controller;
};\n`, (err) => {
    if (!err) {
      console.log('\x1b[32m%s\x1b[1m\x1b[0m', `controllers/${controllerName}.js created`);
      return res();
    } return rej(err);
  });
});

create(controllerName).then().catch(console.log);
