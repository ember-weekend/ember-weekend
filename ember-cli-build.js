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
    whitelist: [ // classes used in component *.js files. Remove once using Glimmer components.
      'w-full', 'sm:w-1/5', 'h-auto', 'sm:h-full', 'flex', 'bg-gray-150', 'border-r', 'border-gray-400',
      'h-full', 'flex', 'flex-col', 'sm:flex-row',
      'bg-white', 'border-b', 'border-gray-400', 'flex', 'flex-col', 'sm:flex-row', 'p-8', 'items-center',
      'p-6', 'bg-white', 'border-b', 'border-gray-400', 'flex', 'flex-row', 'items-start',
      'flex-1', 'overflow-auto',
      'text-white', 'text-center', 'text-sm', 'bg-orange-300', 'hover:bg-orange-200', 'w-16', 'h-10', 'p-2', 'rounded-lg',
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
