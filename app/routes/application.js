import Ember from 'ember';

const { get, set } = Ember;

export default Ember.Route.extend({
  player: Ember.inject.service('player'),
  headData: Ember.inject.service(),
  fastboot: Ember.inject.service(),
  afterModel() {
    let path;
    if (get(this, 'fastboot.isFastBoot')) {
      let request = get(this, 'fastboot._fastbootInfo.request');
      path = `${request.protocol}://${request.host}${request.path}`;
    } else {
      path = window.location.path;
    }

    set(this, 'headData.canonicalURL', path);
    set(this, 'headData.title', 'Ember Weekend');
    set(this, 'headData.description', 'Ember.js is a frontend JavaScript framework that has exciting applications.  In this podcasts we share news, events, and some of our experiences.');
    set(this, 'headData.image', 'https://i.imgur.com/YyAd2Ee.png');
    set(this, 'headData.site_name', 'Ember Weekend');
    set(this, 'headData.locale', 'en_US');
  }
});
