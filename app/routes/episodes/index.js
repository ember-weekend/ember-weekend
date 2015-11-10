import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    return this.get('store').findAll('episode', { reload: true }).then((episodes) => {
      return episodes.sortBy('number').reverse();
    });
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
