import Ember from 'ember';
import layout from '../templates/components/twitter-user';
import LinkToSite from './link-to-site';

export default LinkToSite.extend({
  layout: layout,
  href: Ember.computed('username', function(){
    return `https://twitter.com/${this.get('username')}`;
  }),
  name: Ember.computed('username', 'displayName', function(){
    var username = this.get('username');
    var displayName = this.get('displayName');
    return displayName || username;
  })
});
