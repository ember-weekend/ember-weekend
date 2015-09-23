import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['title'],
  title: Ember.computed.alias('episode.title'),
  playing: Ember.computed.alias('episode.playing'),
  prettyReleaseDate: Ember.computed.alias('episode.prettyReleaseDate'),
  number: Ember.computed.alias('episode.number'),
  description: Ember.computed.alias('episode.description'),
  player: Ember.inject.service('player'),
  actions: {
    play(episode) {
      this.get('player').play(episode);
    },
    pause() {
      this.get('player').pause();
    }
  }
});
