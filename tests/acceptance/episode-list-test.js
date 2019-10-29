import {
  module,
  test
} from 'qunit';
import { setupApplicationTest } from 'ember-qunit';
import { currentRouteName } from '@ember/test-helpers';
import page from 'ember-weekend/tests/pages/episodes';

const episodes = [
  { number: 2,
    title: 'Quux title',
    description: 'Bar',
    slug: 'Baz',
    releaseDate: 'May 1, 2015',
    author: 'Tomster'
  },
  { number: 1,
    title: 'Foo title',
    description: 'Bar',
    slug: 'Baz',
    releaseDate: 'May 8, 2015',
    author: 'Tomster'
  }
];

module('Acceptance: EpisodeList', function(hooks) {
  setupApplicationTest(hooks);

  test('visiting /episodes', async function(assert) {
    episodes.forEach(function(e) {
      server.create('episode', e);
    });

    await page.visit();

    assert.equal(currentRouteName(), 'episodes.index');
    assert.equal(page.episodes().count, 2);
    assert.equal(page.episodes(0).title, 'Foo title');
    assert.equal(page.episodes(1).title, 'Quux title');
  });
});

