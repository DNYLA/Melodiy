import { getApiRoute } from '@/lib/network/helpers';
import { User } from '@/types/user';
import axios from 'axios';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const hasToken = request.cookies.has('token');

    if (!hasToken) {
      return NextResponse.json(
        { error: 'User not logged in!' },
        { status: 401 }
      );
    }

    const token = request.cookies.get('token')!;
    const { data } = await axios.get<User>(getApiRoute('/user'), {
      headers: { Authorization: 'Bearer ' + token.value },
    });

    const response = NextResponse.json({
      user: data,
      accessToken: token.value,
    });

    return response;
  } catch (err: any) {
    const message =
      err?.response?.data?.error ??
      'Unexpected server error occured. Try Again!';
    const status = err.response.status ?? 500;

    const response = NextResponse.json({ error: message }, { status });
    response.cookies.delete('token');

    return response;
  }
}
