import Ember from 'ember';
import EpisodeLookup from 'ember-weekend/utils/episode-lookup';

export default Ember.Route.extend({
  episodes: Ember.inject.service('episodes'),
  model(params) {
    return this.get('episodes').find(params.slug);
  },
  setupController(controller, model) {
    const lookup = new EpisodeLookup();
    controller.set('episode', model);
    controller.set('episodeTemplate', lookup.findTemplateBySlug(model.get('slug')));
  },
  serialize(model) {
    return { slug: model.get('slug') };
  }
});
