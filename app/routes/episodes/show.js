import Route from '@ember/routing/route';
import { set } from '@ember/object';
import { inject as service } from '@ember/service';
import truncate from 'ember-weekend/utils/truncate-string';

export default Route.extend({
  player: service(),
  model(params) {
    return this.store.queryRecord('episode', { slug: params.slug });
  },
  serialize(model) {
    return { slug: model.get('slug') };
  },
  headData: service(),
  async afterModel(model) {
    if (model.showNotes.length === 0) {
      await this.store.queryRecord('episode', { slug: model.slug });
    }
    if (this.player.audio.paused) {
      this.player.episode = model;
    }

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
