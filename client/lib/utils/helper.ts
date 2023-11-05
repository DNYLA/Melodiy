// Parses route with api url.
export function getApiRoute(route: string) {
  let url = getApiUrl();

  if (route.startsWith('/')) route = route.slice(1, route.length);

  return url + route;
}

// Parses route with api url.
export function getApiUrl() {
  let url = process.env.NEXT_PUBLIC_API_URL;

  if (!url) throw new Error('NEXT_PUBLIC_API_URL undefined');
  if (url.endsWith('/')) return url;

  return url + '/';
}
