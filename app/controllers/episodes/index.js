import Controller from '@ember/controller';
import move from 'ember-animated/motions/move';
import resize from 'ember-animated/motions/resize';
import { easeIn, easeOut, easeInOut } from 'ember-animated/easings/cosine';

export default Controller.extend({
  transition: function * ({ receivedSprites, removedSprites, insertedSprites }) {
    receivedSprites.forEach(sprite => {
      sprite.applyStyles({ 'z-index': 3 });
      move(sprite, { easing: easeInOut });
      resize(sprite);
    });
    removedSprites.forEach(sprite => {
      sprite.endAtPixel({ x: -window.innerWidth });
      sprite.applyStyles({ 'z-index': 1 });
      move(sprite, { easing: easeIn });
    });
    insertedSprites.forEach(sprite => {
      sprite.startAtPixel({ x: -window.innerWidth });
      sprite.applyStyles({ 'z-index': 1 });
      move(sprite, { easing: easeOut });
    });
  },
});
