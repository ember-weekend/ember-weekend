import Ember from 'ember';
const { set } = Ember;

export default Ember.Route.extend({
  headData: Ember.inject.service(),
  player: Ember.inject.service(),
  afterModel(){
    set(this, 'headData.title', 'About Us');
    return this.store.findAll('episode').then(episodes => {
      const mostRecent = episodes.sortBy('releaseDate').get('firstObject');
      this.set('player.episode', mostRecent);
    });
  }
});
