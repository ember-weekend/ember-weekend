import DS from 'ember-data';
import Ember from 'ember';
import episodes from 'ember-weekend/models/episodes';

export default DS.Adapter.extend({
  findAll() {
    return episodes;
  },
  queryRecord(store, type, {slug}) {
    return Ember.A(episodes).filter(e => e.slug === slug).get('firstObject');
  }
});
