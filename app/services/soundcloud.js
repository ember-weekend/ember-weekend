import Ember from 'ember';

export default Ember.Service.extend({
  availableIn: ['components'],
  frame: function(){
    return Ember.$('iframe')[0];
  },
  soundcloud: function(){
    var soundcloud = window.SC.Widget(this.frame());
    soundcloud.bind(SC.Widget.Events.PLAY_PROGRESS, () => {
      var action = this.get('action');
      if(action){
        action();
        this.set('action', null);
      }
    });
    return soundcloud;
  },
  seekTo(time) {
    var soundcloud = this.soundcloud();
    this.set('action', function(){
      soundcloud.seekTo(time);
    });
    soundcloud.play();
  }
});
