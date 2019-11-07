![Ember Weekend Logo](https://i.imgur.com/YyAd2Ee.png) [![Build Status](https://travis-ci.org/ember-weekend/ember-weekend.svg)](https://travis-ci.org/ember-weekend/ember-weekend)

Welcome to Ember Weekend where [Chase McCarthy](https://twitter.com/code0100fun) and [Jonathan Jackson](https://twitter.com/rondale_sc) babble on about their weekend Ember shenanigans.

## Prerequisites

You will need the following things properly installed on your computer.

* [Git](https://git-scm.com/)
* [Node.js](https://nodejs.org/) (with npm)
* [Ember CLI](https://ember-cli.com/)
* [Google Chrome](https://google.com/chrome/)

## Installation

* `git clone git@github.com:ember-weekend/ember-weekend.git`
* `cd ember-weekend`
* `npm install`

## Running / Development

* `ember server`
* Visit your app at [http://localhost:4200](http://localhost:4200).
* Visit your tests at [http://localhost:4200/tests](http://localhost:4200/tests).

### Running Tests

* `ember test`
* `ember test --server`

### Running Local Fastboot

* run the API server (port 4000 in this case)
* `BLOG_HOST=https://ember-weekend-blog.herokuapp.com/ FEED_HOST=http://localhost:4000/feed.xml node serve.js`

### Linting

* `npm run lint:hbs`
* `npm run lint:js`
* `npm run lint:js -- --fix`

### Building

* `ember build` (development)
* `ember build --environment production` (production)

### Deploying

* `./bin/deploy`
