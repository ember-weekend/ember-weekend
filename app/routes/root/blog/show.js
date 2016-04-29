import Ember from 'ember';
const { set } = Ember;

export default Ember.Route.extend({
  fastboot: Ember.inject.service(),
  model(params) {
    if (!this.get('fastboot.isFastBoot')) {
      let post = this.store.peekRecord('post', params.permalink);
      return post || this.store.findRecord('post', params.permalink);
    }
  },
  headData: Ember.inject.service(),
  afterModel(model) {
    set(this, 'headData.title', model.get('title'));
  }
});
