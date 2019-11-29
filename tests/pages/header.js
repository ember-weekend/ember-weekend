import {
  create,
  hasClass,
} from 'ember-cli-page-object';

export default create({
  scope: '[data-test-header]',
  nav: {
    home: {
      scope: '[data-test-logo]'
    },
    feed: {
      scope: '[data-test-feed]',
      active: hasClass('active'),
    },
    about: {
      scope: '[data-test-about]',
      active: hasClass('active'),
    },
    blog: {
      scope: '[data-test-blog]',
      active: hasClass('active'),
    },
  },
});
