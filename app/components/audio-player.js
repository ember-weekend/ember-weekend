import Ember from 'ember';

export default Ember.Component.extend({
  draggingPlayhead: null,
  playheadPosition: null,
  player: Ember.inject.service('player'),
  mouseMove(event){
    if(this.get('draggingPlayhead')){
      var toX = event.clientX;
      var width = this.$().width();
      var ratio = (toX/width);
      var duration = this.get('player.duration');
      var seekTo = duration * ratio * 1000;
      this.get('player').seekTo(this.get('player.episode'), seekTo);
      this.set('playheadPosition', toX);
    }
  },
  mouseLeave(){
    this.stopDragging();
  },
  mouseUp(){
    this.stopDragging();
  },
  stopDragging(){
    this.set('draggingPlayhead', false);
    this.set('playheadPosition', null);
  },
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
