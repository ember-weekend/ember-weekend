import { module, test } from 'qunit';
import { setupApplicationTest } from 'ember-qunit';
import setupMirage from 'ember-cli-mirage/test-support/setup-mirage';
import page from 'ember-weekend/tests/pages/episode-show';

module('Acceptance | episode show', function(hooks) {
  setupApplicationTest(hooks);
  setupMirage(hooks);

  test('visiting /episode-show', async function(assert) {
    const author = server.create('person', {
      url: 'https://twitter.com/embersherpa',
      title: 'EmberSherpa'
    });
    const resource = server.create('resource', {
      url: 'https://www.youtube.com/watch?v=8GMeMM0ukYM',
      title: 'Ember.js 1.11 Workshop',
      authors: [author]
    });
    const showNote = server.create('show-note', {
      timeStamp: '00:15',
      resource
    });
    const episode = server.create('episode', { slug: 'foo', showNotes: [showNote] });

    await page.visit({ slug: 'foo' });

    const sn = page.showNotes(0);

    assert.equal(page.title, episode.title);
    assert.equal(sn.timeStamp, showNote.timeStamp);
    assert.equal(sn.resourceLink, showNote.resource.url);
    assert.equal(sn.resourceTitle, showNote.resource.title);
  });
});
