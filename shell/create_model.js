#! /usr/bin/env node
const createFile = require('create-file');

const modelName = process.argv[2];
const create = model => new Promise((res, rej) => {
  createFile(`models/${model}.js`, `module.exports = (app) => {
  const mongoose = app.packages.mongoose;
  const MdlCreator = app.systemLib.mdlCreator;
  const Schema = mongoose.Schema;

  const model = {
    _slug: {
      type: String,
      required: false,
    },
  };

  const schema = new Schema(model);

  const config = {
    name: '${modelName}',
    schema,
    protect: {
      post: false,
      get: false,
      put: false,
      delete: false,
    },
    owner: {},
    mask: {},
  };

  schema.pre('save', function (next) {
    const self = this;
    next();
  });

  return new MdlCreator(config);
};\n`, (err) => {
    if (!err) {
      console.log(`models/${modelName}.js created`);
      return res();
    } return rej(err);
  });
});

create(modelName).then().catch(console.log);
