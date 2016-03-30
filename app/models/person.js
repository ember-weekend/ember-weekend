import DS from 'ember-data';

const { attr } = DS;
export default DS.Model.extend({
  name: attr(),
  handle: attr(),
  url: attr(),
  avatarURL: attr(),
  tagline: attr(),
  bio: attr()
});
