import { getDataFromToken } from '@/lib/utils/getDataFromToken';
import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const isPublicPath = path == '/login' || path == '/signup';

  const token = request.cookies.get('token')?.value ?? undefined;
  const payload = getDataFromToken(request);

  //accessToken cookie is present but expired
  if (token && !payload) {
    const response = NextResponse.redirect(new URL('/', request.url));
    response.cookies.delete('token');
    return response;
  }

  if (isPublicPath && payload) {
    return NextResponse.redirect(new URL('/', request.url));
  } else if (!isPublicPath && !payload) {
    return NextResponse.redirect(new URL('/login', request.url));
  }
}

export const config = {
  matcher: ['/profile/:path*', '/login', '/signup'],
};
