import Service from '@ember/service';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { computed } from '@ember/object';
import AsyncAudio from 'ember-weekend/utils/async-audio';

export default class extends Service {
  @service fastboot;

  @tracked audio = null;
  @tracked paused = true;
  @tracked currentTimeSeconds = null;
  @tracked duration = null;
  @tracked bufferedEnd = null;

  constructor() {
    super(...arguments);
    this.setupAudio();
  }

  setupAudio() {
    if (!this.fastboot.isFastBoot) {
      const audio = new AsyncAudio();
      audio.addEventListener('timeupdate', () => {
        this.currentTimeSeconds = audio.currentTime;
      });
      audio.addEventListener('loadedmetadata', () => {
        this.duration = audio.duration;
      });
      audio.addEventListener('progress', () => {
        if (audio.buffered.length > 0) {
          const bufferedEnd = audio.buffered.end(audio.buffered.length - 1);
          this.bufferedEnd = bufferedEnd;
        }
      });
      audio.addEventListener('pause', () => {
        this.paused = true;
      });
      audio.addEventListener('play', () => {
        this.paused = false;
      });
      this.audio = audio;
    }
  }

  reset() {
    this.paused = true;
    this.bufferedEnd = null;
    this.duration = null;
    this.currentTimeSeconds = null;
  }

  @computed('paused')
  get playing() {
    return !this.paused;
  }

  async seekTo(milliseconds) {
    const audio = this.audio;
    if (this.source) {
      audio.currentTime = milliseconds / 1000;
      if (!this.playing) {
        await this.play();
      }
    }
  }

  set source(source) {
    this.reset();
    this.audio.type = 'audio/mpeg';
    this.audio.src = source;
  }

  get source() {
    return this.audio.src;
  }

  async play() {
    const audio = this.audio;
    if (this.paused) {
      await audio.play();
    }
  }

  async pause() {
    await this.audio.pause();
  }
}
