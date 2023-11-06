import { getApiRoute } from '@/lib/network/helpers';
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

    const { data } = await axios.post<AuthResult>(
      getApiRoute('/auth/register'),
      {
        username: username,
        password: password,
      }
    );

    const response = NextResponse.json({
      id: data.id,
      username: data.username,
      accessToken: data.accessToken,
    });

    //Regisetered users don't need to login after registering.
    response.cookies.set('token', data.accessToken, {
      httpOnly: true,
      sameSite: 'lax',
    });

    return response;
  } catch (err: any) {
    const message =
      err?.response?.data?.error ??
      'Unexpected server error occured. Try Again!';
    const status = err.response.status ?? 500;

    return NextResponse.json({ error: message }, { status });
  }
}
