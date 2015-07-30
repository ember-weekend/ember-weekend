import Ember from 'ember';

export default Ember.Component.extend({
  player: Ember.inject.service('player'),
  actions: {
    play() {
      this.get('player').play();
    },
    pause() {
      this.get('player').pause();
    }
  },
  progressStyle: Ember.computed('player.progress', function() {
    return `width: ${this.get('player.progress')}%`;
  }),
  bufferStyle: Ember.computed('player.buffer', function() {
    return `width: ${this.get('player.buffer')}%`;
  })
});
