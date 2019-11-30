import Component from '@ember/component';
import { alias } from '@ember/object/computed';
import { inject as service } from '@ember/service';

export default Component.extend({
  classNames: ['w-full', 'h-full', 'sm:h-full', 'flex', 'bg-gray-150', 'border-r', 'border-gray-400'],
  player: service(),
  title: alias('episode.title'),
  playing: alias('episode.playing'),
  prettyReleaseDate: alias('episode.prettyReleaseDate'),
  shortPrettyReleaseDate: alias('episode.shortPrettyReleaseDate'),
  number: alias('episode.number'),
  description: alias('episode.description'),
  actions: {
    play(episode) {
      this.player.play(episode);
    },
    pause() {
      this.player.pause();
    }
  }
});
