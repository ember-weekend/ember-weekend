import Ember from 'ember';
import layout from '../templates/components/note-list';

export default Ember.Component.extend({
  layout: layout,
  tagName: 'ul',
  classNames: ['notes']
});
