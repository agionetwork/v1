import { NextResponse } from 'next/server';
import { handler } from "@civic/auth-web3/nextjs";

// Use hardcoded client ID to avoid any potential issues with ESM/CJS imports
const CIVIC_CLIENT_ID = "65004c36-3e4f-41a1-b0eb-8a9fc72dbf04";

// Handler for Civic Auth callback processing
export const GET = handler({
  clientId: CIVIC_CLIENT_ID
});

export const POST = handler({
  clientId: CIVIC_CLIENT_ID
}); 