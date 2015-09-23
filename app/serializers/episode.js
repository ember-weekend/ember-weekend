import DS from 'ember-data';

export default DS.JSONSerializer.extend({
  isNewSerializerAPI: true,
  normalizeQueryRecordResponse(store, primaryModelClass, payload, id, requestType) {
    const episode = payload;
    episode.id = episode.number;
    return this._super(store, primaryModelClass, episode, id, requestType);
  },
  normalizeArrayResponse(store, primaryModelClass, payload, id, requestType) {
    const episodes = payload.map(function(episode) {
      episode.id = episode.number;
      return episode;
    });
    return this._super(store, primaryModelClass, episodes, id, requestType);
  }
});
