/* jslint node: true */
"use strict";

var execFile = require('child_process').execFile;

var test = function(app, cb) {
  var proc = execFile(app);
  var killed = false;
  var log = '';

  proc.on('error', function(err) {
    killed = true;

    cb(err);
  });

  proc.on('exit', function(exitCode) {
    if(killed) return;

    killed = true;
    log = log + 'Exit Code: ' + exitCode;

    var err = new Error(app + ' exited with exit code: ' + exitCode);
    cb(err);
  });

  setTimeout(function() {
    if(killed) return;

    proc.kill();
    killed = true;

    cb();
  }, 15000);
};

module.exports = test;
