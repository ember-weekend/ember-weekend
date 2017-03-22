const FastBootAppServer = require('fastboot-app-server');
const ExpressHTTPServer = require('fastboot-app-server/src/express-http-server');
const proxy = require('express-http-proxy');
const url = require('url');

const httpServer = new ExpressHTTPServer();
const app = httpServer.app;

app.use('/feed.xml', proxy(process.env.FEED_HOST, {
  https: true,
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
