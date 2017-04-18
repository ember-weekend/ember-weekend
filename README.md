![Ember Weekend Logo](https://i.imgur.com/YyAd2Ee.png) [![Build Status](https://travis-ci.org/ember-weekend/ember-weekend.svg)](https://travis-ci.org/ember-weekend/ember-weekend)

Welcome to Ember Weekend where [Chase McCarthy](https://twitter.com/code0100fun) and [Jonathan Jackson](https://twitter.com/rondale_sc) babble on about their weekend Ember shenanigans.

## Prerequisites

* [Git](http://git-scm.com/)
* [Node.js](http://nodejs.org/) (with NPM) v0.12.0
* [Bower](http://bower.io/)
* [Ember CLI](http://www.ember-cli.com/) v0.2.1
* [PhantomJS](http://phantomjs.org/)

## Installation

* `git clone git@github.com:ember-weekend/ember-weekend.git`
* `cd ember-weekend`
* `npm install`
* `bower install`

## Running / Development

* `ember server`
* Visit your app at [http://localhost:4200](http://localhost:4200).

### Running Tests

* `ember test`
* `ember test --server`

### Running Local Fastboot

* run the API server (port 4000 in this case)
* `FEED_HOST=http://localhost:4000/feed.xml node serve.js`

### Building

* `ember build` (development)
* `ember build --environment production` (production)

### Deploying

* `./bin/deploy`
