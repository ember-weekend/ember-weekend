import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import { parallel } from 'ember-animated';
import move from 'ember-animated/motions/move';
import resize from 'ember-animated/motions/resize';
import adjustColor from 'ember-animated/motions/adjust-color';
import adjustCSS from 'ember-animated/motions/adjust-css';
import { easeOut, easeIn } from 'ember-animated/easings/cosine';

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

  * transition({ receivedSprites, sentSprites }) {
    receivedSprites.forEach(sprite => {
      sprite.applyStyles({ 'z-index': 3 });
      resize(sprite, { easing: easeOut });
      parallel(
        move,
        adjustColor.property('color'),
        adjustCSS.property('font-size'),
        adjustCSS.property('font-weight')
      )(sprite);
    });
    sentSprites.forEach(sprite => {
      sprite.applyStyles({ 'z-index': 3 });
      resize(sprite, { easing: easeIn });
      parallel(
        move,
        adjustColor.property('color'),
        adjustCSS.property('font-size'),
        adjustCSS.property('font-weight')
      )(sprite);
    });
  }
}
