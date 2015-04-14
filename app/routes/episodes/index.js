import Ember from 'ember';

export default Ember.Route.extend({
  beforeModel() {
    this.transitionTo('episodes.ie-seeya-l8er');
  }
});
