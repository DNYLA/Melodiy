import { TokenPayload } from '@/types/user';
import { jwtDecode } from 'jwt-decode';
import { NextRequest } from 'next/server';

/* We do not verify this here if a user was to pass in a modified unsigned accessToken
/  it would be accepted here but rejected on any requests made to the server. */
export const getDataFromToken = (request: NextRequest) => {
  try {
    const token = request.cookies.get('token')?.value ?? '';
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
