import PageObject from '../page-object';

let {
  visitable,
  text
} = PageObject;

export default PageObject.build({
  visit: visitable('/blog')
});
