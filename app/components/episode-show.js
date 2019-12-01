import Component from '@ember/component';
import move from 'ember-animated/motions/move';
import resize from 'ember-animated/motions/resize';
import { easeIn, easeOut, easeInOut } from 'ember-animated/easings/cosine';

export default Component.extend({
  classNames: ['h-full', 'flex', 'flex-col', 'sm:flex-row'],
  transition: function * ({ receivedSprites, sentSprites , removedSprites, insertedSprites }) {
    receivedSprites.forEach(sprite => {
      sprite.applyStyles({ 'z-index': 3 });
      move(sprite, { easing: easeInOut });
      resize(sprite);
    });
    sentSprites.forEach(sprite => {
      sprite.applyStyles({ 'z-index': 3 });
      move(sprite, { easing: easeInOut });
      resize(sprite);
    });
    removedSprites.forEach(sprite => {
      sprite.endAtPixel({ y: window.innerHeight });
      sprite.applyStyles({ 'z-index': 2 });
      move(sprite, { easing: easeIn });
    });
    insertedSprites.forEach(sprite => {
      sprite.startAtPixel({ y: window.innerHeight });
      sprite.applyStyles({ 'z-index': 2 });
      move(sprite, { easing: easeOut });
    });
  },
});
