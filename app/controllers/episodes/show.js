import Ember from 'ember';

export default Ember.Controller.extend({
  episode: Ember.computed.alias('model'),
  showNotes: Ember.computed('episode.showNotes.length', function(){
    return this.get('episode.showNotes').sortBy('timeStamp');
  })
});
