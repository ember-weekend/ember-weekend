import Ember from 'ember';
import episodes from 'ember-weekend/models/episodes';

export default Ember.Service.extend({
  player: Ember.inject.service('player'),
  find(slug){
    return this.all().filterBy('slug', slug).get('firstObject');
  },
  mostRecent(){
    return this.all().objectAt(0);
  },
  all(){
    var memoized = this.get('_cache');
    if(memoized){
      return memoized;
    }
    var current = this.get('player.episode');
    var episodesProxy = Ember.ArrayProxy.create({
      content: episodes.map(function(episode){
        episode.playing = !!(current &&
                             current.get('playing') &&
                             current.slug === episode.slug
                            );
        return Ember.Object.create(episode);
      })
    });
    this.set('_cache', episodesProxy);
    return episodesProxy;
  }
});
