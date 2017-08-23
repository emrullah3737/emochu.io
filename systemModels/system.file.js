const mongoose = require('mongoose');

module.exports = (app) => {
  const MdlCreator = app.systemLib.mdlCreator;
  const Schema = mongoose.Schema;


  const model = {
    _slug: {
      type: String,
      required: false,
    },
    name: {
      type: String,
      required: true,
    },
    file: {
      file: true,
      type: String,
      required: false,
    },
  };
  const schema = new Schema(model);

  const config = {
    name: 'systemFile',
    schema,
  };

  schema.pre('save', function (next) {
    const self = this;
    if (!self._slug) self._slug = self.name;
    next();
  });


  const File = new MdlCreator(config);

  return File;
};
