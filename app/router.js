import EmberRouter from '@ember/routing/router';
import config from './config/environment';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('episodes', function() {
    this.route('show', { path: '/:slug' });
  });
  this.route('about');
});

export default Router;
