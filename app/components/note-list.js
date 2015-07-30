import Ember from 'ember';
import layout from '../templates/components/note-list';

export default Ember.Component.extend({
  layout,
  tagName: 'ul',
  classNames: ['sections']
});
