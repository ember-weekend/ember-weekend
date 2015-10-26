import DS from 'ember-data';
import { extractArray, extractSingle } from 'ember-weekend/utils/post-extractor';

export default DS.RESTSerializer.extend({
  isNewSerializerAPI: true,

  normalizeArrayResponse(store, type, payload) {
    payload = extractArray(payload);
    return this._super(store, type, payload);
  },
  normalizeFindRecordResponse (store, type, payload) {
    payload = extractSingle(payload);
    return this._super(store, type, payload);
  }
});
