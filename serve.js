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

let server = new FastBootAppServer({
  distPath: 'dist',
  gzip: true,
  httpServer: httpServer
});

server.start();
