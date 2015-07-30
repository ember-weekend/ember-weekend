import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('ui', { resetNamespace: true }, function(){
    this.route('show', { path: '/:id' });
    this.route('example');
  });

  this.route('root', { resetNamespace: true, path: '/' }, function(){
    this.route('episodes', { resetNamespace: true }, function() {
      this.route('show', { path: '/:slug' });
      this.route('timedShow', { path: '/:slug/:timeStamp'});
    });
    this.route('about');
  });
});

export default Router;
