import Ember from 'ember';
const { set } = Ember;

export default Ember.Route.extend({
  model(params) {
    let post = this.store.peekRecord('post', params.permalink);
    return post || this.store.findRecord('post', params.permalink);
  },
  headData: Ember.inject.service(),
  afterModel(model) {
    set(this, 'headData.title', model.get('title'));
  }
});
