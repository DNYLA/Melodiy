import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const response = NextResponse.json({
      message: 'Logout successfull',
    });

    //Delete accessToken cookie
    response.cookies.delete('token');

    return response;
  } catch (err) {
    return NextResponse.json({ error: 'Unexpected server error occured.' });
  }
}
