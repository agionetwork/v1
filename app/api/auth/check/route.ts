import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

// Marcar como dinâmica para evitar renderização estática
export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    const cookieHeader = request.headers.get('cookie');
    const hasCivicSession = cookieHeader?.includes('civic-auth-session=');

    return NextResponse.json({
      isAuthenticated: hasCivicSession,
      user: hasCivicSession ? { address: 'civic-user' } : null
    });
  } catch (error) {
    console.error('Error checking authentication status:', error);
    return NextResponse.json(
      { error: 'Failed to check authentication status' },
      { status: 500 }
    );
  }
} 