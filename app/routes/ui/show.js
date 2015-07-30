import Ember from 'ember';

export default Ember.Route.extend({
  model(params) {
    this.set('templateName', `ui/${params.id}`);
    return params.id;
  }
});
