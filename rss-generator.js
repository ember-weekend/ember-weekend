var pickFiles = require('broccoli-static-compiler');
var esTranspiler = require('broccoli-babel-transpiler');
var path = require('path');
var fs = require('fs');
var RSS = require('rss');
var moment = require('moment');

module.exports = RSSGenerator;

function RSSGenerator(options){
  this.options = options;
  this.inputTrees = [
    this.transpile(this.select(options.feed)),
    this.transpile(this.select(options.items))
  ];
}

RSSGenerator.prototype.rebuild = function(){
  var feedData = require(this.inputPaths[0] + '/' + this.options.feed)['default'];
  var items = require(this.inputPaths[1] + '/' + this.options.items)['default'];
  var feed = new RSS(feedData);
  items.forEach(function(item){
    feed.item(buildItem(item));
  });
  var xml = feed.xml({indent: true});
  var outputFile = this.outputPath + '/' + this.options.output;
  outputFile = path.normalize(outputFile);
  fs.writeFileSync(outputFile, xml);
}

function buildItem(item){
  return {
    "title": item.title,
    "description": item.description,
    "url": "https://emberweekend.com/episodes/" + item.slug,
    "date": item.releaseDate,
    "lat": item.lat,
    "long": item.long,
    "enclosure": {
      "url":"https://emberweekend.s3.amazonaws.com/"+item.filename+".mp3",
      "file": "media/"+item.filename+".mp3"
    },
    "custom_elements": [
      {"itunes:author": item.author},
      {"itunes:subtitle": item.description},
      {"itunes:image": {
        "_attr": {
          "href": item.image
        }
      }},
      {"itunes:duration": item.duration}
    ]
  };
}

RSSGenerator.prototype.cleanup = function(){}

RSSGenerator.prototype.select = function(file){
  var fromDir = path.dirname(file);
  var filename = path.basename(file);
  return pickFiles(fromDir, {
    srcDir: '.',
    files: [filename],
    destDir: fromDir
  });
}

RSSGenerator.prototype.transpile = function(tree){
  return esTranspiler(tree, {
    modules: 'commonStrict',
    stage: 0
  });
}
