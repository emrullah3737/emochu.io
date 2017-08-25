#! /usr/bin/env node
const spawn = require('child_process').spawn;

const ls = spawn('node', ['app']);

ls.stdout.on('data', (data) => {
  console.log('\x1b[32m%s\x1b[1m\x1b[0m', `${data.toString()}`);
});

ls.stderr.on('data', (data) => {
  console.log('\x1b[31m%s\x1b[1m\x1b[0m', `${data.toString()}`);
});

ls.on('exit', (code) => {
  console.log('\x1b[31m%s\x1b[1m\x1b[0m', `child process exited with code ${code.toString()}`);
});
