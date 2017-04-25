import Ember from 'ember';
import truncate from 'ember-weekend/utils/truncate-string';

const { set } = Ember;

export default Ember.Route.extend({
  fastboot: Ember.inject.service(),
  player: Ember.inject.service(),
  model(params) {
    return this.store.queryRecord('episode', { slug: params.slug });
  },
  serialize(model) {
    return { slug: model.get('slug') };
  },
  headData: Ember.inject.service(),
  afterModel(model) {
    set(this, 'player.episode', model);

    set(this, 'headData.title', model.get('title'));
    set(this, 'headData.description', model.get('description'));
    set(this, 'headData.audio', `https://emberweekend.s3.amazonaws.com/${model.get('filename')}.mp3`);
    set(this, 'headData.audio_type', 'audio/mpeg');
    set(this, 'headData.twitter_card', 'summary');

    const twitter_description = truncate(model.get('description'), 200);
    set(this, 'headData.twitter_description', twitter_description);

    const twitter_title = truncate('Ember Weekend: ' + model.get('title'), 70);
    set(this, 'headData.twitter_title', twitter_title);
  }
});
