import Ember from 'ember';

export default Ember.Route.extend({
  model: function(params){
    this.set('templateName', `ui/${params.id}`);
    return params.id;
  }

});
