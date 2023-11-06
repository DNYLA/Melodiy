'user server';

import { getApiRoute } from '@/lib/network/helpers';
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
