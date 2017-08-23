    $npm install emochu.io

# **USAGE**

		app.js
```javascript
const emochu = require('emochu.io');

emochu.firstLoads(['config'], () => {
  emochu.load('models', { verbose: true })
  	.then('controllers', { verbose: true })
    .then('routes', { verbose: true })
    .into(emochu.app, () => {
      emochu.start(3000);
  });
});
```
* **emochu.firstLoads**: you must define config file and first importnant files via firstLoads.	==> **emochu.firstLoads(Array\<file names>, callback)**
* **emochu.load**: same of express load, you can define models, routes, controllers, etc. ==> **emochu.load(string\<file name>, Object\<optional>)** for more information, see **express load**.
* **emochu.app**: you must define to .into(emochu.app) for loading files.
* **emochu.start**: start emochuio ==> **emochu.start(number\<port>, callback\<optional>)**



# **CONFIG**
env.js
```javascript
module.exports = () => 'development';
 or
module.exports = () => 'production';
```

	development.js, production.js
```javascript
module.exports = () => ({
  'X-Client-Id': '123',
  'X-Client-Secret': '123',
  endpoint: '',
  db: {
    db: 'database',
    host: 'localhost',
    user: '',
    pass: '',
  },
  models: [
    'test',
  ],
  admin: {
    _slug: 'admin@admin.com',
    mail: 'admin@admin.com',
    password: '12345',
    role: 'SuperAdmin',
  },
});
```
# **MODELS**
```javascript
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
    name: 'test',
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

  const test = new MdlCreator(config);
  // SuperAdmin
  const adminData = configs.admin;

  test.Model.findOneAndUpdate(
    adminData,
    adminData,
    { upsert: true },
    (res, err) => {});

  return test;
};
```