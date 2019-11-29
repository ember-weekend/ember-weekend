import {
  create,
} from 'ember-cli-page-object';

export default create({
  scope: '[data-test-header]',
  nav: {
    home: {
      scope: '[data-test-logo]'
    },
    feed: {
      scope: '[data-test-feed]',
    },
    about: {
      scope: '[data-test-about]',
    },
    blog: {
      scope: '[data-test-blog]',
    },
  },
});
