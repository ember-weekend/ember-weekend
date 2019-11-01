export default function() {
  this.namespace = 'api';

  this.get('/episodes');
  this.get('/show-notes', function({ showNote }, request){
    const ids = request.queryParams['filter[id]'].split(",");
    return showNote.find(ids);
  });

  this.get('/resources', function({ resource }, request){
    const ids = request.queryParams['filter[id]'].split(",");
    return resource.find(ids);
  });
  this.get('/show-notes/:id');

  this.get('/episodes/:slug', function({episodes}, { params: { slug }}){
    return episodes.findBy({slug: slug});
  });
}
