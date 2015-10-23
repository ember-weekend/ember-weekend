import Ember from 'ember';
import DS from 'ember-data';

export default DS.Adapter.extend({
  findAll() {
    return new Ember.RSVP.Promise((resolve) => {
      const url = this.corsUrl({
        proxy: 'https://cors-anywhere.herokuapp.com',
        host: 'http://til.hashrocket.com/emberjs'
      });
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
  findRecord(store, type, id) {
    return new Ember.RSVP.Promise((resolve) => {
      const url = this.corsUrl({
        proxy: 'https://cors-anywhere.herokuapp.com',
        host: `http://til.hashrocket.com/posts/${id}`
      });
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
  corsUrl({ host, proxy }) {
    const parts = [];

    parts.push(proxy.replace(/\/$/, ''));
    parts.push(host.replace(/\/$/, ''));

    if (!parts.length) {
      parts.push('');
    }

    return parts.join('/');
  }
});
