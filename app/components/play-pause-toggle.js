import Ember from 'ember';

export default Ember.Component.extend({
  player: Ember.inject.service(),
  click() {
    if (this.get('player.playing')) {
      this.attrs.pause();
    } else {
      this.attrs.play();
    }
    return false;
  }
});
