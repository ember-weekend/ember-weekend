import { moduleForComponent, test } from 'ember-qunit';
import Ember from 'ember';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('play-pause-toggle', 'Integration | Component | play pause toggle', {
  integration: true
});

test('it renders', function(assert) {
  assert.expect(2);

  this.on('foo', function() {
    assert.ok(true);
  });

  this.on('bar', function() {
    assert.ok(true);
  });

  this.render(hbs`{{play-pause-toggle play=(action 'foo') pause=(action 'bar')}}`);

  Ember.run(() => {
    this.$('.controls').click();
    this.$('.controls').click();
  });
});
