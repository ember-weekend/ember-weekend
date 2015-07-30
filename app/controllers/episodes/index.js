import Ember from 'ember';

export default Ember.Controller.extend({
  player: Ember.inject.service('player'),
  actions: {
    play(episode) {
      this.get('player').play(episode);
    },
    pause() {
      this.get('player').pause();
    }
  }
});
