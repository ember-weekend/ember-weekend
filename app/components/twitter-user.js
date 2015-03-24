import Ember from 'ember';
import layout from '../templates/components/twitter-user';

export default Ember.Component.extend({
  layout: layout,
  tagName: 'a',
  attributeBindings: ["href", "target"],
  href: Ember.computed('username', function(){
    return `https://twitter.com/${this.get('username')}`;
  }),
  target: Ember.computed(function(){
    return "_blank";
  }),
  name: Ember.computed('username', 'displayName', function(){
    var username = this.get('username');
    var displayName = this.get('displayName');
    return displayName || username;
  })
});
