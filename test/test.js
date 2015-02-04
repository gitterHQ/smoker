/* jslint node: true */
"use strict";

var smoketest = require('..');
var assert = require('assert');

describe('smoker', function() {

  this.timeout(20000);
  var ext = process.platform.indexOf('win') >= 0 ? 'bat' : 'sh';

  it('fails a process that lasts one second before exit 1', function(done) {
    smoketest(__dirname + '/one-second-fail.' + ext, function(err) {
      assert(err, 'error expected');

      done();
    });
  });

  it('fails a process that lasts one second before exit 0', function(done) {
    smoketest(__dirname + '/one-second-pass.' + ext, function(err) {
      assert(err, 'error expected');

      done();
    });
  });

  it('passes a process that never dies', function(done) {
    smoketest(__dirname + '/never-die.' + ext, done);
  });

});
