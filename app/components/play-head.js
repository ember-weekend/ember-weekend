import Component from '@ember/component';
import { computed } from '@ember/object';
import { htmlSafe } from '@ember/template';

export default Component.extend({
  touchStart() {
    this.mouseDown();
  },
  touchEnd() {
    this.mouseUp();
  },
  mouseDown() {
    this.set('dragging', true);
  },
  mouseUp() {
    this.set('dragging', null);
  },
  playHeadStyle: computed('position', function() {
    const position = this.get('position');
    if (position) {
      return htmlSafe(`left: ${position - 10}px`);
    } else {
      return htmlSafe('');
    }
  })
});
