import Component from '@ember/component';
import layout from '../templates/components/note-item';

export default Component.extend({
  layout,
  tagName: 'li',
  click(e) {
    if (this.$()[0] === e.target) {
      this.$('.timestamp').trigger('click');
    }
  }
});
