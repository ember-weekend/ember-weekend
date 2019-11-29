import Component from '@ember/component';
import { computed } from '@ember/object';
import { inject as service } from '@ember/service';
import { htmlSafe } from '@ember/template';

export default Component.extend({
  draggingPlayhead: null,
  playheadPosition: null,
  player: service(),
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
    // TODO: The duration is null before the audio is loaded so
    // this does not work the first time. Need to await the duration
    const duration = this.player.duration;
    const seekTo = duration * ratio * 1000;
    this.player.seekTo(seekTo);
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
      this.player.play();
    },
    pause() {
      this.player.pause();
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
  get progress() {
    return (this.player.progress || 0).toFixed(2);
  },
  get buffer() {
    return (this.player.buffer || 0).toFixed(2);
  },
  progressStyle: computed('player.progress', function() {
    return htmlSafe(`width: ${this.progress}%`);
  }),
  bufferStyle: computed('player.buffer', function() {
    return htmlSafe(`width: ${this.buffer}%`);
  })
});
