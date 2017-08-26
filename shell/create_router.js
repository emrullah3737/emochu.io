#! /usr/bin/env node
const createFile = require('create-file');

const routeName = process.argv[2];
const html = process.argv[3];

const create = route => new Promise((res, rej) => {
  createFile(`routes/${route}.js`, `module.exports = (app) => {
  const router = app.packages.router;

  router.use('/${route}', (req, res) => {
    res.render('routes/${route}/${route}', { ${route}: '${route}' });
  });

  return router;
};\n`, (err) => {
    if (!err) {
      console.log('\x1b[32m%s\x1b[1m\x1b[0m', `routes/${route}.js created`);
      return res(route);
    } return rej(err);
  });
});

const createoffHtml = route => new Promise((res, rej) => {
  createFile(`routes/${route}.js`, `module.exports = (app) => {
  const router = app.packages.router;

  router.use('/${route}', (req, res) => {
    res.json({ ${route}: '${route}' });
  });

  return router;
};\n`, (err) => {
    if (!err) {
      console.log('\x1b[32m%s\x1b[1m\x1b[0m', `routes/${route}.js created`);
      return res(route);
    } return rej(err);
  });
});

const createCss = route => new Promise((res, rej) => {
  createFile(`public/routes/${route}/${route}.css`, `.header {
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
}\n`, (err) => {
      if (!err) {
        console.log('\x1b[32m%s\x1b[1m\x1b[0m', `public/routes/${route}/${route}.css created`);
        return res(route);
      } return rej(err);
    });
});

const createHtml = route => new Promise((res, rej) => {
  createFile(`views/routes/${route}/${route}.hbs`, `<!DOCTYPE html>
<html>
<head>
  <title>{{${route}}}</title>
  <link rel="stylesheet" type="text/css" href="routes/${route}/${route}.css">
  <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.css">
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
  <script src="routes/${route}/${route}.js"></script>
</head>
<body>
  <div class="header">
    <h3>{{toUpperCase appName}} <i class="fa fa-folder-open" aria-hidden="true"></i><h3>
  </div>
  <div class="subTitle">welcome to page {{${route}}} <i class="fa fa-check" aria-hidden="true"></i></div>
</body>
</html>
\n`, (err) => {
    if (!err) {
      console.log('\x1b[32m%s\x1b[1m\x1b[0m', `views/routes/${route}/${route}.hbs created`);
      return res(route);
    } return rej(err);
  });
});

const createJs = route => new Promise((res, rej) => {
  createFile(`public/routes/${route}/${route}.js`, `$(document).ready(function(){
  $(".subTitle").animate({ opacity: '1', 'font-size': '30'});
});\n`, (err) => {
      if (!err) {
        console.log('\x1b[32m%s\x1b[1m\x1b[0m', `public/routes/${route}/${route}.js created`);
        return res(route);
      } return rej(err);
    });
});

if (html === '--html') {
  create(routeName)
    .then(createCss)
    .then(createJs)
    .then(createHtml)
    .catch(console.log);
} else {
  createoffHtml(routeName)
    .catch(console.log);
}
