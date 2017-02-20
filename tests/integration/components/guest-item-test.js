import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('guest-item', 'Integration | Component | guest item', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{guest-item
                    name='Flirgity Schmerga'
                    guestInfoURL='http://doom.com'
                    avatarURL='assets/images/me.jpg'
                    tagLine='Javascript Developer at Blerga Inc.'
                    bio="I'm a cool person, yo!"
                  }}`);

  assert.trimEq(this.$().find('li.guest img').attr('src'), '/assets/images/me.jpg');
  assert.equal(this.$().find('.guest_bio h1 a').text(), 'Flirgity Schmerga');
  assert.equal(this.$().find('.guest_bio h1 a').attr('href'), 'http://doom.com');
  assert.equal(this.$().find('.guest_bio p:first').text(), 'Javascript Developer at Blerga Inc.');
  assert.equal(this.$().find('.guest_bio p.bio').text(), "I'm a cool person, yo!");
});
