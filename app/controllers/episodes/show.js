import Controller from '@ember/controller';
import { computed } from '@ember/object';
import { alias } from '@ember/object/computed';

export default Controller.extend({
  episode: alias('model'),
  showNotes: computed('episode.showNotes.length', function() {
    return this.get('episode.showNotes').sortBy('timeStamp');
  })
});
