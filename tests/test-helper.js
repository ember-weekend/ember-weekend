import Application from '../app';
import config from '../config/environment';
import { setApplication } from '@ember/test-helpers';
import { start } from 'ember-qunit';
import QUnit from 'qunit';

setApplication(Application.create(config.APP));

QUnit.assert.trimEq = function(actual, expected) {
  const a = actual.replace(/^\s+|\s+$/g, '');
  this.equal(a, expected);
};

start();
