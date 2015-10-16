import Ember from 'ember';
import DS from 'ember-data';

const { $: jQuery } = Ember;

function extractArray(payload) {
  const $posts = toArray(jQuery('article.post', payload));
  const posts = [];

  $posts.forEach((post) => {
    const $post = jQuery('section', post);
    const children = toArray($post.children());
    const title = jQuery(children.shift()).text();
    const id = Ember.String.dasherize(title);
    const body = jQuery(...children).html();

    posts.push({
      id, title, body
    });
  });

  return { posts };
}

function toArray(a) {
  return [].map.call(a, i => i);
}

export default DS.RESTSerializer.extend({
  isNewSerializerAPI: true,

  normalizeArrayResponse(store, type, payload) {
    payload = extractArray(payload);
    return this._super(store, type, payload);
  }
});
