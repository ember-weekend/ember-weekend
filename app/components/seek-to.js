import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { computed } from '@ember/object';
import { alias } from '@ember/object/computed';
import moment from 'moment';

export default Component.extend({
  player: service(),
  tagName: 'a',
  attributeBindings: ['href'],
  classNames: ['text-white', 'text-center', 'text-sm', 'bg-orange-300', 'hover:bg-orange-200', 'w-16', 'h-10', 'p-2', 'rounded-lg'],
  href: '#',
  milliseconds: computed('time', function() {
    const seek = moment.duration(`0:${this.get('time')}`).asSeconds() * 1000;
    return seek;
  }),
  formattedTime: alias('time'),
  click(e) {
    e.preventDefault();
    this.get('player').seekTo(this.get('episode'), this.get('milliseconds'));
    return false;
  }
});
