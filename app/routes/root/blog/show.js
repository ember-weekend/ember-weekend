import Ember from 'ember';

export default Ember.Route.extend({
  model(params) {
    let post = this.store.peekRecord('post', params.permalink);
    return post || this.store.findRecord('post', params.permalink);
  }
});
