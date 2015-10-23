import Ember from 'ember';
import { module, test } from 'qunit';
import startApp from 'ember-weekend/tests/helpers/start-app';
import Mirage from 'ember-cli-mirage';
import blogPage from 'ember-weekend/tests/pages/blog';

module('Acceptance | blog', {
  beforeEach() {
    this.application = startApp();
  },

  afterEach() {
    Ember.run(this.application, 'destroy');
  }
});

test('visiting /blog', function(assert) {

  const responseText = `
    <main>
      <article class="post">
        <section>
            <h1>
              <a>Foo</a>
            </h1>
          <p>Bar</p>

          <footer>
          </footer>
        </section>
        <aside>
          <ul>
            <li>
              <a href="/author/jonathanjackson">more by <b>jonathanjackson</b></a>
            </li>
            <li>
              <b><a class="emberjs" href="/emberjs">#emberjs</a></b>
            </li>
            <li>
              <a class="js-like-action like liked" id="faef1058c3" href="/posts/faef1058c3-inheriting-from-linkcomponent-in-ember-is-amazing">liked<b>4 times</b></a>
            </li>
          </ul>
        </aside>
      </article>
    </main>
  `;

  server.pretender.prepareBody = function(body) {
    if (typeof body === 'string') {
      return body;
    } else {
      return JSON.stringify(body);
    }
  };

  server.pretender.get('https://cors-anywhere.herokuapp.com/*url', function() {
    return [200, {}, responseText];
  });

  server.create('episode');

  blogPage.visit();

  andThen(function() {
    assert.equal(currentURL(), '/blog');
    assert.equal(blogPage.posts(1).title(), 'Foo');
    assert.equal(blogPage.posts(1).body(), 'Bar');
    assert.equal(blogPage.posts(1).author(), 'by Jonathan Jackson');
  });
});
