import {
  create,
  collection,
  visitable,
} from 'ember-cli-page-object';

export default create({
  visit: visitable('/episodes'),
  episodes: collection('[data-test-episode-list-item]', {
    title: {
      scope: '[data-test-episode-list-item-title]',
    },
    playButton: {
      scope: '[data-test-episode-play]',
    },
    pauseButton: {
      scope: '[data-test-episode-pause]',
    },
  })
});
