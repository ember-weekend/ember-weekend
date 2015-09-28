import Ember from 'ember';

export default Ember.Route.extend({
  player: Ember.inject.service(),
  init() {
    this._super.apply(this, arguments);
    const mostRecent = this.store.peekAll('episode').sortBy('releaseDate').get('lastObject');
    this.set('player.episode', mostRecent);
  },
  beforeModel() {
    this.replaceWith('episodes');
  }
});
