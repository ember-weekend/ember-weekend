import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['track-bar'],
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
