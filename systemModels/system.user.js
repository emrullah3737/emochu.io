const mongoose = require('mongoose');

module.exports = (app) => {
  const configs = app.config[app.config.env];
  const MdlCreator = app.systemLib.mdlCreator;
  const Schema = mongoose.Schema;


  const model = {
    _slug: {
      type: String,
      required: false,
    },
    mail: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    created_at: {
      type: Date,
      required: true,
      default: Date.now,
    },
    updated_at: {
      type: Date,
      required: false,
      default: Date.now,
    },
    role: {
      type: String,
      enum: ['SuperAdmin', 'Admin', 'User', 'Guest'],
      default: 'User',
    },
  };
  const schema = new Schema(model);

  const config = {
    name: 'systemUser',
    schema,
    protect: {
      post: true,
      get: false,
      put: true,
      delete: true,
    },
    owner: {
      key: '_id',
    },
    mask: {
      password: true,
      role: true,
    },
  };

  schema.pre('save', function (next) {
    const self = this;
    if (!self._slug) self._slug = self.mail;
    next();
  });

  const User = new MdlCreator(config);
  // SuperAdmin
  const adminData = configs.admin;

  User.Model.findOneAndUpdate(
    adminData,
    adminData,
    { upsert: true },
    (res, err) => {});

  return User;
};
