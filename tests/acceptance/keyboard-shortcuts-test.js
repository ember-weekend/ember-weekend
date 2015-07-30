import Ember from 'ember';
import {
  module,
  test
} from 'qunit';
import startApp from 'ember-weekend/tests/helpers/start-app';
import { stubResolver } from '../helpers/container';
import mockKeyEvent from '../helpers/mock-key-events';

let application;

module('Acceptance: KeyboardShortcuts', {
  beforeEach(assert) {
    window.mockKeyEvent = mockKeyEvent;

    const mockPlayerService = Ember.Service.extend({
      play() {
        assert.ok(true);
      },
      pause() {
        assert.ok(true);
      }
    });

    application = startApp({}, function(app) {
      stubResolver(app, 'service:player', mockPlayerService);
    });
  },

  afterEach() {
    window.mockKeyEvent = undefined;
    Ember.run(application, 'destroy');
  }
});

test('pressing space bar (32) toggles play/pause on player service', function(assert) {
  visit('/episodes');
  assert.expect(2);

  andThen(function() {
    mockKeyEvent.simulate(32, 32); // play()
    mockKeyEvent.simulate(32, 32); // pause()
  });
});
