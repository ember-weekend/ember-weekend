import Service from '@ember/service';
import moment from 'moment';
import { inject as service } from '@ember/service';
import { computed } from '@ember/object';
import { tracked } from '@glimmer/tracking';

function isNumeric(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

function sourceForFilename(filename) {
  return `https://emberweekend.s3.amazonaws.com/${filename}.mp3`;
}

export default class extends Service {
  @service audio;
  @tracked _episode = null;

  @computed('_episode')
  get episode() {
    return this._episode;
  }

  set episode(episode) {
    if (this._episode !== episode) {
      this.audio.reset();
    }
    this._episode = episode;
  }

  @computed('audio.playing')
  get playing() {
    return this.audio.playing;
  }

  @computed('audio.paused')
  get paused() {
    return this.audio.paused;
  }

  @computed('audio.duration')
  get duration() {
    return this.audio.duration;
  }

  @computed('audio.bufferedEnd')
  get bufferedEnd() {
    return this.audio.bufferedEnd;
  }

  @computed('audio.currentTimeSeconds')
  get currentTimeSeconds() {
    return this.audio.currentTimeSeconds;
  }

  @computed('duration', 'currentTimeSeconds')
  get progress() {
    const duration = this.duration || 0;
    const seconds = this.currentTimeSeconds;
    const percent = (seconds / duration) * 100;
    return isNumeric(percent) ? percent : 0;
  }

  @computed('duration', 'bufferedEnd')
  get buffer() {
    const duration = this.duration || 0;
    const bufferedEnd = this.bufferedEnd;
    const percent = (bufferedEnd / duration) * 100;
    return isNumeric(percent) ? percent : 0;
  }

  @computed('episode', 'playing')
  get playingEpisode() {
    return this.playing && this.episode;
  }

  @computed('episode.title')
  get title() {
    return this.episode.title;
  }

  @computed('episode.prettyReleaseDate')
  get releaseDate() {
    return this.episode.prettyReleaseDate;
  }

  @computed('episode.shortPrettyReleaseDate')
  get shortReleaseDate() {
    return this.episode.shortPrettyReleaseDate;
  }

  async seekTo(milliseconds, episode=this.episode) {
    await this.select(episode);
    if (!isNumeric(milliseconds)) {
      return;
    }
    await this.audio.seekTo(milliseconds);
  }

  async select(episode) {
    if (episode !== this.episode ||
      this.audioSource !== sourceForFilename(episode.filename)) {
      await this.pause();
      this.episode = episode;
      this.audioSource = this.episode.filename;
    }
  }

  set audioSource(filename) {
    const source = sourceForFilename(filename);
    this.audio.source = source;
  }

  get audioSource() {
    return this.audio.source;
  }

  async play(episode=this.episode) {
    await this.select(episode);
    await this.audio.play();
  }

  async pause() {
    await this.audio.pause();
  }

  get currentTime() {
    const seconds = this.currentTimeSeconds;
    if (isNumeric(seconds)) {
      const duration = moment.duration({ seconds });
      return moment.utc(duration.asMilliseconds()).format('mm:ss');
    } else {
      return '--:--';
    }
  }
}
