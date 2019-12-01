import { module, test } from 'ember-qunit';
import { setupRenderingTest } from 'ember-qunit';
import { click, render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | play pause toggle', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    assert.expect(2);
    this.foo = () => {
      assert.ok(true);
    };

    this.bar = () => {
      assert.ok(true);
    };

    await render(hbs`<PlayPauseToggle @play={{this.foo}} @pause={{this.bar}} @playing=true />`);

    await click('button');
    await click('button');
  });
});
