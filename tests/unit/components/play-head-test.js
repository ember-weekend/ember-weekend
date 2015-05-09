import {
  moduleForComponent,
  test
} from 'ember-qunit';

moduleForComponent('play-head', {});

test('drag', function(assert) {
  // assert.expect(1);
  var component = this.subject();
  this.render();
  assert.equal(component._state, 'inDOM');
});
