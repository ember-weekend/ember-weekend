import Ember from 'ember';

export default Ember.Route.extend({
  beforeModel(transition) {
    this.replaceWith('episodes');
  }
});
