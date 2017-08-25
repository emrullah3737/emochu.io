#! /usr/bin/env node
const exec = require('child_process').exec;

exec('npm -g upgrade emochu.io', (err, stdout, stderr) => {
  if (err) console.log('\x1b[31m%s\x1b[1m\x1b[0m', err);
  if (stdout) console.log('\x1b[31m%s\x1b[1m\x1b[0m', stderr);
  if (stderr) console.log('\x1b[32m%s\x1b[1m\x1b[0m', stdout);
});
