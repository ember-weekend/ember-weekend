import Ember from 'ember';

export default Ember.Route.extend({
  episodes: Ember.inject.service('episodes'),
  model(params) {
    return this.get('episodes').find(params.slug);
  },
  setupController(controller, model) {
    controller.set('episode', model);
    controller.set('episodeTemplate', `episodes/${model.get('slug')}`);
  },
  serialize(model) {
    return { slug: model.get('slug') };
  }
});
