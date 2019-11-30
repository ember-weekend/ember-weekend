import Component from '@ember/component';
import { inject as service } from '@ember/service';

export default Component.extend({
  classNames: ['w-full', 'bg-gray-100', 'md:rounded', 'border-gray-400', 'border', 'flex'],
  tagName: 'li',
  player: service(),
  actions: {
    play(episode) {
      this.player.play(episode);
    },
    pause() {
      this.player.pause();
    }
  }
});
