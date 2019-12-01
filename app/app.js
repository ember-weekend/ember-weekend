import Application from '@ember/application';
import Resolver from './resolver';
import loadInitializers from 'ember-load-initializers';
import config from './config/environment';

// Temp fix for https://github.com/ember-animation/ember-animated/issues/130
if (typeof FastBoot !== 'undefined') {
  window.Element = class Element {};
  window.CharacterData = class CharacterData {};
  window.DocumentType = class DocumentType {};
}

const App = Application.extend({
  modulePrefix: config.modulePrefix,
  podModulePrefix: config.podModulePrefix,
  Resolver
});

loadInitializers(App, config.modulePrefix);

export default App;
