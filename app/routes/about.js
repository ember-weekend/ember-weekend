import Route from '@ember/routing/route';
import { set } from '@ember/object';
import { inject as service } from '@ember/service';

export default Route.extend({
  headData: service(),
  player: service(),
  afterModel(){
    set(this, 'headData.title', 'About Us');
    return this.store.findAll('episode').then(episodes => {
      const mostRecent = episodes.sortBy('releaseDate').get('firstObject');
      this.set('player.episode', mostRecent);
    });
  }
});
