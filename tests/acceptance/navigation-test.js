import { module, test } from 'qunit';
import { setupApplicationTest } from 'ember-qunit';
import { currentURL } from '@ember/test-helpers';
import setupMirage from 'ember-cli-mirage/test-support/setup-mirage';
import listPage from 'ember-weekend/tests/pages/episodes';
import headerPage from 'ember-weekend/tests/pages/header';

module('Acceptance | navigation', function(hooks) {
  setupApplicationTest(hooks);
  setupMirage(hooks);

  hooks.beforeEach(function() {
    server.create('episode');
  });

  test('/about page shows active in nav bar', async function(assert) {
    await listPage.visit();
    await headerPage.nav.about.click();

    assert.equal(currentURL(), '/about');
    assert.ok(headerPage.nav.about.active, 'about link is active');
  });
});
