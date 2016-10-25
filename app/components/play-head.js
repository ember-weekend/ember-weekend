import Ember from 'ember';

export default Ember.Component.extend({
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
  playHeadStyle: Ember.computed('position', function() {
    const position = this.get('position');
    if (position) {
      return new Ember.String.htmlSafe(`left: ${position - 10}px`);
    } else {
      return new Ember.String.htmlSafe('');
    }
  })
});
