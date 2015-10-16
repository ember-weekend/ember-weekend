import Ember from 'ember';
import { module, test } from 'qunit';
import startApp from 'ember-weekend/tests/helpers/start-app';

import blogPage from 'ember-weekend/tests/pages/blog';

module('Acceptance | blog', {
  beforeEach() {
    this.application = startApp();
  },

  afterEach() {
    Ember.run(this.application, 'destroy');
  }
});

test('visiting /blog', function(assert) {
  blogPage.visit();

  andThen(function() {
    assert.equal(currentURL(), '/blog');
  });
});
