export default function(str, length) {
  if (typeof str === 'undefined') { return; }

  if (str.length <= length) {
    return str.toString();
  }
  return `${str.slice(0, length)}...`;
}
