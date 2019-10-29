import DS from 'ember-data';
import { computed } from '@ember/object';

const { attr, belongsTo, Model } = DS;

export default Model.extend({
  timeStamp: attr('string'),
  note: attr('string'),
  title: computed('resource.title', 'note', function() {
    return this.get('resource.title') || this.get('note');
  }),
  resource: belongsTo('resource', { async: false }),
});
