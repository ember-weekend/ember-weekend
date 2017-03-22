/* global require, module */
var EmberApp = require('ember-cli/lib/broccoli/ember-app');

module.exports = function(defaults) {
  var app = new EmberApp(defaults, {
    fingerprint: {
      enabled: false
    },
    sassOptions: {
      extension: 'sass'
    }
  });

  return app.toTree();
};
