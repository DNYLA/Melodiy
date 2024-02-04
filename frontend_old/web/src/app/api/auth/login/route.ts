import { getApiRoute } from '@/lib/network/helpers';
import { getApiError } from '@/lib/utils';
import { AuthResult } from '@/types/user';
import axios from 'axios';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { username, password } = reqBody;

    if (
      !username ||
      !password ||
      username.length == 0 ||
      password.length == 0
    ) {
      return NextResponse.json(
        { message: 'username or password can not be empty.' },
        { status: 400 }
      );
    }

    const { data } = await axios.post<AuthResult>(getApiRoute('/auth/login'), {
      username: username,
      password: password,
    });

    const response = NextResponse.json({
      id: data.id,
      username: data.username,
      accessToken: data.accessToken,
    });

    response.cookies.set('token', data.accessToken, {
      httpOnly: true,
      sameSite: 'lax',
    });

    return response;
  } catch (err) {
    const networkError = getApiError(err);

    return NextResponse.json(
      { error: networkError.message },
      { status: networkError.status }
    );
  }
}
