import Ember from 'ember';
import layout from '../templates/components/github-link';
import LinkToSite from './link-to-site';

export default LinkToSite.extend({
  layout: layout,
  href: Ember.computed('path', function(){
    var path = this.get('path');
    return `https://github.com/${path}`;
  }),
  path: Ember.computed('username', 'repo', function(){
    var username = this.get('username');
    var repo = this.get('repo');
    if(username && repo){
      return `${username}/${repo}`;
    }else{
      return username;
    }
  }),
  name: Ember.computed('path', function(){
    var text = this.get('text');
    var path = this.get('path');
    return text ? text : path;
  })
});
