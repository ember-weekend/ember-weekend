import Ember from 'ember';
import { module, test } from 'qunit';
import startApp from 'ember-weekend/tests/helpers/start-app';
import page from 'ember-weekend/tests/pages/episode-show';

module('Acceptance | episode show', {
  beforeEach() {
    this.application = startApp();
  },

  afterEach() {
    Ember.run(this.application, 'destroy');
  }
});

test('visiting /episode-show', function(assert) {
  const episode = server.create('episode', { slug: 'foo' });
  const showNote = server.create('show-note', {
    episodeId: episode.id,
    episode: episode.id,
    timeStamp: '00:15',
    resource:  {
      link: 'https://www.youtube.com/watch?v=8GMeMM0ukYM',
      title: 'Ember.js 1.11 Workshop'
    },
    authors: [
      { link: 'https://twitter.com/embersherpa',
        title: 'EmberSherpa' }
    ]
  });

  page.visit({ slug: 'foo' });

  andThen(function() {
    const sn = page.showNotes(0);

    assert.equal(page.title, episode.title);
    assert.equal(sn.timeStamp, showNote.timeStamp);
    assert.equal(sn.resourceLink, showNote.resource.link);
    assert.equal(sn.resourceTitle, showNote.resource.title);
  });
});
