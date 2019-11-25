import {
  create,
  collection,
  text,
  visitable,
} from 'ember-cli-page-object';

export default create({
  visit: visitable('/episodes'),
  episodes: collection('[data-test-episode-list-item]', {
    title: text('[data-test-episode-list-item-title]')
  })
});
