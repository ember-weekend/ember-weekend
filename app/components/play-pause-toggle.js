import Component from '@ember/component';
import { inject as service } from '@ember/service';

export default Component.extend({
  player: service(),
  click() {
    if (this.get('player.playing')) {
      this.attrs.pause();
    } else {
      this.attrs.play();
    }
    return false;
  }
});
