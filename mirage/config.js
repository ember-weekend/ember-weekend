export default function() {
  this.get('/episodes');
  this.get('/show-notes', function({ showNote }, request){
    const ids = request.queryParams['filter[id]'].split(",")
    return showNote.find(ids);
  });
  this.get('/show-notes/:id');

  this.get('posts');

  this.get('/episodes/:slug', function({episode}, { params: { slug }}){
    return episode.where({
      slug: slug
    })[0];
  });

  this.passthrough('https://cors-anywhere.herokuapp.com/*url');
}
