const FastBootAppServer = require('fastboot-app-server');
const ExpressHTTPServer = require('fastboot-app-server/src/express-http-server');
const proxy = require('express-http-proxy');
const url = require('url');

const httpServer = new ExpressHTTPServer();
const app = httpServer.app;
const host = url.parse(process.env.FEED_HOST).host.split(':')[0];
const isDevelopFeed = host === 'localhost';

app.use('/feed.xml', proxy(process.env.FEED_HOST, {
  https: !isDevelopFeed,
  timeout: 20000,
  forwardPath: function(req, res) {
    return '/feed.xml';
  }
}));

app.use('/blog', proxy(process.env.BLOG_HOST, {
  https: !isDevelopFeed,
  timeout: 20000,
  forwardPath: function(req, res) {
    let path = url.parse(req.url).path;
    return path;
  }
}));

app.use('/ghost', proxy(process.env.BLOG_HOST, {
  https: !isDevelopFeed,
  timeout: 20000,
  forwardPath: function(req, res) {
    let path = url.parse(req.url).path;
    return '/ghost' + path;
  }
}));

let server = new FastBootAppServer({
  distPath: 'dist',
  gzip: true,
  httpServer: httpServer
});

server.start();
