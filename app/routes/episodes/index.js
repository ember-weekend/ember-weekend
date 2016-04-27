import Ember from 'ember';
const { set } = Ember;

export default Ember.Route.extend({
  model() {
    return this.modelFor('root').sortBy('releaseDate').reverse();
  },
  headData: Ember.inject.service(),
  afterModel(){
    set(this, 'headData.title', 'Episodes');
  }
});
