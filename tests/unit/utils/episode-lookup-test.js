import EpisodeLookup from '../../../utils/episode-lookup';
import { module, test } from 'qunit';

module('Unit | Utility | episode lookup');

test('it works', function(assert) {
  const episodes = [
    {
      number: 1,
      slug: 'foo'
    },
    {
      number: 2,
      slug: 'bar'
    }
  ];
  const lookup = new EpisodeLookup(episodes);
  assert.equal(lookup.findTemplateBySlug('foo'), 'episodes/001-foo');
});
