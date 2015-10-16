export default function() {
  this.get('/episodes', function(db) {
    return {
      episodes: db.episodes
    };
  });

  this.get('posts');

  this.get('/episodes/:slug', function(db, request) {
    let episode;

    if (~~request.params.slug === 0) {
      [episode] = db.episodes.where({
        slug: request.params.slug
      });
    } else {
      episode = db.episodes.find(request.params.slug);
    }

    return {
      episode,
      showNotes: db['show-notes'].where({ episode: episode.id })
    };
  });

  this.passthrough('https://cors-anywhere.herokuapp.com/*url');
}
