'use strict';

const EmberApp = require('ember-cli/lib/broccoli/ember-app');
const fetchRoutes = require('./bin/fetch-routes');
const isProduction = EmberApp.env() === 'production';

const purgeCSS = {
  module: require('@fullhuman/postcss-purgecss'),
  options: {
    content: [
      // add extra paths here for components/controllers which include tailwind classes
      './app/index.html',
      './app/templates/**/*.hbs'
    ],
    defaultExtractor: content => content.match(/[A-Za-z0-9-_:/]+/g) || []
  }
}

module.exports = function(defaults) {
  let app = new EmberApp(defaults, {
    prember: {
      urls: fetchRoutes,
    },
    postcssOptions: {
      compile: {
        plugins: [
          {
            module: require('postcss-import'),
            options: {
              path: ['node_modules']
            }
          },
          require('tailwindcss')('./app/tailwind/config.js'),
          ...isProduction ? [purgeCSS] : []
        ]
      }
    }
  });

  return app.toTree();
};
