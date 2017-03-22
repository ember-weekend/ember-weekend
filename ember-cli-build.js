/* global require, module */
var EmberApp = require('ember-cli/lib/broccoli/ember-app');
var nodeSass = require('node-sass');

module.exports = function(defaults) {
  var app = new EmberApp(defaults, {
    fingerprint: {
      enabled: false
    },
    sassOptions: {
      extension: 'sass',
      nodeSass: nodeSass
    }
  });

  return app.toTree();
};
