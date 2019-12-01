import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';

export default class extends Component {
  @service player;

  @action
  play(episode) {
    this.player.play(episode);
  }

  @action
  pause() {
    this.player.pause();
  }

  * transition() {

  }
}
