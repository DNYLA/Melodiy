import { TokenPayload } from '@/types/user';
import { jwtDecode } from 'jwt-decode';

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

/* We do not verify this here if a user was to pass in a modified unsigned accessToken
/  it would be accepted here but rejected on any requests made to the server. */
export const getDataFromToken = (token?: string) => {
  if (!token) return null; //Easier to add the check here instead of making each request handle it.

  try {
    // const payload: TokenPayload = jwt.decode(token) as TokenPayload;
    const payload: TokenPayload = jwtDecode(token);
    const epochTimestamp = payload.exp as unknown as number;
    const now = new Date();

    payload.exp = new Date(epochTimestamp * 1000);
    if (payload.exp < now) return null; //Expired not a verified check as stated above

    return payload;
  } catch (err: any) {
    return null;
  }
};
