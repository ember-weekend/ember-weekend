import Ember from 'ember';

export default Ember.Component.extend({
  title: Ember.computed.alias('episode.model.title'),
  playing: Ember.computed.alias('episode.model.playing'),
  releaseDate: Ember.computed.alias('episode.model.releaseDate'),
  number: Ember.computed.alias('episode.model.number'),
  description: Ember.computed.alias('episode.model.description'),
  player: Ember.inject.service('player'),
  actions: {
    play: function(episode){
      this.get('player').play(episode);
    },
    pause: function(){
      this.get('player').pause();
    }
  }
});
