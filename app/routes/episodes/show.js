import Ember from 'ember';
import EpisodeLookup from 'ember-weekend/utils/episode-lookup';

export default Ember.Route.extend({
  episodes: Ember.inject.service('episodes'),
  model(params) {
    return this.store.queryRecord('episode', { slug: params.slug });
  },
  setupController(controller, model) {
    controller.set('episode', model);
    model.reload();
  },
  serialize(model) {
    return { slug: model.get('slug') };
  }
});
