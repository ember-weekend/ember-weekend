import Ember from 'ember';

export default Ember.Route.extend({
  episodes: Ember.inject.service('episodes'),
  model: function(params) {
    return this.get('episodes').find(params.slug);
  },
  renderTemplate: function(controller, model) {
    this.render(`episodes/${model.get('slug')}`);
  },
  serialize: function(model) {
    return { slug: model.get('slug') };
  }
});
