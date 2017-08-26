	$ npm install -g emochu.io

# USAGE
	$ emochu:create:app
    
      create initial folders.
      
      *file structure
      |--config/
      |--development.js => development config file
      |--production.js => production config file
      |--env.js => configuration of working environment
      |--controllers/ => controller files
      |--models/ => mongo model files
      |--node_modules/ => npm packages
      |--public/ => static public files
      |--uploads/ => static uplads files
      |--routes/ => express route files
      |--views/ => express route template files
      |--app.js => app file that start the app
# Create Model
 
 	$ emochu:create:model <model>
    
    example;
    $ emochu:create:model testModel
    
    |--models/
    	|--testModel.js
   ```javascript
   module.exports = (app) => {
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
    name: 'testModel',
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
};
```
# Create Router

 	$ emochu:create:router <router> --html<optional>
    
    example with --html;
    $ emochu:create:router testRoute --html 
    
    |--routes/
    	|--testRoute.js
    |--views/
    	|--routes/
        	|--testRoute/
            	|--testRoute.hbs
    |--public/
    	|--routes/
        	|--testRoute/
            	|--testRoute.css
                |--testRoute.js

   ```javascript
   |--routes/
    	|--testRoute.js
        
  module.exports = (app) => {
  const router = app.packages.router;

  router.use('/testRoute', (req, res) => {
    res.render('routes/testRoute/testRoute', { testRoute: 'testRoute' });
  });

  return router;
};
```
   ```html
   |--views/
    	|--routes/
        	|--testRoute/
            	|--testRoute.hbs
        
<!DOCTYPE html>
<html>
<head>
  <title>{{testRoute}}</title>
  <link rel="stylesheet" type="text/css" href="routes/testRoute/testRoute.css">
  <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.css">
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
  <script src="routes/testRoute/testRoute.js"></script>
</head>
<body>
  <div class="header">
    <h3>{{toUpperCase appName}} <i class="fa fa-folder-open" aria-hidden="true"></i><h3>
  </div>
  <div class="subTitle">welcome to page {{testRoute}} <i class="fa fa-check" aria-hidden="true"></i></div>
</body>
</html>
```

   ```html
   |--public/
    	|--routes/
        	|--testRoute/
            	|--testRoute.css
        
.header {
  font-family: Copperplate, "Copperplate Gothic Light", fantasy;
  color: #ccc;
  padding: 20px;
  border-top-left-radius: 3px;
  border-top-right-radius: 3px;
  margin: 0 auto;
  border: 1px solid #eee;
  border-left: 3px solid #1b809e;
  border-right: 3px solid #1b809e;
  width: 75%;
  text-align: center;
  font-size: 30px;
}
.subTitle {
  font-family: Copperplate, "Copperplate Gothic Light", fantasy;
  background: #f7f7f9;
  color: #777;
  opacity: 0.2;
  padding: 20px;
  border-bottom-left-radius: 3px;
  border-bottom-right-radius: 3px;
  margin: 0 auto;
  border: 1px solid #eee;
  border-left: 3px solid #1b809e;
  border-right: 3px solid #1b809e;
  width: 75%;
  text-align: center;
  font-size: 20px;
}

.fa-check {
  color: #7bef00;
}

.fa-folder-open {
  color: #8A7D71;
}
```
   ```javascript
   |--public/
    	|--routes/
        	|--testRoute/
            	|--testRoute.js
                
$(document).ready(function(){
  $(".subTitle").animate({ opacity: '1', 'font-size': '30'});
});
```
`127.0.0.1:8080/testRoute`
![N|Solid](https://image.ibb.co/n5i9wk/test_Route.png)

	example without --html;
    $ emochu:create:router testRoute2    
   ```javascript
   |--routes/
    	|--testRoute.js
        
  module.exports = (app) => {
  const router = app.packages.router;

  router.use('/testRoute', (req, res) => {
    res.render('routes/testRoute/testRoute', { testRoute: 'testRoute' });
  });

  return router;
};
```
# Create Controller
	$ emochu:create:controller <controller>
    example;
    $ emochu:create:controller testController
    
    |--controllers/
    	|--testController.js
```javascript
module.exports = (app) => {
  const controller = {
    testController: (req, res, next) => {
      console.log('testController controller executed!');
      next();
    },
  };

  return controller;
};
```

# Update Package

	$ emochu:update
    	# execute $ npm update
        
# Help Menu
	$ emochu:help
```bash
emochu:create:app # create base folders and install npm emochu.io
emochu:create:model <model> # create model in "/models" folder
emochu:create:router <router> --html<optioal # create router in "/routes" folder
emochu:create:controller <controller> # create controller in "/controllers" folder
emochu: -v or -version # emochu.io version
emochu:update # update emochu.io version
emochu:start # start the emochu.io
````
# Version
	$ emochu: -v or emochu: -version
```bash
# 1.2.13
````
# Start `emochu.io`
	$ emochu:start
		start the emochu.io app
 # ADMIN PANEL
:arrow_forward: `127.0.0.1:8080/admin/login`
![N|Solid](https://image.ibb.co/fCFa2Q/login.png)


:arrow_forward: `127.0.0.1:8080/admin/index`
![N|Solid](https://image.ibb.co/dUFQ2Q/index.png)

:arrow_forward: `127.0.0.1:8080/admin/<model>`
![N|Solid](https://image.ibb.co/j3btp5/model.png)

# API CLI

...