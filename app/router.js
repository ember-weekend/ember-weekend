import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.resource('ui', function(){
    this.route('show', { path: '/:id' });
    this.route('example');
  });

  this.resource('root', { path: '/' }, function(){
    this.resource('episodes', function() {
      this.route('show', { path: '/:slug' });
    });
  });
});

export default Router;
