import Ember from 'ember';
import { MousetrapRoute, mousetrap } from 'ember-mousetrap';

export default Ember.Route.extend(MousetrapRoute, {
  player: Ember.inject.service('player'),
  shortcuts: {
    togglePlay: mousetrap('space', function() {
      const player = this.get('player');
      if (player.get('playing')) {
        player.pause();
      } else {
        player.play();
      }
    })
  }
});
