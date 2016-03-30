export default function() {
  this.namespace = 'api';

  this.get('/episodes');
  this.get('/show-notes', function({ showNote }, request){
    const ids = request.queryParams['filter[id]'].split(",")
    return showNote.find(ids);
  });

  this.get('/resources', function({ resource }, request){
    const ids = request.queryParams['filter[id]'].split(",")
    return resource.find(ids);
  });
  this.get('/show-notes/:id');

  this.get('/episodes/:slug', function({episode}, { params: { slug }}){
    return episode.where({
      slug: slug
    })[0];
  });

  this.passthrough('https://cors-anywhere.herokuapp.com/*url');
}
