import parseTimestamp from '../../../utils/parse-timestamp';
import { module, test } from 'qunit';

module('parseTimestamp');

test('parses to milliseconds', function(assert) {
  assert.equal(parseTimestamp('5m36s'), 336000);
  assert.equal(parseTimestamp('1h2m32s'), 3752000);
  assert.equal(parseTimestamp('32s'), 32000);
});
