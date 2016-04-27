import Ember from 'ember';
const { set } = Ember;

export default Ember.Route.extend({
  model(params) {
    return this.store.queryRecord('episode', { slug: params.slug });
  },
  serialize(model) {
    return { slug: model.get('slug') };
  },
  headData: Ember.inject.service(),
  afterModel(model) {
    set(this, 'headData.title', model.get('title'));
    set(this, 'headData.description', model.get('description'));
    set(this, 'headData.audio', `https://emberweekend.s3.amazonaws.com/${model.get('filename')}.mp3`);
    set(this, 'headData.audio_type', 'video/mpeg');
    return model.get('showNotes');
  }
});
