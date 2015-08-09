import Ember from 'ember';
const { RSVP, $ } = Ember;

export default AsyncAudio;

function AsyncAudio(src) {
  this._audio = new Audio(src);
}

AsyncAudio.prototype = {

  play() {
    const promise = new RSVP.Promise((resolve) => {
      $(this._audio).one('play', function(e) {
        resolve(e);
      });
    });
    this._audio.play();
    return promise;
  },

  pause() {
    const promise = new RSVP.Promise((resolve) => {
      if (this._audio.paused) {
        resolve();
      } else {
        $(this._audio).one('pause', function(e) {
          resolve(e);
        });
      }
    });
    this._audio.pause();
    return promise;
  },

  load() {
    const promise = new RSVP.Promise((resolve) => {
      $(this._audio).one('loaddata', function(e) {
        resolve(e);
      });
    });
    this._audio.load();
    return promise;
  },

  addEventListener() {
    return this._audio.addEventListener.apply(this._audio, arguments);
  },

  // jscs:disable
  get buffered() {
    return this._audio.buffered;
  },

  get duration() {
    return this._audio.duration;
  },

  set type(type) {
    this._audio.type = type;
  },

  get type() {
    return this._audio.type;
  },

  set src(src) {
    this._audio.src = src;
  },

  get src() {
    return this._audio.src;
  },

  set currentTime(time) {
    this._audio.currentTime = time;
  },

  get currentTime() {
    return this._audio.currentTime;
  },

  set volume(volume) {
    this._audio.volume = volume;
  },

  get volume() {
    return this._audio.volume;
  }
  // jscs:enable

};
