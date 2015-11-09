/* jshint node: true */

module.exports = function(deployTarget) {
  var ENV = {
    build: {}
  };

  if (deployTarget === 'production') {
    ENV.build.environment = 'production';
    ENV.pipeline = {
      activateOnDeploy: true
    };
    ENV.s3 = {
      accessKeyId: process.env.AWS_KEY,
      secretAccessKey: process.env.AWS_SECRET,
      bucket: 'emberweekend-site',
      region: 'us-east-1'
    };
    ENV['s3-index'] = {
      allowOverwrite: true,
      accessKeyId: process.env.AWS_KEY,
      secretAccessKey: process.env.AWS_SECRET,
      bucket: 'emberweekend-site',
      region: 'us-east-1'
    };
  }

  return ENV;
};
