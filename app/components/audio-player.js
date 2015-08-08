import Ember from 'ember';

export default Ember.Component.extend({
  draggingPlayhead: null,
  playheadPosition: null,
  player: Ember.inject.service('player'),
  touchMove(e) {
    const {
      originalEvent: {
        touches: {
          0: { pageX: x, pageY: y } // jshint ignore:line
        }
      }
    } = e;
    e.clientX = x;
    e.clientY = y;
    this.mouseMove(e);
  },
  mouseMove(e) {
    if (this.get('draggingPlayhead')) {
      const toX = e.clientX;
      const width = this.$().width();
      const ratio = toX / width;
      const duration = this.get('player.duration');
      const seekTo = duration * ratio * 1000;
      this.get('player').seekTo(this.get('player.episode'), seekTo);
      this.set('playheadPosition', toX);
    }
  },
  touchLeave() {
    this.mouseLeave();
  },
  mouseLeave() {
    this.stopDragging();
  },
  touchEnd() {
    this.mouseUp();
  },
  mouseUp() {
    this.stopDragging();
  },
  stopDragging() {
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
