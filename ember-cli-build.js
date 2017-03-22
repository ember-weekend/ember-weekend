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

  var fs = require('fs');
  var appTree;

  var mergeTrees = require('broccoli-merge-trees');
  var RSSGenerator = require('./rss-generator');
  var rss = new RSSGenerator({
    feed: './prod-fixtures/show.js',
    episodes: './prod-fixtures/episodes.js',
    notes: './prod-fixtures/show-notes.js',
    output: 'feed.xml'
  });
  appTree = mergeTrees([app.toTree(), rss]);

  return appTree;
};
