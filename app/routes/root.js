import Ember from 'ember';

export default Ember.Route.extend({
  player: Ember.inject.service(),
  model() {
    return this.store.findAll('episode');
  },
  afterModel(model) {
    const mostRecent = model.sortBy('releaseDate').get('lastObject');
    this.set('player.episode', mostRecent);
  }
});
