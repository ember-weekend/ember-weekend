import DS from 'ember-data';

export default DS.RESTAdapter.extend({
  queryRecord(store, type, { slug }) {
    const url = this.buildURL(type.modelName, null, null, 'queryRecord', { slug });
    return this.ajax(url, 'GET');
  },
  urlForQueryRecord({ slug }, modelName) {
    return this._buildURL(modelName, slug);
  }
});
