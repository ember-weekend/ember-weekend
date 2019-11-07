import {
  attribute,
  create,
  collection,
  text,
  visitable,
} from 'ember-cli-page-object';

export default create({
  visit: visitable('/episodes/:slug'),
  title: text('.title h1'),
  showNotes: collection('ul.sections li', {
    timeStamp: text('.timestamp'),
    resourceLink: attribute('href', '.details a:first'),
    resourceTitle: text('.details h1'),
  }),
});
