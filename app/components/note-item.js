import Ember from 'ember';
import layout from '../templates/components/note-item';

export default Ember.Component.extend({
  layout: layout,
  tagName: 'li',
  classNames: ['note'],
  click(e){
    if(this.$()[0] === e.target) {
      this.$('.timestamp').trigger('click');
    }
  }
});
