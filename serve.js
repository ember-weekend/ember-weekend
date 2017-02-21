const FastBootAppServer = require('fastboot-app-server');
const serveStatic = require('serve-static');


let server = new FastBootAppServer({
  distPath: 'dist',
  gzip: true, // Optional - Enables gzip compression.
  beforeMiddleware(app) {
    app.use((request, response, next) => {
      if (/^\/charity/.exec(request.path)) {
        response.redirect('/causes');
      }

      next();
    });
  }
});

server.start();
