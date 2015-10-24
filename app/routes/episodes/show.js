import Ember from 'ember';

export default Ember.Route.extend({
  model(params) {
    return this.store.queryRecord('episode', { slug: params.slug });
  },
  afterModel(model) {
    return model.reload();
  },
  serialize(model) {
    return { slug: model.get('slug') };
  }
});
