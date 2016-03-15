import Ember from 'ember';
import {
  module,
  test
} from 'qunit';
import startApp from 'ember-weekend/tests/helpers/start-app';
import page from '../pages/episodes';

let application;

const episodes = [
  { number: 2,
    title: 'Quux title',
    description: 'Bar',
    slug: 'Baz',
    releaseDate: 'May 1, 2015',
    author: 'Tomster'
  },
  { number: 1,
    title: 'Foo title',
    description: 'Bar',
    slug: 'Baz',
    releaseDate: 'May 8, 2015',
    author: 'Tomster'
  }
];

module('Acceptance: EpisodeList', {
  beforeEach() {
    application = startApp();
  },

  afterEach() {
    Ember.run(application, 'destroy');
  }
});

test('visiting /episodes', function(assert) {
  episodes.forEach(function(e) {
    server.create('episode', e);
  });

  page.visit();

  andThen(function() {
    assert.equal(currentRouteName(), 'episodes.index');
    assert.equal(page.episodes().count, 2);
    assert.equal(page.episodes(0).title, 'Quux title');
    assert.equal(page.episodes(1).title, 'Foo title');
  });
});
