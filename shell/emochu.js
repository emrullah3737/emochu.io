#! /usr/bin/env node
const pjson = require('../package.json');

const arg = process.argv[2];
if (arg === '-v' || arg === '-version') console.log(pjson.version);
