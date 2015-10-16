import Ember from 'ember';
import DS from 'ember-data';

export default DS.Adapter.extend({
  proxy: 'https://cors-anywhere.herokuapp.com',
  host: 'http://til.hashrocket.com/author/',
  findAll() {
    return new Ember.RSVP.Promise((resolve) => {
      let url = this.corsUrl('jonathanjackson');
      const options = {
        url,
        dataType: 'text',
        success(payload) {
          Ember.run(null, resolve, payload);
        },
        error(jqXHR) {
          if (jqXHR.status === 200) {
            Ember.run(null, resolve, jqXHR.responseText);
          }
        }
      };
      Ember.$.ajax(options);
    });
  },
  corsUrl(path) {
    const parts = [];

    if (this.get('proxy')) {
      parts.push(this.get('proxy').replace(/\/$/, ''));
    }

    if (this.get('host')) {
      parts.push(this.get('host').replace(/\/$/, ''));
    }

    if (!parts.length) {
      parts.push('');
    }

    parts.push(path);

    return parts.join('/');
  }
});
