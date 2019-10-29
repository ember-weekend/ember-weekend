import Component from '@ember/component';
import { computed } from '@ember/object';
import layout from '../templates/components/link-to-site';

export default Component.extend({
  layout,
  tagName: 'a',
  attributeBindings: ['href', 'target', 'rel'],
  rel: 'nofollow',
  target: computed(function() {
    return '_blank';
  })
});
