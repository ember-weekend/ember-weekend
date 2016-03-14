import Ember from 'ember';
const { $: jQuery } = Ember;

function extractPost($post) {
  const title = $post.find('h1:first').detach().text();
  const $footer = $post.find('footer').detach();
  const $permalink = $footer.find('.post__permalink');
  const publishedAt = $permalink.text();

  let author = $footer.find('a[href*="author"]').text();
  author = {
    jonathanjackson: 'Jonathan Jackson',
    chasemccarthy: 'Chase McCarthy'
  }[author];

  const [, id] = /\/posts\/([^.]+).+?$/.exec($permalink.attr('href'));

  if (author) {
    return { id, title, body: $post[0], author, publishedAt };
  }
}

function toArray(a) {
  return [].map.call(a, i => i);
}

export function extractArray(payload) {
  const $posts = toArray(jQuery('article.post', payload));
  const posts = [];

  $posts.forEach((post) => {
    const $post = jQuery('.post__content', post);

    let extractedPost = extractPost($post);

    if (extractedPost) {
      posts.push(extractedPost);
    }
  });

  return { posts };
}

export function extractSingle(payload) {
  const $post = jQuery('.post__content', payload);

  let post = extractPost($post);

  if (post) {
    return { post };
  }
}
