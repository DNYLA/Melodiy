'use server';

import { getApiRoute, getDataFromToken } from '@/lib/network/helpers';
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
  } catch (err: any) {
    const message =
      err?.response?.data?.error ?? 'Unable to register account. Try Again!';

    return { error: message };
  }
}

export async function getServerSession() {
  'use server';
  const token = cookies().get('token');
  const payload = getDataFromToken(token?.value);

  return {
    token: token?.value ?? null,
    id: payload?.sub,
    username: payload?.name,
  };
}
