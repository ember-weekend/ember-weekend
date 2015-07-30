import resolver from './helpers/resolver';
import QUnit from 'qunit';
import {
  setResolver
} from 'ember-qunit';

setResolver(resolver);

QUnit.assert.trimEq = function(actual, expected) {
  const a = actual.replace(/^\s+|\s+$/g, '');
  this.equal(a, expected);
};
