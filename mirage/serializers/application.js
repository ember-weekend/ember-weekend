import Ember from 'ember';
import ActiveModelSerializer from 'ember-cli-mirage/serializers/active-model-serializer'
import { pluralize } from 'ember-inflector';

const { camelize, dasherize } = Ember.String;

export default ActiveModelSerializer.extend({

  keyForModel(type) {
    return camelize(type);
  },

  keyForAttribute(attr) {
    return camelize(attr);
  },

  keyForRelationship(type) {
    return pluralize(camelize(type));
  },

  keyForRelationshipIds(type) {
    return `${camelize(type)}Ids`;
  }
});
