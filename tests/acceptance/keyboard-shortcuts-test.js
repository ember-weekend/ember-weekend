import Ember from 'ember';
import {
  module,
  test
} from 'qunit';
import startApp from 'ember-weekend/tests/helpers/start-app';
import { stubResolver } from '../helpers/container';
import mockKeyEvent from '../helpers/mock-key-events';

var application;

module('Acceptance: KeyboardShortcuts', {
  beforeEach: function(assert) {
    window.mockKeyEvent = mockKeyEvent;

    var mockPlayerService = Ember.Service.extend({
      play: function(){
        assert.ok(true);
      },
      pause: function(){
        assert.ok(true);
      }
    });

    application = startApp({}, function(app) {
      stubResolver(app, 'service:player', mockPlayerService);
    });
  },

  afterEach: function() {
    window.mockKeyEvent = undefined;
    Ember.run(application, 'destroy');
  }
});

test('visiting /keyboard-shortcuts', function(assert) {
  visit('/episodes');
  assert.expect(2);

  andThen(function() {
    mockKeyEvent.simulate(32,32); // play()
    mockKeyEvent.simulate(32,32); // pause()
  });
});
