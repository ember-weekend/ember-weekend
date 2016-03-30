import { Model, hasMany } from 'ember-cli-mirage';

export default Model.extend({
  authors: hasMany('person')
});
