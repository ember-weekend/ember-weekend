/* global require, module */

var EmberApp = require('ember-cli/lib/broccoli/ember-app');

var app = new EmberApp();

// Use `app.import` to add additional libraries to the generated
// output files.
//
// If you need to use different assets in different
// environments, specify an object as the first parameter. That
// object's keys should be the environment name and the values
// should be the asset to use in that environment.
//
// If the library that you are including contains AMD or ES6
// modules that you would like to import into your application
// please specify an object with the list of modules as keys
// along with the exports of each module as its value.
app.import("vendor/soundcloud.js");
app.import(app.bowerDirectory + '/moment/moment.js');
app.import(app.bowerDirectory + '/ember-cli-moment-shim/moment-shim.js', {
  exports: {
    moment: ['default']
  }
});

var fs = require('fs');
var appTree;
if(fs.existsSync('media')){
  var RSS = require('rss');
  var feed = new RSS(require('./app/episodes/feed.json'));

  var walkSync = require('walk-sync');
  var path = require('path');
  walkSync('app/episodes').forEach(function(filePath){
    if(path.basename(filePath) === 'feed-item.json'){
      feed.item(require('./app/episodes/' + filePath));
    }
  });

  var xml = feed.xml({indent: true});

  var mergeTrees = require('broccoli-merge-trees');
  var quickTemp = require('quick-temp');
  var rssTree = {};
  var tmp = quickTemp.makeOrRemake(rssTree, 'tmpDestDir');
  fs.writeFileSync(path.join(tmp, 'feed.xml'), xml);
  rssTree.read = function(){ return tmp; };
  rssTree.cleanup = function(){ quickTemp.remove(rssTree, 'tmpDestDir'); };
  appTree = mergeTrees([app.toTree(), rssTree]);
}else{
  appTree = app.toTree();
}

module.exports = appTree;
