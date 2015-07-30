import Ember from 'ember';

export default Ember.Route.extend({
  episodes: Ember.inject.service('episodes'),
  model() {
    return this.get('episodes').all();
  }
});
