import Ember from 'ember';
const { set } = Ember;

export default Ember.Route.extend({
  player: Ember.inject.service(),
  headData: Ember.inject.service(),
  model() {
    return this.store.findAll('episode', { reload: true}).then(episodes => {
      return episodes.sortBy('releaseDate').reverse();
    });
  },
  afterModel(episodes){
    set(this, 'headData.title', 'Episodes');
    const mostRecent = episodes.get('firstObject');
    this.set('player.episode', mostRecent);
  }
});
