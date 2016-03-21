import Ember from 'ember';

export default Ember.Route.extend({
  model(params) {
    return this.store.queryRecord('episode', { slug: params.slug });
  },
  serialize(model) {
    return { slug: model.get('slug') };
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
      },
      { type: 'meta',
        attrs: {
          property: 'og:description',
          content: model.get('description')
        }
      },
      { type: 'meta',
        attrs: {
          property: 'og:audio',
          content: `https://emberweekend.s3.amazonaws.com/${model.get('filename')}.mp3`
        }
      },
      { type: 'meta',
        attrs: {
          property: 'og:audio:type',
          content: 'video/mpeg'
        }
      }
    ];
    this.set('headTags', headTags);
  }
});
