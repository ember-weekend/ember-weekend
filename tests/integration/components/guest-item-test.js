import { module, test } from 'ember-qunit';
import { setupRenderingTest } from 'ember-qunit';
import { find, render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | guest item', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    await render(hbs`{{guest-item
                      name='Flirgity Schmerga'
                      guestInfoURL='http://doom.com'
                      avatarURL='assets/images/me.jpg'
                      tagLine='Javascript Developer at Blerga Inc.'
                      bio="I'm a cool person, yo!"
                    }}`);

    assert.trimEq(find('[data-test-guest-image]').getAttribute('src'), 'assets/images/me.jpg');
    assert.equal(find('[data-test-guest-name]').textContent, 'Flirgity Schmerga');
    assert.equal(find('[data-test-guest-name]').getAttribute('href'), 'http://doom.com');
    assert.equal(find('[data-test-guest-tagline').textContent, 'Javascript Developer at Blerga Inc.');
    assert.equal(find('[data-test-guest-bio]').textContent, "I'm a cool person, yo!");
  });
});
