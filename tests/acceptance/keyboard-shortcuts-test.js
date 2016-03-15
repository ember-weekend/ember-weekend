import Ember from 'ember';
import { test } from 'qunit';

import moduleForAcceptance from '../../tests/helpers/module-for-acceptance';
import mockKeyEvent from '../helpers/mock-key-events';

moduleForAcceptance('Acceptance: KeyboardShortcuts');

test('pressing space bar (32) toggles play/pause on player service', function(assert) {
  visit('/episodes');
  assert.expect(2);

  this.register('service:player', Ember.Service.extend({
    play() {
      assert.ok(true);
    },
    pause() {
      assert.ok(true);
    }
  }));

  andThen(function() {
    mockKeyEvent.simulate(32, 32); // play()
    mockKeyEvent.simulate(32, 32); // pause()
  });
});
