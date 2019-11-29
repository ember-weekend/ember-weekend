import {
  attribute,
  create,
} from 'ember-cli-page-object';

export default create({
  scope: '[data-test-footer]',
  playButton: {
    scope: '[data-test-play]'
  },
  pauseButton: {
    scope: '[data-test-pause]'
  },
  episode: {
    title: {
      scope: '[data-test-episode-title]',
    },
    time: {
      scope: '[data-test-current-time]',
    },
  },
  progress: {
    scope: '[data-test-progress]',
    style: attribute('style'),
  },
  buffer: {
    scope: '[data-test-buffer]',
    style: attribute('style'),
  },
});
