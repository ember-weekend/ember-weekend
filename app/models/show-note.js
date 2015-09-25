import DS from 'ember-data';
const { attr } = DS;

export default DS.Model.extend({
  timeStamp: attr(),
  resource: attr(),
  authors: attr(),
  episode: DS.belongsTo('episode', { inverse: 'showNotes' })
});
