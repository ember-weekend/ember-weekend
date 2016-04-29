export default function(str, length) {
  if (str.length <= length) {
    return str.toString();
  }
  return `${str.slice(0, length)}...`;
}
