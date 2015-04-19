module.exports = {
  name: 'font-includer',

  isDevelopingAddon: function() {
    return true;
  },
  contentFor: function(type, config){
    if(type === 'head') {
      return '<link href="//fonts.googleapis.com/css?family=Open+Sans:400,300,600|Pacifico" rel="stylesheet" type="text/css">'
    }
  }
};
