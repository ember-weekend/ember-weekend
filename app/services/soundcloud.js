import Ember from 'ember';

export default Ember.Service.extend({
  availableIn: ['components'],
  frame: Ember.computed(function(){
    return Ember.$('iframe')[0];
  }),
  soundcloud: Ember.computed(function(){
    var soundcloud = window.SC.Widget(this.get('frame'));
    soundcloud.bind(SC.Widget.Events.PLAY_PROGRESS, () => {
      var action = this.get('action');
      if(action){
        action();
        this.set('action', null);
      }
    });
    return soundcloud;
  }),
  seekTo(time) {
    var soundcloud = this.get('soundcloud');
    this.set('action', function(){
      soundcloud.seekTo(time);
    });
    soundcloud.play();
  }
});
