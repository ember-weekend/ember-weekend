import {
  module,
  test
} from 'qunit';
import { setupApplicationTest } from 'ember-qunit';
import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { computed } from '@ember/object';
import { settled } from '@ember/test-helpers';
import { setupAnimationTest, animationsSettled } from 'ember-animated/test-support';
import setupMirage from 'ember-cli-mirage/test-support/setup-mirage';
import listPage from 'ember-weekend/tests/pages/episodes';
import showPage from 'ember-weekend/tests/pages/episode-show';
import headerPage from 'ember-weekend/tests/pages/header';
import footerPage from 'ember-weekend/tests/pages/footer';

const showNotes = [{
  id: 1,
  episodeId: '1',
  timeStamp: '00:20',
  note: 'Ember.js 1.11 Workshop',
}];

const episode1 = {
  id: 1,
  number: 1,
  title: 'Our First Foray',
  description: 'Chase and Jon kick off Ember Weekend discussing...',
  slug: 'our-first-foray',
  releaseDate: 'Mar 24, 2015',
  filename: 'ep-1-ember-weekend',
  audioUrl: 'https://emberweekend.s3.amazonaws.com/ep-1-ember-weekend.mp3',
  showNoteIds: [1],
};

const episode2 = {
  id: 2,
  number: 2,
  title: 'The Weekend Strikes Back',
  description: 'Chase and Jon discuss Ember\'s new versioned...',
  slug: 'the-weekend-strikes-back',
  releaseDate: 'Mar 30, 2015',
  filename: 'ep-2-ember-weekend',
  audioUrl: 'https://emberweekend.s3.amazonaws.com/ep-2-ember-weekend.mp3',
};

const episodes = [episode1, episode2];

class MockAudio extends Service {
  source = null;
  @tracked paused = true;
  @tracked currentTimeSeconds = null;
  @tracked duration = null;
  @tracked bufferedEnd = null;

  @computed('paused')
  get playing() {
    return !this.paused;
  }
  seekTo(milliseconds) {
    this.currentTimeSeconds = milliseconds / 1000;
    this.play();
  }
  play() {
    this.paused = false;
  }
  pause() {
    this.paused = true;
  }
  reset() {
    this.currentTimeSeconds = null;
  }
  async tick(seconds=0.0) {
    this.currentTimeSeconds = (this.currentTimeSeconds || 0) + seconds;
    this.duration = 60.0;
    this.bufferedEnd = 30.0;
    await settled();
  }
}

module('Acceptance: Playing Episode', function(hooks) {
  setupApplicationTest(hooks);
  setupAnimationTest(hooks);
  setupMirage(hooks);

  hooks.beforeEach(function() {
    showNotes.forEach(function(s) {
      server.create('show-note', s);
    });
    episodes.forEach(function(e) {
      server.create('episode', e);
    });

    this.owner.register('service:audio', MockAudio);
    this.audio = this.owner.lookup('service:audio');
  });

  test('audio player defaults to most recent episode', async function(assert) {
    await listPage.visit();
    assert.equal(footerPage.episode.title.text, episode2.title);
  });

  test('audio player shows playing episode', async function(assert) {
    await listPage.visit();

    assert.ok(listPage.episodes.objectAt(0).playButton.isVisible, 'Showing play button for ep 1');
    assert.ok(listPage.episodes.objectAt(1).playButton.isVisible, 'Showing play button for ep 2');
    assert.ok(footerPage.playButton.isVisible, 'Showing play button in footer');

    await listPage.episodes.objectAt(1).playButton.click();

    assert.ok(footerPage.pauseButton.isVisible, 'Showing pause button in footer');
    assert.equal(footerPage.episode.title.text, episode1.title, 'Showing the playing episode (1)');
    assert.ok(listPage.episodes.objectAt(1).pauseButton.isVisible, 'Showing pause button for ep 1');
    assert.equal(this.audio.source, episode1.audioUrl, 'Playing the correct audio file');
  });

  test('audio player updates time', async function(assert) {
    await listPage.visit();
    await listPage.episodes.objectAt(1).playButton.click();

    assert.equal(footerPage.episode.time.text, '--:--', 'Shows null time initially');

    await this.audio.tick(1.0);

    assert.equal(footerPage.episode.time.text, '00:01', 'Shows current time');
  });

  test('audio player shows episode from show page if not playing', async function(assert) {
    await listPage.visit();
    await listPage.episodes.objectAt(1).title.click();

    assert.equal(footerPage.episode.title.text, episode1.title);
  });

  test('audio player shows playing episode when navigating', async function(assert) {
    await listPage.visit();
    await listPage.episodes.objectAt(0).playButton.click();
    await listPage.episodes.objectAt(1).title.click();

    assert.equal(footerPage.episode.title.text, episode2.title);
    assert.ok(footerPage.pauseButton.isVisible, 'Showing pause button in footer');

    await headerPage.nav.home.click();

    assert.equal(footerPage.episode.title.text, episode2.title);
    assert.ok(footerPage.pauseButton.isVisible, 'Showing pause button in footer');
  });

  test('episode header play button overrides currently playing episode', async function(assert) {
    await listPage.visit();
    await listPage.episodes.objectAt(0).playButton.click();
    await listPage.episodes.objectAt(1).title.click();
    await animationsSettled();

    assert.ok(showPage.header.playButton.isVisible, 'Showing play button in episode header');

    await showPage.header.playButton.click();
    await animationsSettled();

    assert.equal(footerPage.episode.title.text, episode1.title);
    assert.ok(footerPage.pauseButton.isVisible, 'Showing pause button in footer');
  });

  test('audio player shows episode from show page if not playing', async function(assert) {
    await listPage.visit();
    await listPage.episodes.objectAt(1).title.click();

    assert.equal(footerPage.episode.title.text, episode1.title, 'Shows active episode');

    await headerPage.nav.home.click();

    assert.equal(footerPage.episode.title.text, episode2.title, 'Shows most recent episode again');
  });

  test('clicking show note timestamp seeks to time and plays', async function(assert) {
    await listPage.visit();
    await listPage.episodes.objectAt(1).title.click();
    await showPage.showNotes.objectAt(0).timeStamp.click();

    assert.equal(footerPage.episode.title.text, episode1.title, 'Shows episode');
    assert.equal(footerPage.episode.time.text, showNotes[0].timeStamp, 'Seeks to show note time');
    assert.ok(footerPage.pauseButton.isVisible, 'Showing pause button in footer');

    await this.audio.tick(); // updates progress and buffer

    assert.equal(footerPage.progress.style, 'width: 33.33%', 'Shows progress in footer');
    assert.equal(footerPage.buffer.style, 'width: 50.00%', 'Shows buffer in footer');
  });
});
