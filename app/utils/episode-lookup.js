import importedEpisodes from 'ember-weekend/models/episodes';

export default class EpisodeLookup {
  constructor(episodes) {
    this.episodes = episodes || importedEpisodes;
  }
  findTemplateBySlug(slug) {
    const episode = this.episodes.find(episode => episode.slug === slug);
    return `episodes/${this.padThree(episode.number)}-${episode.slug}`;
  }
  padThree(number) {
    return number <= 999 ? (`00${number}`).slice(-3) : number;
  }
}
