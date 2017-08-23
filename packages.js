const router = require('express').Router();
const mongoose = require('mongoose');
const _ = require('underscore');
const file = require('file');
const multer = require('multer');

module.exports = () => {
  console.log('* packages loading *');
  return {
    router,
    mongoose,
    _,
    file,
    multer,
  };
};
