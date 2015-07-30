import Ember from 'ember';
import parseTimestamp from 'ember-weekend/utils/parse-timestamp';

export default Ember.Route.extend({
  player: Ember.inject.service('player'),
  episodes: Ember.inject.service('episodes'),
  model(params){
    return this.get('episodes').find(params.slug).set('timestamp', params.timeStamp);
  },
  renderTemplate(controller, model) {
    this.render('episodes/show', {controller: controller, model: model});
  },
  setupController: function(controller, model) {
    controller.set('episode', model);
    controller.set('episodeTemplate', `episodes/${model.get('slug')}`);
    this.get('player').seekTo(model, parseTimestamp(model.get('timestamp')));
  },
});
