import Ember from 'ember';

export default Ember.Route.extend({
  model(params) {
    let post = this.store.peekRecord('post', params.permalink);
    return post || this.store.findRecord('post', params.permalink);
  },
  afterModel(model) {
     this.setHeadTags(model);
   },
  setHeadTags(model) {
    const headTags = [
      { type: 'meta',
        attrs: {
          property: 'og:title',
          content: model.get('title')
        }
      }
    ];
    this.set('headTags', headTags);
  }
});
