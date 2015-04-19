import Ember from 'ember';
import moment from 'moment';

export default Ember.Service.extend({
  episode: null,
  title: Ember.computed.alias('episode.title'),
  releaseDate: Ember.computed.alias('episode.releaseDate'),
  playing: Ember.computed.alias('episode.playing'),
  audio: Ember.computed(function(){
    var audio = new Audio();
    audio.addEventListener('timeupdate', () => {
      var seconds = parseInt(audio.currentTime, 10);
      this.set('currentTimeSeconds', seconds);
    });
    return audio;
  }),
  play(episode){
    var audio = this.get('audio');
    var current = this.get('episode');
    if(current){
      if(episode && episode !== current){
        current.set('playing', false);
        episode.set('playing', true);
        this.set('episode', episode);
        audio.type= 'audio/mpeg';
        audio.src = `http://emberweekend.s3.amazonaws.com/${episode.filename}.mp3`;
        this.set('currentTimeSeconds', null);
      }else{
        if(!audio.src){
          audio.type= 'audio/mpeg';
          audio.src = `http://emberweekend.s3.amazonaws.com/${episode.filename}.mp3`;
        }
        current.set('playing', true);
      }
    }else{
      if(episode){
        episode.set('playing', true);
        this.set('episode', episode);
        audio.type= 'audio/mpeg';
        audio.src = `http://emberweekend.s3.amazonaws.com/${episode.filename}.mp3`;
        this.set('currentTimeSeconds', null);
      }
    }
    audio.play();
  },
  pause(){
    this.get('audio').pause();
    this.set('episode.playing', false);
  },
  currentTime: Ember.computed('currentTimeSeconds', function(){
    var seconds = this.get('currentTimeSeconds');
    if(Ember.$.isNumeric(seconds)){
      var duration = moment.duration({seconds: seconds});
      return moment.utc(duration.asMilliseconds()).format('mm:ss');
    }else{
      return '--:--';
    }
  }),
  progress: Ember.computed('audio', 'currentTimeSeconds', function(){
    var duration = this.get('audio').duration || 0;
    var seconds = this.get('currentTimeSeconds');
    var percent = (seconds/duration) * 100;
    return Ember.$.isNumeric(percent) ? percent : 0;
  })
});
