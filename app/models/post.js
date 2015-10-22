import DS from 'ember-data';

const { attr } = DS;

export default DS.Model.extend({
  title: attr(),
  body: attr(),
  author: attr(),
  permalink: attr(),
  publishedAt: attr()
});
