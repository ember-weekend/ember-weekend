import PageObject from '../page-object';

let {
  visitable,
  text,
  collection
} = PageObject;

export default PageObject.build({
  visit: visitable('/blog'),
  posts: collection({
    itemScope: '.posts article',
    item: {
      title: text('.title'),
      body: text('.body'),
      author: text('.author')
    }
  })
});
