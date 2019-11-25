import Component from '@ember/component';

export default Component.extend({
  mouseDown(e) {
    this.set('dragging', true);
    this.sendAction('seekTo', e);
  },
  mouseMove(e) {
    if (this.get('dragging')) {
      this.sendAction('drag', e);
    }
  }
});
