import Ember from 'ember';
import episodes from 'ember-weekend/models/episodes';
import showNotes from 'ember-weekend/models/show-notes';

export default function(server) {
  episodes.forEach((e) => {
    server.create('episode', Ember.merge({ id: e.number }, e));
  });

  showNotes.forEach((sn, index) => {
    server.create('show-note', Ember.merge({ id: index }, sn));
  });
}
