import Controller from '@ember/controller';
import { inject as service } from '@ember/service';

export default Controller.extend({
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
