import Ember from 'ember';
import {
  module,
  test
} from 'qunit';
import startApp from 'ember-weekend/tests/helpers/start-app';
import { stubResolver } from '../helpers/container';

var application;

var episodes = [
  { number: 2,
    title: "Quux title",
    description: "Bar",
    slug: "Baz",
    releaseDate: "May 1, 2015",
    author: "Tomster"
  },
  { number: 1,
    title: "Foo title",
    description: "Bar",
    slug: "Baz",
    releaseDate: "May 8, 2015",
    author: "Tomster"
  }
];

var episodesProxy = Ember.ArrayProxy.create({
  content: episodes.map(function(episode){
    return Ember.Object.create(episode);
  })
});

var mockEpisodeService = Ember.Service.extend({
  all: function(){ return episodesProxy; },
  mostRecent: function(){ return this.all().objectAt(0); }
});

module('Acceptance: EpisodeList', {
  beforeEach: function() {
    application = startApp({}, function(app) {
      stubResolver(app, 'service:episodes', mockEpisodeService);
    });
  },

  afterEach: function() {
    Ember.run(application, 'destroy');
  }
});

test('visiting /episodes', function(assert) {
  visit('/episodes');

  andThen(function() {
    assert.equal(currentRouteName(), 'episodes.index');
    assert.equal(find('ul.episodes li:last h1').text(), 'Foo title');
    assert.equal(find('ul.episodes li:first h1').text(), 'Quux title');
  });
});
