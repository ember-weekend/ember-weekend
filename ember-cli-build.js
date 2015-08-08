/* global require, module */
var EmberApp = require('ember-cli/lib/broccoli/ember-app');

module.exports = function(defaults) {
  var app = new EmberApp(defaults, {
    sassOptions: {
      ext: 'sass'
    }
  });

  app.import(app.bowerDirectory + '/moment/moment.js');
  app.import(app.bowerDirectory + '/ember-cli-moment-shim/moment-shim.js', {
    exports: {
      moment: ['default']
    }
  });

  var fs = require('fs');
  var appTree;

  if(fs.existsSync('media')){
    var mergeTrees = require('broccoli-merge-trees');
    var RSSGenerator = require('./rss-generator');
    var rss = new RSSGenerator({
      feed: './app/models/show.js',
      items: './app/models/episodes.js',
      output: 'feed.xml'
    });
    appTree = mergeTrees([app.toTree(), rss]);
  }else{
    appTree = app.toTree();
  }

  return appTree;
};
