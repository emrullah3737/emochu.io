module.exports = (app) => {
  const middle = {};
  let Models;
  middle.add = (req, res, next) => {
    const mdl = req.mdl;
    let dir;
    if (req.file) dir = req.file.destination.split('public/')[1];
    if (req.file) req.body.file = `${dir}${req.file.filename}`;

    if (app.models && app.models[mdl]) Models = app.models[mdl];
    else Models = app.systemModels[mdl];
    Models.Model.create(req.body, (err, user) => {
      if (!err) req.isCreated = true;
      else req.isCreated = false;
      next();
    });
  };

  middle.remove = (req, res, next) => {
    const mdl = req.mdl;
    if (app.models && app.models[mdl]) Models = app.models[mdl];
    else Models = app.systemModels[mdl];
    Models.Model.remove(req.body, (err, user) => {
      if (!err) req.isRemoved = true;
      else req.isRemoved = false;
      next();
    });
  };

  middle.update = (req, res, next) => {
    const mdl = req.mdl;
    let dir;
    if (req.file) dir = req.file.destination.split('public/')[1];
    if (req.file) req.body.file = `${dir}${req.file.filename}`;
    if (req.file === '') req.body.file = undefined;
    if (app.models && app.models[mdl]) Models = app.models[mdl];
    else Models = app.systemModels[mdl];
    const obj = { _id: req.body._id };
    req.body.updated_at = Date.now();
    Models.Model.update(obj, req.body, (err, user) => {
      if (!err) req.isUpdated = true;
      else req.isUpdated = false;
      next();
    });
  };

  return middle;
};
