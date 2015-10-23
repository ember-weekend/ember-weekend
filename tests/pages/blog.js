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
      title: text('h1'),
      body: text('.body'),
      author: text('h2')
    }
  })
});
