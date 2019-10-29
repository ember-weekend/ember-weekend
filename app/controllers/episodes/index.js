import Controller from '@ember/controller';
import { inject as service } from '@ember/service';

export default Controller.extend({
  player: service(),
  actions: {
    play(episode) {
      this.get('player').play(episode);
    },
    pause() {
      this.get('player').pause();
    }
  }
});
