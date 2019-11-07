'use strict';

const EmberApp = require('ember-cli/lib/broccoli/ember-app');
const fetchRoutes = require('./bin/fetch-routes');

module.exports = function(defaults) {
  let app = new EmberApp(defaults, {
    fingerprint: {
      enabled: false
    },
    prember: {
      urls: fetchRoutes,
    },
    sassOptions: {
      extension: 'sass',
      implementation: require('node-sass'),
    }
  });

  return app.toTree();
};
