export default function() {
  this.get('/episodes', function(db) {
    return {
      episodes: db.episodes,
      showNotes: db['show-notes']
    };
  });

  this.get('/episodes/:slug', function(db, request) {
    const [episode] = db.episodes.where({
      slug: request.params.slug
    });
    return {
      episode,
      showNotes: db['show-notes'].where({ episode: episode.id })
    };
  });
}
