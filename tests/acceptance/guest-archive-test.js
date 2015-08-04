import Ember from 'ember';
import { module, test } from 'qunit';
import startApp from 'ember-weekend/tests/helpers/start-app';

module('Acceptance | guest archive', {
  beforeEach() {
    this.application = startApp();
  },

  afterEach() {
    Ember.run(this.application, 'destroy');
  }
});

test('visiting /guest-archive', function(assert) {
  visit('/guest-archive');

  andThen(function() {
    assert.equal(currentURL(), '/guest-archive');
  });
});

test('navigating to /guest-archive from index', function(assert) {
  visit('/');
  click('a i.fa-archive');

  andThen(function() {
    assert.equal(currentURL(), '/guest-archive');
  });
});
