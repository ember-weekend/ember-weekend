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
    this.transpile(this.select(options.episodes)),
    this.transpile(this.select(options.notes))
  ];
}

RSSGenerator.prototype.rebuild = function(){
  var feedData = require(this.inputPaths[0] + '/' + this.options.feed)['default'];
  var episodes = require(this.inputPaths[1] + '/' + this.options.episodes)['default'];
  var notes = require(this.inputPaths[2] + '/' + this.options.notes)['default'];

  var feed = new RSS(feedData);
  episodes.forEach(function(episode){
    var episodeNotes = notes.filter(function(n) {
      return n.episode === episode.number;
    });
    feed.item(buildEpisode(episode, episodeNotes));
  });
  var xml = feed.xml({indent: true});
  var outputFile = this.outputPath + '/' + this.options.output;
  outputFile = path.normalize(outputFile);
  fs.writeFileSync(outputFile, xml);
}

function oxfordJoin(things) {
  var length = things.length;
  if (length > 1) {
    var and = ' and ';
    if (length > 2) {
      and = ', and ';
    }
    things[length - 2] = things[length - 2] +
                         and + things[length - 1];
    things.splice(-1, 1);
  }
  return things.join(', ');
}

function buildAuthorsLinks(authors) {
  var html = "";
  if (authors && authors.length > 0) {
    html += ' by ';
    var authorHtml = authors.map(function(author){
      var href = author.link;
      var title = author.title;
      if (href) {
        return '<a href="' + href + '">' + title + '</a>'
      } else {
        return title
      }
    });
    html += oxfordJoin(authorHtml);
  }
  return html;
}

function buildTimestamp(timeStamp) {
  var html = "";
  if (timeStamp) {
    html += timeStamp + " - ";
  }
  return html;
}

function buildDescription(description, notes){
  var html = '<p>' + description + '</p>';
  html += '<h2>Show Notes</h2>'
  notes.forEach(function(note){
    var href = note.resource.link;
    var title = note.resource.title;
    var authors = buildAuthorsLinks(note.authors);
    var timeStamp = buildTimestamp(note.timeStamp);
    if (href) {
      html += '<p>' + timeStamp + '<a href="' + href + '">' + title + '</a>' + authors + '</p>\n';
    } else {
      html += '<p>' + timeStamp + title + authors + '</p>\n';
    }
  });
  return html;
}

function buildEpisode(episode, notes){
  return {
    "title": "Episode " + episode.number + ": " + episode.title,
    "description": buildDescription(episode.description, notes),
    "url": "https://emberweekend.com/episodes/" + episode.slug,
    "date": episode.releaseDate,
    "lat": episode.lat,
    "long": episode.long,
    "enclosure": {
      "url":"https://emberweekend.s3.amazonaws.com/"+episode.filename+".mp3",
      "file": "media/"+episode.filename+".mp3"
    },
    "custom_elements": [
      {"itunes:author": episode.author},
      {"itunes:subtitle": episode.description},
      {"itunes:image": {
        "_attr": {
          "href": episode.image
        }
      }},
      {"itunes:duration": episode.duration}
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
