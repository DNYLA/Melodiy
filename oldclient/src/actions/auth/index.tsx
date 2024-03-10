'use server';

import { getApiRoute, getDataFromToken } from '@/lib/network/helpers';
import { getApiError } from '@/lib/utils';
import { APIError } from '@/types';
import { AuthResult } from '@/types/user';
import axios from 'axios';
import { cookies } from 'next/headers';

export async function loginUserAction(
  username: string,
  password: string
): Promise<AuthResult | APIError> {
  try {
    const { data } = await axios.post<AuthResult>(getApiRoute('/auth/login'), {
      username: username,
      password: password,
    });

    cookies().set('token', data.accessToken, {
      httpOnly: true,
      sameSite: 'lax',
    });

    return {
      id: data.id,
      username: data.username,
      accessToken: data.accessToken,
    };
  } catch (err) {
    return { error: getApiError(err).message };
  }
}

export async function getServerSession() {
  'use server';
  const token = cookies().get('token');
  const payload = getDataFromToken(token?.value);
  if (!token || !payload) return null;

  return {
    token: token.value,
    id: payload?.sub,
    username: payload?.name,
  };
}
