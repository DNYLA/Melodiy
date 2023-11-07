import { getDataFromToken } from '@/lib/network/helpers';
import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  // const isPublicOnlyPath = path == '/login' || path == '/signup';

  const token = request.cookies.get('token')?.value ?? undefined;
  const payload = getDataFromToken(token);

  if (!token) {
    //No accessToken available on protected route
    return NextResponse.redirect(new URL('/', request.url));
  } else if (!payload) {
    //accessToken cookie is present but expired
    //TODO: Add refresh token

    const response = NextResponse.redirect(new URL('/', request.url));
    response.cookies.delete('token');
    return response;
  }

  // if (isPublicPath && payload) {
  //   return NextResponse.redirect(new URL('/', request.url));
  // } else if (!isPublicPath && !payload) {
  //   return NextResponse.redirect(new URL('/login', request.url));
  // }
}

export const config = {
  matcher: ['/profile/:path*'],
};
