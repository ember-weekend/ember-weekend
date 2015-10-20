import Ember from 'ember';
import DS from 'ember-data';

export default DS.Adapter.extend({
  proxy: 'https://cors-anywhere.herokuapp.com',
  host: 'http://til.hashrocket.com/emberjs',
  findAll() {
    return new Ember.RSVP.Promise((resolve) => {
      let url = this.corsUrl();
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
  corsUrl() {
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

    return parts.join('/');
  }
});
