import {
  moduleForComponent,
  test
} from 'ember-qunit';
import Ember from 'ember';

moduleForComponent('github-link', {
});

test('creates github user link', function(assert) {
  assert.expect(4);

  const component = this.subject();
  Ember.run(function() {
    component.set('username', 'farkwad');
  });

  assert.equal(this.$().prop('tagName'), 'A');
  assert.equal(this.$().attr('href'), 'https://github.com/farkwad');
  assert.equal(this.$().attr('target'), '_blank');
  assert.trimEq(this.$().text(), 'farkwad');
});

test('creates github repo link', function(assert) {
  assert.expect(2);

  const component = this.subject();
  Ember.run(function() {
    component.set('username', 'farkwad');
    component.set('repo', 'fark-wad');
  });
  assert.trimEq(this.$().text(), 'farkwad/fark-wad');
  assert.equal(this.$().attr('href'), 'https://github.com/farkwad/fark-wad');
});
