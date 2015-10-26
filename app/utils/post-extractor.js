import Ember from 'ember';
const { $: jQuery } = Ember;

function extractPost($post, $aside) {
  const children = toArray($post.children());
  const publishedAt = jQuery(children.pop()).find('p a').text();
  const title = jQuery(children.shift()).text();
  const body = jQuery('<div>').append(children).addClass('post').html();

  let author = $aside.find('li:first b').text();
  author = {
    jonathanjackson: 'Jonathan Jackson',
    chasemccarthy: 'Chase McCarthy'
  }[author];

  const [, id] = /\/posts\/([^.]+).+?$/.exec($aside.find('li:nth(2) a').attr('href'));

  if (author) {
    return { id, title, body, author, publishedAt };
  }
}

function toArray(a) {
  return [].map.call(a, i => i);
}

export function extractArray(payload) {
  const $posts = toArray(jQuery('article.post', payload));
  const posts = [];

  $posts.forEach((post) => {
    const $post = jQuery('section', post);
    const $aside = jQuery('aside', post);

    let extractedPost = extractPost($post, $aside);

    if (extractedPost) {
      posts.push(extractedPost);
    }
  });

  return { posts };
}

export function extractSingle(payload) {
  const $post = jQuery('article.post section', payload);
  const $aside = jQuery('article.post aside', payload);

  let post = extractPost($post, $aside);

  if (post) {
    return { post };
  }
}
