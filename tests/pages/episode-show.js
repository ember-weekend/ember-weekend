import {
  attribute,
  create,
  collection,
  text,
  visitable,
} from 'ember-cli-page-object';

export default create({
  visit: visitable('/episodes/:slug'),
  title: text('[data-test-episode-header-title]'),
  showNotes: collection('[data-test-note-item]', {
    timeStamp: text('[data-test-timestamp]'),
    resourceLink: attribute('href', '[data-test-note-link]'),
    resourceTitle: text('[data-test-note-title]'),
  }),
});
