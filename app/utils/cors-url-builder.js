export function corsUrl({ host, proxy }) {
  const parts = [];

  parts.push(proxy.replace(/\/$/, ''));
  parts.push(host.replace(/\/$/, ''));

  if (!parts.length) {
    parts.push('');
  }

  return parts.join('/');
}
