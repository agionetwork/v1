import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    const response = NextResponse.redirect(new URL('/', request.url));
    response.cookies.delete('civic-auth-session');
    return response;
  } catch (error) {
    console.error('Error logging out:', error);
    return NextResponse.json(
      { error: 'Failed to log out' },
      { status: 500 }
    );
  }
} 