export default function() {
  this.get('/episodes', function({episode}) {
    return episode.all();
  });

  this.get('posts');

  this.get('/episodes/:slug', function({episode}, { params: { slug }}){
    return episode.where({
      slug: slug
    });
  });

  this.passthrough('https://cors-anywhere.herokuapp.com/*url');
}
