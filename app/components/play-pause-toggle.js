import Component from '@ember/component';
import { inject as service } from '@ember/service';

export default Component.extend({
  'data-test-play-pause': '',
  player: service(),
  click() {
    if (this.get('player.playing')) {
      this.pause();
    } else {
      this.play();
    }
    return false;
  }
});
