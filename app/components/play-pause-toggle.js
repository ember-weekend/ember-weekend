import Component from '@ember/component';

export default Component.extend({
  'data-test-play-pause': '',
  click() {
    if (this.playing) {
      this.pause();
    } else {
      this.play();
    }
    return false;
  }
});
