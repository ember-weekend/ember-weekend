import Ember from 'ember';

export default Ember.Component.extend({
  draggingPlayhead: null,
  playheadPosition: null,
  previousVolume: 1,
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
    },
    changeVolume(value) {
      this.get('player').changeVolume(value);
    },
    mute() {
      let playerVolume = this.get('player.volume');
      playerVolume = (playerVolume > 0)? playerVolume : 0.5;

      this.set('previousVolume', playerVolume);
      this.send('changeVolume', 0);
    },
    unmute() {
      this.send('changeVolume', this.get('previousVolume'));
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
  }),
  volumeButtonClass: Ember.computed('player.volume', function() {
    const volume = this.get('player.volume');
    const faPrefix = 'fa';
    let volumeClass;

    if (volume >= 0.5) {
      volumeClass = `${faPrefix}-volume-up`;
    } else if (volume > 0 && volume < 0.5 ) {
      volumeClass = `${faPrefix}-volume-down`;
    } else {
      volumeClass = `${faPrefix}-volume-off`;
    }

    return `fa ${volumeClass}`;
  })
});
