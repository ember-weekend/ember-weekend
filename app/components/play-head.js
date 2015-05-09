import Ember from 'ember';

export default Ember.Component.extend({
  mouseDown: function(){
    this.set('dragging', true);
  },
  mouseUp: function(){
    this.set('dragging', null);
  },
  playHeadStyle: Ember.computed('position', function(){
    var position = this.get('position');
    if(position){
      return `left: ${position-10}px`.htmlSafe();
    }else{
      return "".htmlSafe();
    }
  })
});
