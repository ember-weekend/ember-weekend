import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'li',
  classNames: ['guest'],
  correctedAvatarURL: Ember.computed('avatarURL', function() {
    return '/' + this.get('avatarURL');
  })
});
