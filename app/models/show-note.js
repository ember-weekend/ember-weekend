import Ember from 'ember';
import DS from 'ember-data';
const { attr } = DS;

export default DS.Model.extend({
  timeStamp: attr(),
  resource: DS.belongsTo('resource', { async: false }),
  authors: Ember.computed('resource', function() {
    return this.get('resource.authors');
  })
});
