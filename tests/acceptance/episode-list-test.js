import Ember from 'ember';
import {
  module,
  test
} from 'qunit';
import startApp from 'ember-weekend/tests/helpers/start-app';
import { stubResolver } from '../helpers/container';
import page from './pages/episodes-page';

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

const episodesProxy = Ember.ArrayProxy.create({
  content: episodes.map(function(episode) {
    return Ember.Object.create(episode);
  })
});

const mockEpisodeService = Ember.Service.extend({
  all() {
    return episodesProxy;
  },
  mostRecent() {
    return this.all().objectAt(0);
  }
});

module('Acceptance: EpisodeList', {
  beforeEach() {
    application = startApp({}, function(app) {
      stubResolver(app, 'service:episodes', mockEpisodeService);
    });
  },

  afterEach() {
    Ember.run(application, 'destroy');
  }
});

test('visiting /episodes', function(assert) {
  page.visit();

  andThen(function() {
    assert.equal(currentRouteName(), 'episodes.index');
    assert.equal(page.episodes().count(), 2);
    assert.equal(page.episodes(1).title(), 'Quux title');
    assert.equal(page.episodes(2).title(), 'Foo title');
  });
});
