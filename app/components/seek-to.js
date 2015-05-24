/* globals moment */
import Ember from 'ember';

export default Ember.Component.extend({
  player: Ember.inject.service(),
  tagName: 'a',
  attributeBindings: ['href'],
  classNames: 'timestamp',
  href: '#',
  milliseconds: Ember.computed('time', function(){
    var seek = moment.duration('0:'+this.get('time')).asSeconds() * 1000;
    return seek;
  }),
  formattedTime: Ember.computed.alias('time'),
  click(e) {
    e.preventDefault();
    this.get('player').seekTo(this.get('episode'), this.get('milliseconds'));
    return false;
  }
});
