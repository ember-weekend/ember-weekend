import Ember from 'ember';
import moment from 'moment';

export default Ember.Service.extend({
  episode: null,
  title: Ember.computed.alias('episode.title'),
  releaseDate: Ember.computed.alias('episode.releaseDate'),
  playing: Ember.computed.alias('episode.playing'),
  duration: null,
  audio: Ember.computed(function(){
    var audio = new Audio();
    audio.addEventListener('timeupdate', () => {
      const seconds = parseInt(audio.currentTime, 10);
      this.set('currentTimeSeconds', seconds);
    });
    audio.addEventListener('progress', () => {
      const bufferedEnd = audio.buffered.end(audio.buffered.length - 1);
      this.set('bufferedEnd', bufferedEnd);
    });
    return audio;
  }),
  seekTo(episode, milliseconds) {
    this.play(episode);
    this.get('audio').currentTime = milliseconds / 1000;
  },
  play(episode) {
    const audio = this.get('audio');
    const current = this.get('episode');
    if (current) {
      if (episode && episode !== current) {
        current.set('playing', false);
        episode.set('playing', true);
        this.set('episode', episode);
        audio.type = 'audio/mpeg';
        audio.src  = `http://emberweekend.s3.amazonaws.com/${episode.filename}.mp3`;
        this.set('currentTimeSeconds', null);
        this.set('bufferedEnd', null);
      } else {
        if (!audio.src) {
          audio.type = 'audio/mpeg';
          audio.src  = `http://emberweekend.s3.amazonaws.com/${current.filename}.mp3`;
        }
        current.set('playing', true);
      }
    } else {
      if (episode) {
        episode.set('playing', true);
        this.set('episode', episode);
        audio.type = 'audio/mpeg';
        audio.src  = `http://emberweekend.s3.amazonaws.com/${episode.filename}.mp3`;
        this.set('currentTimeSeconds', null);
        this.set('bufferedEnd', null);
      }
    }
    audio.play();
  },
  pause() {
    this.get('audio').pause();
    this.set('episode.playing', false);
  },
  currentTime: Ember.computed('currentTimeSeconds', function() {
    const seconds = this.get('currentTimeSeconds');
    if (Ember.$.isNumeric(seconds)) {
      const duration = moment.duration({ seconds });
      return moment.utc(duration.asMilliseconds()).format('mm:ss');
    } else {
      return '--:--';
    }
  }),
  progress: Ember.computed('audio', 'currentTimeSeconds', function() {
    const duration = this.get('audio').duration || 0;
    const seconds = this.get('currentTimeSeconds');
    const percent = (seconds / duration) * 100;
    return Ember.$.isNumeric(percent) ? percent : 0;
  }),
  buffer: Ember.computed('audio', 'bufferedEnd', function() {
    const duration = this.get('audio').duration || 0;
    const bufferedEnd = this.get('bufferedEnd');
    const percent = (bufferedEnd / duration) * 100;
    return Ember.$.isNumeric(percent) ? percent : 0;
  })
});
