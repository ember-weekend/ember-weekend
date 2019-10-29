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
  progressStyle: computed('player.progress', function() {
    return htmlSafe(`width: ${this.get('player.progress')}%`);
  }),
  bufferStyle: computed('player.buffer', function() {
    return htmlSafe(`width: ${this.get('player.buffer')}%`);
  })
});
