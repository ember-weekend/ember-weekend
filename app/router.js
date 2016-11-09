import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('ui', function() {
    this.route('show', { path: '/:id' });
    this.route('example');
  });

  this.route('root', { path: '/' }, function() {
    this.route('episodes', { resetNamespace: true }, function() {
      this.route('show', { path: '/:slug' });
    });
    this.route('blog');
    this.route('blog.show', { path: 'blog/:permalink' });
    this.route('about');
  });
});

export default Router;
