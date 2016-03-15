import Ember from 'ember';
import { module, test } from 'qunit';
import startApp from 'ember-weekend/tests/helpers/start-app';
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
      <section id='post_show'>
        <article class='post'>
          <section>
            <div class='post__content copy'>
              <h1>
                <a>Foo</a>
              </h1>
              <p>Bar</p>
              <footer>
                <p>
                  <a href="/author/jonathanjackson">jonathanjackson</a>
                  <br>
                  <a class="post__permalink" href="/posts/faef1058c3-inheriting-from-linkcomponent-in-ember-is-amazing">January 20, 2016</a>
                </p>
              </footer>
            </div>
          </section>
        </article>
      </section>
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
    assert.equal(blogPage.posts(0).title, 'Foo');
    assert.equal(blogPage.posts(0).body, 'Bar');
    assert.equal(blogPage.posts(0).author, 'January 20, 2016 by Jonathan Jackson');
  });
});

test('visiting /blog/:id', function(assert) {
  const responseText = `
    <main>
      <section id='post_show'>
        <article class='post'>
          <section>
            <div class='post__content copy'>
              <h1>
                <a>Foo</a>
              </h1>
              <p>Bar</p>
              <footer>
                <p>
                  <a href="/author/jonathanjackson">jonathanjackson</a>
                  <br>
                  <a class="post__permalink" href="/posts/faef1058c3-inheriting-from-linkcomponent-in-ember-is-amazing">January 20, 2016</a>
                </p>
              </footer>
            </div>
          </section>
        </article>
      </section>
    </main>
  `;

  server.create('episode');

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

  blogPage.visitPost({ id: 'foo' });

  andThen(function() {
    assert.equal(currentURL(), '/blog/foo');
    assert.equal(blogPage.posts(0).title, 'Foo');
    assert.equal(blogPage.posts(0).body, 'Bar');
    assert.equal(blogPage.posts(0).author, 'January 20, 2016 by Jonathan Jackson');
  });

});
