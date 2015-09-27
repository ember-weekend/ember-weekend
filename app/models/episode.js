import Ember from 'ember';
import DS from 'ember-data';
import moment from 'moment';

const { attr } = DS;

export default DS.Model.extend({
  number: attr('number'),
  title: attr(),
  description: attr(),
  slug: attr(),
  releaseDate: attr('date'),
  lat: attr(),
  long: attr(),
  filename: attr(),
  author: attr(),
  image: attr(),
  duration: attr(),
  guest: attr(),
  showNotes: DS.hasMany('show-note', { async: true, inverse: 'episode' }),
  prettyReleaseDate: Ember.computed('releaseDate', function() {
    return moment(this.get('releaseDate')).format('MMMM DD, YYYY');
  })
});
