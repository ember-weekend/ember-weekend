import PageObject from '../page-object';

let {
  visitable
} = PageObject;

export default PageObject.build({
  visit: visitable('/episodes/:slug'),
  title: PageObject.text('.title h1'),
  showNotes: PageObject.collection({
    itemScope: 'ul.sections li',
    item: {
      timeStamp: PageObject.text('.timestamp'),
      resourceLink: PageObject.attribute('href', '.details a'),
      resourceTitle: PageObject.text('.details h1')
    }
  })
});
