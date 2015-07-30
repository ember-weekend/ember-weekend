import Ember from 'ember';
import layout from '../templates/components/github-link';
import LinkToSite from './link-to-site';

export default LinkToSite.extend({
  layout,
  href: Ember.computed('path', function() {
    const path = this.get('path');
    return `https://github.com/${path}`;
  }),
  path: Ember.computed('username', 'repo', function() {
    const username = this.get('username');
    const repo = this.get('repo');
    if (username && repo) {
      return `${username}/${repo}`;
    } else {
      return username;
    }
  }),
  name: Ember.computed('path', function() {
    const text = this.get('text');
    const path = this.get('path');
    return text ? text : path;
  })
});
