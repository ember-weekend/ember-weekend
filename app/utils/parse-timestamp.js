export default function parseTimestamp(str) {
  let regex = /(?:(\d+)h)?(?:(\d+)m)?(?:(\d+)s)?/i;
  let [,hours=0,minutes=0,seconds=0] = regex.exec(str) || []; // jshint ignore:line

  return [hours,minutes,seconds].reduce((a,b,i) => {
    let multipliers = [3600000, 60000, 1000];
    return a + parseInt(b) * multipliers[i];
  }, 0);
}

