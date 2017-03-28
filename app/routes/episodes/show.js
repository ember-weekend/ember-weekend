import Ember from 'ember';
import truncate from 'ember-weekend/utils/truncate-string';

const { set } = Ember;

export default Ember.Route.extend({
  fastboot: Ember.inject.service(),
  shortcircuit: Ember.inject.service('shoebox-shortcircuit'),
  player: Ember.inject.service(),
  model(params) {
    let shoebox = this.get('fastboot.shoebox');
    let shoeboxStore = shoebox.retrieve('episode-show-store');

    if (this.get('fastboot.isFastBoot')) {
      return this.store.queryRecord('episode', { slug: params.slug }).then(episode => {
        if(!shoeboxStore){
          shoeboxStore = {};
          shoebox.put('episode-show-store', shoeboxStore);
        }
        const pushData = episode.serialize({includeId: true});

        const includeds = [];

        episode.get('showNotes').map(function(showNote) {

          includeds.push(showNote.serialize({includeId: true}).data);

          includeds.push(showNote.get('resource').serialize({includeId: true}).data);

          showNote.get('authors').map(function(author) {
            includeds.push(author.serialize({includeId: true}).data);
          });
        });

        pushData.included = includeds;
        shoeboxStore[params.slug] = pushData;
        return episode;
      });
    } else {
      if (shoeboxStore && typeof this.get('shortcircuit.episode-show-store') === 'undefined') {
        let pushData;
        pushData = shoeboxStore[params.slug];
        this.store.pushPayload(pushData);
        this.get('shortcircuit').set("episode-show-store", true);
        return this.store.peekRecord('episode', pushData.data.id);
      } else {
        return this.store.queryRecord('episode', { slug: params.slug });
      }
    }
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
