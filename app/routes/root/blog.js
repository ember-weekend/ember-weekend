import Ember from 'ember';
const { set } = Ember;

export default Ember.Route.extend({
  fastboot: Ember.inject.service(),
  headData: Ember.inject.service(),
  player: Ember.inject.service(),
  model() {
    if (!this.get('fastboot.isFastBoot')) {
      return this.store.findAll('post');
    }
  },
  afterModel(){
    set(this, 'headData.title', 'Blog Posts');
    return this.store.findAll('episode').then(episodes => {
      const mostRecent = episodes.sortBy('releaseDate').get('firstObject');
      this.set('player.episode', mostRecent);
    });
  }
});
