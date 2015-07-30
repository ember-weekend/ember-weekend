import Ember from 'ember';

export default Ember.Route.extend({
  player: Ember.inject.service(),
  episodes: Ember.inject.service('episodes'),
  init() {
    this._super.apply(this, arguments);
    const mostRecent = this.get('episodes').mostRecent();
    this.set('player.episode', mostRecent);
  },
  beforeModel() {
    this.replaceWith('episodes');
  }
});
