import PageObject from 'ember-weekend/tests/page-object';

let {
  visitable
} = PageObject;

export default PageObject.create({
  visit: visitable('/')
});
