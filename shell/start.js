#! /usr/bin/env node
const exec = require('child_process').exec;

exec('node index', (err, stdout, stderr) => {
  if (err) console.log(err);
  if (stdout) console.log(stdout);
  if (stderr) console.log(stderr);
});
