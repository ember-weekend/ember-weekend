import Ember from 'ember';
const { set } = Ember;

export default Ember.Route.extend({
  model() {
    return this.store.findAll('post');
  },
  headData: Ember.inject.service(),
  afterModel(){
    set(this, 'headData.title', 'Blog Posts');
  }
});
