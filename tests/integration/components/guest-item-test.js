import { module, test } from 'ember-qunit';
import { setupRenderingTest } from 'ember-qunit';
import { find, render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | guest item', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    await render(hbs`{{guest-item
                      name='Flirgity Schmerga'
                      guestInfoURL='http://doom.com'
                      avatarURL='assets/images/me.jpg'
                      tagLine='Javascript Developer at Blerga Inc.'
                      bio="I'm a cool person, yo!"
                    }}`);

    assert.trimEq(find('li.guest img').attr('src'), 'assets/images/me.jpg');
    assert.equal(find('.guest_bio h1 a').text(), 'Flirgity Schmerga');
    assert.equal(find('.guest_bio h1 a').attr('href'), 'http://doom.com');
    assert.equal(find('.guest_bio p:first').text(), 'Javascript Developer at Blerga Inc.');
    assert.equal(find('.guest_bio p.bio').text(), "I'm a cool person, yo!");
  });
});
