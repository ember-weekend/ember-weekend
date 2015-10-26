import Ember from 'ember';
import DS from 'ember-data';
import { corsUrl } from 'ember-weekend/utils/cors-url-builder';

export default DS.Adapter.extend({
  ajax: Ember.inject.service(),
  findAll() {
    const url = corsUrl({
      proxy: 'https://cors-anywhere.herokuapp.com',
      host: 'http://til.hashrocket.com/emberjs'
    });
    return this.get('ajax').request(url, {
      dataType: 'text'
    });
  },
  findRecord(store, type, id) {
    const url = corsUrl({
      proxy: 'https://cors-anywhere.herokuapp.com',
      host: `http://til.hashrocket.com/posts/${id}`
    });
    return this.get('ajax').request(url, {
      dataType: 'text'
    });
  }
});
