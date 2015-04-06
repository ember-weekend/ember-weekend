import Ember from 'ember';

export default Ember.Controller.extend({
  showMenu: false,
  actions: {
    toggleMenu: function(){
      this.toggleProperty('showMenu');
    }
  }
});
