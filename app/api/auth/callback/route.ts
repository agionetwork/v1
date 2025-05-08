import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const code = searchParams.get('code');

    if (!code) {
      return NextResponse.redirect(new URL('/?error=missing_code', request.url));
    }

    // Criar resposta com cookie
    const response = NextResponse.redirect(new URL('/', request.url));
    response.cookies.set('civic-auth-session', code, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7 // 7 dias
    });

    return response;
  } catch (error) {
    console.error('Erro no callback:', error);
    return NextResponse.redirect(new URL('/?error=auth_failed', request.url));
  }
} 