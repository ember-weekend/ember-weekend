import Ember from 'ember';

export default Ember.Component.extend({
  draggingPlayhead: null,
  playheadPosition: null,
  player: Ember.inject.service('player'),
  touchMove(e) {
    this.mouseMove(this.normalizeTouchEvent(e));
  },
  mouseMove(e) {
    if (this.get('draggingPlayhead')) {
      this.movePlayheadTo(this.normalizeTouchEvent(e).pageX);
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
  movePlayheadTo(x) {
    const width = this.$().width();
    const ratio = x / width;
    const duration = this.get('player.duration');
    const seekTo = duration * ratio * 1000;
    this.get('player').seekTo(this.get('player.episode'), seekTo);
    this.set('playheadPosition', x);
  },
  stopDragging() {
    this.set('draggingPlayhead', false);
    this.set('playheadPosition', null);
  },
  actions: {
    seekTo(e) {
      this.movePlayheadTo(this.normalizeTouchEvent(e).pageX);
    },
    dragTrack(e) {
      this.movePlayheadTo(this.normalizeTouchEvent(e).pageX);
    },
    play() {
      this.get('player').play();
    },
    pause() {
      this.get('player').pause();
    }
  },
  normalizeTouchEvent(event) {
    if (!event.touches) {
      event.touches = event.originalEvent.touches;
    }
    if (!event.pageX) {
      event.pageX = event.originalEvent.pageX;
    }
    if (!event.pageY) {
      event.pageY = event.originalEvent.pageY;
    }
    return event;
  },
  progressStyle: Ember.computed('player.progress', function() {
    return new Ember.Handlebars.SafeString(`width: ${this.get('player.progress')}%`);
  }),
  bufferStyle: Ember.computed('player.buffer', function() {
    return new Ember.Handlebars.SafeString(`width: ${this.get('player.buffer')}%`);
  })
});
