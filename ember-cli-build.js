'use strict';

const EmberApp = require('ember-cli/lib/broccoli/ember-app');

module.exports = function(defaults) {
  let app = new EmberApp(defaults, {
    fingerprint: {
      enabled: false
    },
    sassOptions: {
      extension: 'sass',
      implementation: require('node-sass'),
    }
  });

  return app.toTree();
};
