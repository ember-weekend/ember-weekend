import Ember from 'ember';
import {
  module,
  test
} from 'qunit';
import startApp from 'ember-weekend/tests/helpers/start-app';
import { stubResolver } from '../helpers/container';

var application;
var expectedTime;
module('Acceptance: TimedShow', {
  beforeEach: function(assert) {
    var mockPlayerService = Ember.Service.extend({
      seekTo: function(_,actualTime){
        assert.equal(actualTime, expectedTime);
      }
    });

    application = startApp({}, function(app) {
      stubResolver(app, 'service:player', mockPlayerService);
    });
  },

  afterEach: function() {
    Ember.run(application, 'destroy');
  }
});

test('visiting timed-show plays at the specified time', function(assert) {
  assert.expect(2);
  expectedTime = 332000;
  visit('/episodes/our-first-foray/5m32s');

  andThen(function(){
    assert.ok(true);
  });
});
