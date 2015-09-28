import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    return this.store.findAll('episode').then((episodes) => {
      return episodes.sortBy('number').reverse();
    });
  }
});
