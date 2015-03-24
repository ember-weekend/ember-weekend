import Ember from 'ember';
import layout from '../templates/components/link-to-site';

export default Ember.Component.extend({
  layout: layout,
  tagName: 'a',
  attributeBindings: ["href", "target"],
  target: Ember.computed(function(){
    return "_blank";
  })
});
