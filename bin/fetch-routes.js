/* eslint-env node */
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

const DEBUG = false;

function debug(message) {
  if (DEBUG) {
    console.log(message);
  }
}

function isSuccessCode(status) {
  const major = Math.floor(status/100);
  return major === 2 || major == 3;
}

module.exports = async function fetchRoutes({ visit }) {
  let urls = [
    '/about',
    '/episodes',
  ];

  let page = await visit('/episodes');
  debug('visited /episodes');
  debug(`status: ${page.statusCode}`);

  if (isSuccessCode(page.statusCode)) {
    const html = await page.html();
    const dom = new JSDOM(html);
    debug('dom parsed');

    const episodes = dom.window.document.querySelectorAll('ul.episodes li a.details');

    debug(`${episodes.length} episodes found`);
    for (let aTag of episodes) {
      if (aTag.href) {
        debug(`adding link: ${aTag.href}`);
        urls.push(aTag.href);
      }
    }
  }

  return urls;
}
