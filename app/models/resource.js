import DS from 'ember-data';
const { attr } = DS;

export default DS.Model.extend({
  title: attr(),
  url: attr(),
  authors: DS.hasMany('people', { async: false })
});
