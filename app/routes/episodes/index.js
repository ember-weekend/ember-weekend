import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    return this.modelFor('root').sortBy('releaseDate').reverse();
  },
  headTags: [
    { type: 'meta',
      attrs: {
        property: 'og:title',
        content: 'Episodes'
      }
    }
  ]
});
