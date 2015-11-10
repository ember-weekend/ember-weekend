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
  },
  headTags: [
    { type: 'meta',
      attrs: {
        property: 'og:description',
        content: 'Ember.js is a frontend JavaScript framework that has exciting applications.  In this podcasts we share news, events, and some of our experiences.'
      }
    },
    { type: 'meta',
      attrs: {
        property: 'og:title',
        content: 'Ember Weekend'
      }
    },
    { type: 'meta',
      attrs: {
        property: 'og:image',
        content: 'https://i.imgur.com/VQmTj1h.png'
      }
    },
    { type: 'meta',
      attrs: {
        property: 'og:site_name',
        content: 'Ember Weekend'
      }
    },
    { type: 'meta',
      attrs: {
        property: 'og:locale',
        content: 'en_US'
      }
    },
  ]
});
