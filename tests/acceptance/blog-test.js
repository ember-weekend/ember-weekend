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
          <h1><a>Foo</a></h1>
            <p>Bar</p>
          </section>
        </article>
    </main>
  `;

  server.pretender.prepareBody = function(body) {
    return body;
  };

  server.pretender.get('https://cors-anywhere.herokuapp.com/*url', function() {
    return [200, {}, responseText];
  });

  blogPage.visit();

  andThen(function() {
    assert.equal(currentURL(), '/blog');
    assert.equal(blogPage.posts(1).title(), 'Foo');
    assert.equal(blogPage.posts(1).body(), 'Bar');
  });
});
