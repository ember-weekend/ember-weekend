import Route from '@ember/routing/route';
import { set } from '@ember/object';
import { inject as service } from '@ember/service';

export default Route.extend({
  player: service(),
  headData: service(),
  model() {
    return this.store.findAll('episode', { reload: true}).then(episodes => {
      return episodes.sortBy('releaseDate').reverse().slice(0, 20);
    });
  },
  afterModel(episodes){
    set(this, 'headData.title', 'Episodes');
    if (!this.player.episode || this.player.paused) {
      const mostRecent = episodes.get('firstObject');
      this.player.episode = mostRecent;
    }
  }
});
