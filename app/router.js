import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.resource('episodes', function() {
    this.route('our-first-foray');
    this.route('the-weekend-strikes-back');
    this.route('broccoli-but-not-the-vegetable');
  });
});

export default Router;
