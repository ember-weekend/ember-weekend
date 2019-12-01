import Controller from '@ember/controller';
import move from 'ember-animated/motions/move';
import { easeIn, easeOut } from 'ember-animated/easings/cosine';

export default Controller.extend({
  transition: function * ({ removedSprites, insertedSprites }) {
    removedSprites.forEach(sprite => {
      sprite.endAtPixel({ x: window.innerWidth });
      sprite.applyStyles({ 'z-index': 1 });
      move(sprite, { easing: easeIn });
    });
    insertedSprites.forEach(sprite => {
      sprite.startAtPixel({ x: window.innerWidth });
      sprite.applyStyles({ 'z-index': 1 });
      move(sprite, { easing: easeOut });
    });
  },
});
