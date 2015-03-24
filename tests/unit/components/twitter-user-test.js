import {
  moduleForComponent,
  test
} from 'ember-qunit';

import Ember from 'ember';

moduleForComponent('twitter-user', {
});

test('creates twitter user link', function(assert) {
  assert.expect(4);

  var component = this.subject();
  Ember.run(function(){
    component.set('username', 'farkwad');
  });

  assert.equal(this.$().prop('tagName'), 'A');
  assert.equal(this.$().attr('href'), 'https://twitter.com/farkwad');
  assert.equal(this.$().attr('target'), '_blank');
  assert.trimEq(this.$().text(), 'farkwad');
});

test('creates twitter user link with custom text', function(assert) {
  assert.expect(1);

  var component = this.subject();
  Ember.run(function(){
    component.set('username', 'farkwad');
    component.set('displayName', 'Fark Wad');
  });

  assert.trimEq(this.$().text(), 'Fark Wad');
});
