import Ember from 'ember';
import episodes from 'ember-weekend/models/episodes';

export default Ember.Route.extend({
  model: function(params) {
    var model = episodes.filterBy('slug', params.slug).get('firstObject');
    return Ember.ObjectProxy.create({ content: model });
  },
  renderTemplate: function(controller, model) {
    this.render(`episodes/${model.get('slug')}`);
  },
  serialize: function(model) {
    return { slug: model.get('slug') };
  }
});
