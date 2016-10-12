import Ember from 'ember';
import moment from 'moment';
import AsyncAudio from 'ember-weekend/utils/async-audio';

function isNumeric(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

export default Ember.Service.extend({
  episode: null,
  title: Ember.computed.alias('episode.title'),
  releaseDate: Ember.computed.alias('episode.prettyReleaseDate'),
  playing: Ember.computed.alias('episode.playing'),
  volume: 1,
  audio: Ember.computed(function() {
    const audio = new AsyncAudio();
    audio.addEventListener('timeupdate', () => {
      const seconds = parseInt(audio.currentTime, 10);
      this.set('currentTimeSeconds', seconds);
    });
    audio.addEventListener('loadedmetadata', () => {
      this.set('duration', audio.duration);
    });
    audio.addEventListener('progress', () => {
      if (audio.buffered.length > 0) {
        const bufferedEnd = audio.buffered.end(audio.buffered.length - 1);
        this.set('bufferedEnd', bufferedEnd);
      }
    });
    return audio;
  }),
  seekTo(episode, milliseconds) {
    const audio = this.get('audio');
    this.select(episode);
    if (!isNumeric(milliseconds)) {
      return;
    }
    audio.pause().then(() => {
      audio.currentTime = milliseconds / 1000;
      this.play(episode);
    });
  },
  setAudioSrc(filename) {
    const audio = this.get('audio');
    audio.type = 'audio/mpeg';
    audio.src  = `https://emberweekend.s3.amazonaws.com/${filename}.mp3`;
    this.set('currentTimeSeconds', null);
    this.set('bufferedEnd', null);
  },
  select(episode) {
    const audio = this.get('audio');
    const current = this.get('episode');
    if (episode === current && !audio.src) {
      this.setAudioSrc(current.get('filename'));
    } else if (episode !== current) {
      current.set('playing', false);
      this.set('episode', episode);
      this.setAudioSrc(episode.get('filename'));
    }
  },
  play(episode) {
    const audio = this.get('audio');
    const current = this.get('episode');
    episode = episode || current;
    this.select(episode);
    if (!episode.get('playing')) {
      episode.set('playing', true);
    }
    audio.play();
  },
  pause() {
    this.get('audio').pause();
    this.set('episode.playing', false);
  },
  changeVolume(volume) {
    this.set('volume', volume);
    this.get('audio').volume = volume;
  },
  muted: Ember.computed.equal('volume', 0),
  currentTime: Ember.computed('currentTimeSeconds', function() {
    const seconds = this.get('currentTimeSeconds');
    if (isNumeric(seconds)) {
      const duration = moment.duration({ seconds });
      return moment.utc(duration.asMilliseconds()).format('mm:ss');
    } else {
      return '--:--';
    }
  }),
  progress: Ember.computed('audio', 'currentTimeSeconds', function() {
    const duration = this.get('duration') || 0;
    const seconds = this.get('currentTimeSeconds');
    const percent = (seconds / duration) * 100;
    return isNumeric(percent) ? percent : 0;
  }),
  buffer: Ember.computed('audio', 'bufferedEnd', function() {
    const duration = this.get('duration') || 0;
    const bufferedEnd = this.get('bufferedEnd');
    const percent = (bufferedEnd / duration) * 100;
    return isNumeric(percent) ? percent : 0;
  })
});
