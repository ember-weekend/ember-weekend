import Component from '@ember/component';
import { inject as service } from '@ember/service';

export default Component.extend({
  classNames: ['w-full', 'h-full', 'sm:h-full', 'flex', 'bg-gray-150', 'border-r', 'border-gray-400'],
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
