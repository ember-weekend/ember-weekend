import Ember from 'ember';

export default Ember.Route.extend({
  episodes: Ember.inject.service('episodes'),
  model: function(params) {
    return this.get('episodes').find(params.slug);
  },
  setupController: function(controller, model) {
    controller.set('model', model);
    controller.set('episodeTemplate', `episodes/${model.get('slug')}`);
  },
  serialize: function(model) {
    return { slug: model.get('slug') };
  }
});
