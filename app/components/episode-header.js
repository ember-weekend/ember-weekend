import Component from '@ember/component';
import { alias } from '@ember/object/computed';
import { inject as service } from '@ember/service';

export default Component.extend({
  player: service(),
  classNames: ['title'],
  title: alias('episode.title'),
  playing: alias('episode.playing'),
  prettyReleaseDate: alias('episode.prettyReleaseDate'),
  number: alias('episode.number'),
  description: alias('episode.description'),
  actions: {
    play(episode) {
      this.get('player').play(episode);
    },
    pause() {
      this.get('player').pause();
    }
  }
});
