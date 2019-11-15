import Component from '@ember/component';
import layout from '../templates/components/note-item';

export default Component.extend({
  layout,
  tagName: 'li',
  classNames: ['p-6', 'bg-white', 'border-b', 'border-gray-400', 'flex', 'flex-row', 'items-start'],
  click(e) {
    if (this.$()[0] === e.target) {
      this.$('.timestamp').trigger('click');
    }
  }
});
