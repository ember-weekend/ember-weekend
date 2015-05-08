import Ember from 'ember';
import {
  module,
  test
} from 'qunit';
import startApp from 'ember-weekend/tests/helpers/start-app';
import { stubResolver } from '../helpers/container';

var application;
var episodes = [
  { number: 1,
    title: "Foo title",
    description: "Bar",
    slug: "foo",
    releaseDate: "May 8, 2015",
    author: "Tomster"
  }
]
var episodesProxy = Ember.ArrayProxy.create({
  content: episodes.map(function(episode){
    return Ember.Object.create(episode);
  })
});

var mockEpisodeService = Ember.Service.extend({
  all: function(){ return episodesProxy; },
  mostRecent: function(){ return this.all().objectAt(0); },
  find: function(slug){
    return this.all().filterBy('slug', slug).get('firstObject');
  }
});

module('Acceptance: Episode Show', {
  beforeEach: function() {
    application = startApp({trees: {templates: "../fixtures/acceptance"}}, function(app) {
      stubResolver(app, 'service:episodes', mockEpisodeService);
    });
    debugger
  },

  afterEach: function() {
    Ember.run(application, 'destroy');
  }
});

test('visiting /episodes/:id (show)', function(assert) {
  visit('/episodes/foo');

  andThen(function() {
    assert.equal(currentURL(), '/episodes/foo');
    assert.equal(find('.show').text(), 'foo-template')
  });
});
