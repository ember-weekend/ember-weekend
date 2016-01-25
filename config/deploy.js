module.exports = function(deployTarget) {
  return {
    pagefront: {
      app: 'ember-weekend',
      key: process.env.PAGEFRONT_KEY
    }
  };
};
