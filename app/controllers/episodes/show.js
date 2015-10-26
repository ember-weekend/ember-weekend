import Ember from 'ember';

export default Ember.Controller.extend({
  episode: Ember.computed.alias('model')
});
