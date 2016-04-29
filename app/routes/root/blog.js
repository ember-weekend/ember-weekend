import Ember from 'ember';
const { set } = Ember;

export default Ember.Route.extend({
  fastboot: Ember.inject.service(),
  model() {
    if (!this.get('fastboot.isFastBoot')) {
      return this.store.findAll('post');
    }
  },
  headData: Ember.inject.service(),
  afterModel(){
    set(this, 'headData.title', 'Blog Posts');
  }
});
