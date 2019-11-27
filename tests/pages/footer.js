import {
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
    }
  }
});
