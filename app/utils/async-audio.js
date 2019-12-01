export default AsyncAudio;

function AsyncAudio(src) {
  if (src) {
    this._audio = new Audio(src);
  } else {
    this._audio = new Audio();
  }
}

function one(element, event, callback) {
  return element.addEventListener(event, function handler(e) {
    element.removeEventListener(event, handler);
    callback(e);
  });
}

AsyncAudio.prototype = {

  play() {
    const promise = new Promise((resolve) => {
      one(this._audio, 'play', function(e) {
        resolve(e);
      });
    });
    this._audio.play();
    return promise;
  },

  pause() {
    const promise = new Promise((resolve) => {
      if (this._audio.paused) {
        resolve();
      } else {
        one(this._audio, 'pause', function(e) {
          resolve(e);
        });
      }
    });
    this._audio.pause();
    return promise;
  },

  load() {
    const promise = new Promise((resolve) => {
      one(this._audio, 'loaddata', function(e) {
        resolve(e);
      });
    });
    this._audio.load();
    return promise;
  },

  addEventListener() {
    return this._audio.addEventListener.apply(this._audio, arguments);
  },

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
  }
};
