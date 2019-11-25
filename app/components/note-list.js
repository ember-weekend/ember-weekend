import Component from '@ember/component';
import layout from '../templates/components/note-list';

export default Component.extend({
  layout,
  tagName: 'ul',
  classNames: ['flex-1', 'overflow-auto']
});
