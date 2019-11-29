import {
  attribute,
  create,
  collection,
  visitable,
} from 'ember-cli-page-object';

export default create({
  visit: visitable('/episodes/:slug'),
  title: {
    scope: '[data-test-episode-header-title]',
  },
  header: {
    playButton: {
      scope: '[data-test-episode-play]',
    },
    pauseButton: {
      scope: '[data-test-episode-pause]',
    },
  },
  showNotes: collection('[data-test-note-item]', {
    timeStamp: {
      scope: '[data-test-timestamp]',
    },
    resourceLink: {
      scope: '[data-test-note-link]',
      href: attribute('href'),
    },
    resourceTitle: {
      scope: '[data-test-note-title]',
    },
  }),
});
