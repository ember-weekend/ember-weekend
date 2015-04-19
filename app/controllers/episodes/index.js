import Ember from 'ember';

export default Ember.Controller.extend({
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
