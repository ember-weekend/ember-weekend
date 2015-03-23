import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.resource('episodes', function() {
    this.route('our-first-foray');
  });
});

export default Router;
