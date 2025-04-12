import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Redirecionar para a página de login do Civic
    return NextResponse.redirect('https://auth.civic.com/login?client_id=65004c36-3e4f-41a1-b0eb-8a9fc72dbf04&redirect_uri=http://localhost:3001/api/auth/callback');
  } catch (error) {
    console.error('Error redirecting to login:', error);
    return NextResponse.json(
      { error: 'Failed to redirect to login' },
      { status: 500 }
    );
  }
} 