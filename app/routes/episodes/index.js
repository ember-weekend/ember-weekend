import Ember from 'ember';
const { set } = Ember;

export default Ember.Route.extend({
  player: Ember.inject.service(),
  headData: Ember.inject.service(),
  fastboot: Ember.inject.service(),
  shortcircuit: Ember.inject.service('shoebox-shortcircuit'),
  model() {
    let shoebox = this.get('fastboot.shoebox');
    let shoeboxStore = shoebox.retrieve('episode-index-store');

    if (this.get('fastboot.isFastBoot')) {

      return this.store.findAll('episode').then(episodes => {
        if (!shoeboxStore){
          const pushData = episodes.map(episode => {
            return episode.serialize({includeId: true});
          });
          shoebox.put('episode-index-store', pushData);
        }

        return episodes.sortBy('releaseDate').reverse();
      });

    } else {
      if (shoeboxStore && typeof this.get('shortcircuit.episode-index-store') === 'undefined') {
        try {
          shoeboxStore.forEach(episode => { this.store.pushPayload(episode); });
        }
        finally {
          this.get('shortcircuit').set("episode-index-store", true);
          return Ember.RSVP.resolve(
            this.store.peekAll('episode').sortBy('releaseDate').reverse()
          );
        }
      } else {
        return this.store.findAll('episode', { reload: true}).then(episodes => {
          return episodes.sortBy('releaseDate').reverse();
        });
      }
    }
  },
  afterModel(episodes){
    set(this, 'headData.title', 'Episodes');
    const mostRecent = episodes.get('firstObject');
    this.set('player.episode', mostRecent);
  }
});
