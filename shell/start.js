#! /usr/bin/env node
const spawn = require('child_process').spawn;

const ls = spawn('node', ['app']);

ls.stdout.on('data', (data) => {
  console.log(`stdout: ${data.toString()}`);
});

ls.stderr.on('data', (data) => {
  console.log(`stderr: ${data.toString()}`);
});

ls.on('exit', (code) => {
  console.log(`child process exited with code ${code.toString()}`);
});
