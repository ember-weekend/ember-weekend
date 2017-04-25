import Ember from 'ember';
import DS from 'ember-data';

const { computed } = Ember;
const { attr } = DS;

export default DS.Model.extend({
  timeStamp: attr('string'),
  note: attr('string'),
  title: computed('resource.title', 'note', function() {
    return this.get('resource.title') || this.get('note');
  }),
  resource: DS.belongsTo('resource', { async: false }),
  authors: Ember.computed('resource', function() {
    return this.get('resource.authors');
  }),
});
