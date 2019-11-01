import {
  create,
  collection,
  text,
  visitable,
} from 'ember-cli-page-object';

export default create({
  visit: visitable('/episodes'),
  episodes: collection('ul.episodes li', {
    title: text('h1')
  })
});
